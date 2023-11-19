<script setup>
import AnimalCard from "../components/AnimalCard.vue";
import HubAdhesionsVue from "../components/HubAdhesions.vue";
import { findAnimals, findAnimalsAsync } from "../scripts/mongo";
</script>

<template>
  <HubAdhesionsVue :dialog="false" />
  <v-alert type="error" v-if="alertDisconnected" class="alert">
    Desconectado</v-alert
  >
  <v-alert type="success" v-if="animalEdit" class="alert">
    Dados atualizados com sucesso!
  </v-alert>
  <v-app v-if="isConnected" :key="refresh" class="dash-app">
    <v-container class="dash-container">
      <v-alert type="success" v-if="alertConnected" class="alert">
        Conexão realizada com sucesso!</v-alert
      >
      <v-alert type="success" v-if="alertSuccess" class="alert">
        Transação concluida!</v-alert
      >
      <v-progress-linear
        v-if="loading"
        color="deep-purple accent-4"
        indeterminate
        rounded
        height="6"
      >
      </v-progress-linear>
      <p v-if="!loading" class="dash-title">Painel de controle</p>
      <p v-if="!loading" class="dash-hubs">
        Animais: {{ animals.length }}
        <v-btn
          size="small"
          @click="
            openInNewTab(
              `https://monitoramentobovino.grafana.net/d/d18ce596-7fb9-4504-9013-5ebcb34e23e6/dados-gerais?orgId=1&var-Fazenda=${user.farm_name}&from=now-7d&to=now`
            )
          "
          >📊 Monitoramento do rebanho</v-btn
        >
      </p>

      <v-row v-if="!loading">
        <v-col id="hub-cols" v-for="animal in animals">
          <AnimalCard :animal="animal" @updatePage="updateAllAnimals" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    isConnected: Boolean,
    user: Object,
  },
  data() {
    return {
      alertConnected: false,
      alertDisconnected: false,
      alertSuccess: false,
      loading: false,
      animalEdit: false,
      refresh: 0,
      animals: [],
    };
  },

  watch: {
    isConnected: {
      handler(connection) {
        this.alertConnected = connection;
        this.alertDisconnected = !connection;
      },
      deep: true,
    },
    animalEdit: {
      handler() {
        setTimeout(() => {
          this.successEdit = false;
        }, 3000);
      },
    },
    animals: {
      handler() {
        if (this.animals.length == 0) {
          this.loading = true;
        }
        setTimeout(() => {
          this.loading = false;
        }, 5000);
      },
    },
    alertConnected(status) {
      if (status) {
        this.animals = findAnimals(this.user.farm_name);
        setTimeout(() => {
          this.alertConnected = false;
        }, 5000);
      }
    },
    alertDisconnected(status) {
      if (status) {
        this.animals = [];
        setTimeout(() => {
          this.alertDisconnected = false;
        }, 5000);
      }
    },
    alertSuccess(status) {
      if (status) {
        setTimeout(() => {
          this.alertSuccess = false;
        }, 5000);
      }
    },
  },

  methods: {
    openInNewTab(url) {
      window.open(url, "_blank", "noreferrer");
    },
    updateAllAnimals(){
      this.$forceUpdate();
    }
  },
  created() {
    this.animals = findAnimals(this.user.farm_name);
  },
};
</script>

<style scoped>
@font-face {
  font-family: Inter;
  src: url("./fonts/Inter-Light.otf");
}

@keyframes fadeinout {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.dash-app {
  margin-top: 4vh;
  min-width: fit-content;
}

.dash-title {
  font-family: "Inter-Extrabold";
  font-style: bold;
  font-weight: 800;
  font-size: 25px;
  line-height: 44px;
  color: rgb(5, 66, 5);
}

.dash-hubs {
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 44px;
  color: rgb(5, 66, 5);
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

#hub-cols {
  padding: 5px;
  margin-top: 2vh;
}
</style>
