<template>
  <v-dialog v-model="dialog">
    <v-card width="120vh" height="60vh" style="overflow: hidden">
      <p>teste</p></v-card
    >
  </v-dialog>
</template>

<script>
import { findActiveAdhesions } from "../scripts/mongo.js";

export default {
  name: "HubAdhesions",
  props: {
    dialog: Boolean,
  },
  created() {
    // var client = mqttConnection();

    // client.subscribe("esp");
  },
};
</script>

<style scoped></style>
