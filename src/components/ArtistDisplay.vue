<template>
<v-row>
  <v-col  cols="9" sm="2">
      <v-img max-height="100"
              max-width="100" :src=source></v-img>
  </v-col>
  <v-col  cols="9"
        sm="2">
      <span >{{ artist.name }}</span>
  </v-col>
  
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateArtist"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewArtist"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteArtist"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    artist: Object
  },
  data() {
    return {
      source:this.artist.artistimage.substring(17)
    };
  },
  methods: {

    deleteArtist() {
      this.$emit("deleteArtist");
    },
    updateArtist() {
      this.$emit("updateArtist");
    },
    viewArtist() {
      this.$emit("viewArtist");
    }
  }
};
</script>

<style></style>
