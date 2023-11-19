<script setup>
import EditAnimal from './EditAnimal.vue';
</script>

<template>
  <EditAnimal :animal="animal" :dialog="showEditForm" @closeDialog="showEditForm=false" @updatePage="updateAllAnimals"/>
  <v-card class="card">
    <img id="hub-image" src="../assets/boi-profile.png" cover />
    <v-card-item>
      <v-card-title>{{animal.name}} 
        <v-btn size="x-small" color="green" @click="editAnimal">editar</v-btn>
      </v-card-title>

      <v-card-subtitle>
        <span class="mr-1">#{{ animal.animal_serial }}</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" style="margin-bottom: 10px;" class="mx-0">
        ⏳ Idade: {{animal.age}} meses
      </v-row>
      <v-row align="center" class="mx-0">
        🐂 Raça: {{animal.breed}}
      </v-row>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-btn 
    @click="openInNewTab(`https://monitoramentobovino.grafana.net/d/fd44a297-4832-4409-96b2-03c87376769d/dados-estado-boi?orgId=1&var-Fazenda=${animal.farm_name}&var-Node_serial=${animal.animal_serial}&from=now-24h&to=now`)"
    style="font-size: 14px;" variant="text">🔎 Informacoes</v-btn>
    
  </v-card>
</template>

<script>
export default {
  name: "AnimalCard",
  emits: ["updatePage"],
  data() {
    return {
      showEditForm: false,
    }
  },
  props: {
    animal: Object,
  },
  methods: {
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
    editAnimal(){
      this.showEditForm=true;
    },
    updateAllAnimals(){
      this.$emit("updatePage")
    }
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
