<script setup>
import { Connection } from "@solana/web3.js";
import Dashboard from "./Dashboard.vue";
</script>

<template>
  <v-app class="home">
    <v-main>
      <div class="wallet-style">
        <v-btn class="Access-Button" rounded="xl" prepend-icon="mdi-account-circle" @click="access">{{loginButtonContent}}</v-btn>
      </div>
      <v-app-bar flat color="transparent" style="margin-top: 1vh">
        <v-app-bar-title
          ><img class="toolbar-image" src="../assets/logo.png" contain
        /></v-app-bar-title>
      </v-app-bar>
      <Dashboard :isConnected="connected" />
      <v-container class="Home-content">
        <h1 id="home-title" style="background: rgb(5, 66, 5); width: fit-content; margin-bottom: 3px;">Sua forma</h1>
        <h1 id="home-title" style="background: rgb(5, 66, 5); width: fit-content; margin-bottom: 3px;">inteligente</h1>
        <h1 id="home-title" style="background: rgb(5, 66, 5); width: fit-content; margin-bottom: 3px; white-space: nowrap;">de monitoramento</h1>
        <p id="home-subtitle" style="background: rgb(5, 66, 5); width: fit-content; margin-bottom: 3px;">
          Mantenha o controle da sua fazenda palma da sua mão.
        </p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "Home",

  data(){
    return {
      connected: false,
      loginButtonContent: "Entrar",
    }
  },

 methods: {
  access() {
    if(this.connected) {
      this.connected = false;
      this.loginButtonContent = "Entrar"
      return;  
    }
    this.connected = true;
    this.loginButtonContent = "Sair"
  }
 }
};
</script>

<style scoped>
@font-face {
  font-family: Inter;
  src: url("../fonts/Inter-Light.otf");
}

@font-face {
  font-family: Inter-Extrabold;
  src: url("../fonts/Inter-ExtraBold.otf");
}
.home {
  background: url("../assets/bg.png");
  background-size: cover;
  min-height: 100vh;
}

.toolbar-image {
  padding-left: 5vh;
  padding-right: 5vh;
}

.Access-Button{
  color: white;
  background-color: rgb(5, 66, 5);
}
.Home-content {
  position: absolute;
  width: 511px;
  height: 269px;
  left: 110px;
  top: 337px;
}

.wallet-style {
  position: fixed;
  right: 3vh;
  top: 2vh;
  z-index: 9999;
}

#home-title {
  font-family: "Inter-Extrabold";
  font-style: bold;
  font-weight: 800;
  font-size: 60px;
  line-height: 60px;
  color: #ffffff;
}

#home-subtitle {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #ffffff;
}
</style>
