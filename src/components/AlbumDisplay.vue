<template>
<v-row>
  <v-col  cols="9"
        sm="2">
      <v-img max-height="100"
              max-width="100" :src=source></v-img>
  </v-col>
  <v-col  cols="9"
        sm="2">
      <span >{{ album.title }}</span>
  </v-col>
  <v-col  cols="9"
        sm="4">
      <span> {{ album.description }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAlbum"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewAlbum"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAlbum"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    album: Object
  },
  data() {
    return {
      source:this.album.image.substring(17)
    };
  },
  methods: {

    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    updateAlbum() {
      this.$emit("updateAlbum");
    },
    viewAlbum() {
      this.$emit("viewAlbum");
    }
  }
};
</script>

<style></style>
