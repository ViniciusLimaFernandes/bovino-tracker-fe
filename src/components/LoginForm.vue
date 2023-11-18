<template>
  <v-alert type="error" v-if="failedAuth" class="alert">
    Credenciais inválidas
  </v-alert>
  <v-dialog v-model="dialog">
    <v-card width="110vh" height="50vh" style="overflow: hidden">
      <v-row>
        <v-col width="50vh">
          <img id="form-image" src="../assets/farm.jpg" />
        </v-col>

        <v-col class="form-inputs">
          <v-card-title class="text grey lighten-2">
            Acesse a sua fazenda
          </v-card-title>
          <v-divider />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row style="margin-top: 3px">
              <v-col cols="1" sm="11">
                <v-text-field
                  variant="underlined"
                  label="Email"
                  hint="Seu email cadastrado"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" sm="11">
                <v-text-field
                  type="password"
                  variant="underlined"
                  label="Senha"
                  hint="Sua senha"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions id="card-actions">
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog"> fechar </v-btn>
            <v-btn color="primary" :disabled="!valid" text @click="login">
              entrar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import sha256 from "crypto-js/sha256";
import { findUser } from "../scripts/mongo.js";
</script>

<script>
export default {
  name: "LoginForm",
  emits: ["closeDialog", "loggedIn", "loggedUser"],
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      userData: {},
      successfullyAuth: false,
      failedAuth: false,
      emailRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => v.length > 1 || "Preencha o campo com o seu email",
      ],
      passwordRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => v.length > 1 || "Preencha o campo com sua senha",
      ],
    };
  },
  props: {
    dialog: Boolean,
  },
  methods: {
    login() {
      this.$refs.form.validate();

      try {
        const pass = sha256(this.password);

        findUser(this.email, pass).then((user) => {
          if (user == null || user.active == false) {
            console.log("Auth failed");
            this.failedAuth = true;
            return;
          }
          console.log("Auth ok");
          this.userData = user;
          this.successfullyAuth = true;
          this.$emit("loggedIn");
          this.$emit("loggedUser", this.userData);
          this.$refs.form.reset();
        });
      } catch (error) {
        this.failedAuth = true;
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  watch: {
    failedAuth: {
      handler() {
        setTimeout(() => {
          this.failedAuth = false;
        }, 5000);
      },
    },
  },
};
</script>

<style scoped>
#form-image {
  width: 60vh;
  height: 50vh;
}

#card-actions {
  position: fixed;
  bottom: 0;
  right: 0;
}

.form-inputs {
  left: 350;
  width: 50vh;
}

.alert {
  z-index: 99999999;
  width: fit-content;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  animation: fadeinout 2s linear 1 forwards;
}
</style>
