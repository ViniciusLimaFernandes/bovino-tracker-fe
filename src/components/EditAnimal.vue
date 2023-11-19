<template>
  <v-dialog v-model="dialog">
    <v-card width="30vh" height="40vh" style="overflow: hidden">
      <v-card-title class="text grey lighten-2">
        ✏️Editar dados do animal
      </v-card-title>
      <v-divider />
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        style="margin-left: 5%"
      >
        <v-row style="margin-top: 3px">
          <v-col cols="1" sm="11">
            <v-text-field
              variant="underlined"
              label="Nome do animal"
              hint="O nome que será definido para o seu animal"
              v-model="editAnimalName"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" sm="11">
            <v-text-field
              type="number"
              variant="underlined"
              label="Idade (meses)"
              hint="Idade do animal em meses"
              v-model="editAnimalAge"
              :rules="[(v) => /[0-9]/.test(v) && v<241 && !!v || 'Apenas números, max: 240. Obrigatório']"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-top: 3px">
          <v-col cols="1" sm="11">
            <v-text-field
              variant="underlined"
              label="Raça"
              hint="Raça do seu animal"
              v-model="editAnimmalBreed"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <v-card-actions id="card-actions">
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog"> fechar </v-btn>
        <v-btn color="primary" :disabled="!valid" text @click="saveAnimal">
          salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { updateAnimal } from "../scripts/mongo.js";

export default {
  name: "EditAnimal",
  emits: ["closeDialog", "updatePage"],
  data() {
    return {
      valid: true,
      editAnimalName: "",
      editAnimalAge: "",
      editAnimmalBreed: "",
      userData: {},
      successfullyAuth: false,
      successEdit: false,
      nameRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => (v.length > 0 && v.length < 20) || "Max. 20 caracteres",
      ],
    };
  },
  props: {
    animal: Object,
    dialog: Boolean,
  },
  methods: {
    saveAnimal() {
        this.animal.name = this.editAnimalName;
        this.animal.age = this.editAnimalAge
        this.animal.breed = this.editAnimmalBreed;
        updateAnimal(this.animal);
        this.successEdit = true;
        this.$refs.form.reset();
        this.$emit("updatePage");
        this.$emit("closeDialog");
    },
    closeDialog() {
      this.$refs.form.reset();
      this.$emit("closeDialog");
    },
  },
  watch: {
    successEdit: {
      handler() {
        setTimeout(() => {
          this.successEdit = false;
        }, 3000);
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
