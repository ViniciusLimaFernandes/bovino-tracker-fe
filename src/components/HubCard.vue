<script setup>
import UseHubForm from "../components/UseHubForm.vue";
</script>

<template>
  <UseHubForm
    @closeUseHubDialog="showUseHubForm = false"
    @updateHubs="updateAllHubs"
    :pubKey="hub.publicKeyObj"
    :kwhPrice="hub.price"
    :useHubDialog="showUseHubForm"
    :hubID="hub.publicKey"
    :hubOwner="hub.owner"
    :port="this.selectedPort"
  />
  <v-card :loading="loading" class="card">
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      color="#ffffff"
      height="10"
      indeterminate
    ></v-progress-linear>

    <img id="hub-image" src="../assets/hub-iot.png" cover />

    <v-card-item>
      <v-card-title> card title </v-card-title>

      <v-card-subtitle>
        <span class="mr-1">{{ hub.publicKey }}</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="10"
        ></v-rating>

        ({{ hub.usages }})
      </v-row>

      <div class="my-4 text-subtitle-1">⚡ • R$ 123 /KWh</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title style="font-size: 16px">portas disponíveis</v-card-title>
    <div class="px-4">
      <v-chip-group mandatory selected-class="text-purple">
        <v-chip
          v-for="port in hub.ports"
          :key="port"
          :value="port"
          :disabled="isActive(port)"
          @click="this.selectedPort = port"
          >{{ port }}</v-chip
        >
      </v-chip-group>
    </div>
    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2 "
        :disabled="!(this.selectedPort != null)"
        text
        @click="confirm"
      >
        selecionar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { useWallet } from "solana-wallets-vue";
// import { withdraw } from "../scripts/solana";

export default {
  name: "HubCard",
  emits: ["updateHubs"],
  props: {
    hub: Object,
    activePorts: Object,
  },
  data: () => ({
    valid: false,
    showUseHubForm: false,
    loading: false,
    // userWallet: useWallet().publicKey.value.toString(),
    selection: 1,
    selectedPort: null,
  }),
  methods: {
    confirm() {
      // console.log("porta selecionada: ", this.selectedPort);
      // this.loading = true;

      // this.showUseHubForm = true;

      // setTimeout(() => (this.loading = false), 4000);
    },
    isOwner() {
      // console.log(`User wallet: ${this.userWallet}, hub owner: ${hub.owner}`);
      // return this.userWallet == hub.owner;
    },
    withdrawHubBalance() {
      // withdraw(this.hub.publicKey)
      //   .then(() => this.$emit("updateHubs"))
      //   .catch((error) => {
      //     console.log("failed to withdraw: ", error.message);
      //   });
    },
    updateAllHubs() {
      this.$emit("updateHubs");
    },
    isActive(port) {
    //   let hubKey = this.hub.publicKey;
    //   if (this.activePorts.hasOwnProperty(hubKey)) {
    //     if (this.activePorts[hubKey].includes(port)) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return false;
   },
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
