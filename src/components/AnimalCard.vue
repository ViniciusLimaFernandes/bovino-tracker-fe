<script setup>
import UseHubForm from "../components/UseHubForm.vue";
</script>

<template>
  <v-card class="card">
    <img id="hub-image" src="../assets/boi-profile.png" cover />

    <v-card-item>
      <v-card-title> BOI BUMBA </v-card-title>

      <v-card-subtitle>
        <span class="mr-1">#{{ animal.animal_serial }}</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" style="margin-bottom: 10px;" class="mx-0">
        ⏳ Idade: {{animal.age}} anos
      </v-row>
      <v-row align="center" class="mx-0">
        🐂 Raça: {{animal.breed}}
      </v-row>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title style="font-size: 16px">informacoes</v-card-title>
    
  </v-card>
</template>

<script>
// import { useWallet } from "solana-wallets-vue";
// import { withdraw } from "../scripts/solana";

export default {
  name: "AnimalCard",
  props: {
    animal: Object,
  },
};
</script>

<style>
.card {
  width: 25vh;
}

#hub-image {
  width: 25vh;
  height: 20vh;
}
</style>
