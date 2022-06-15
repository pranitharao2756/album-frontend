<template>

    <h1>Artist List</h1>
    <h4>{{ message }}</h4>
  
      <v-row >
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchTitle"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="title"/>
        </v-col> 
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
              <span class="text-h6">Artist</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Name</span>
        </v-col>
        
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <ArtistDisplay
        v-for="artist in artists"
        :key="artists.id"
        :artist="artist"
        @deleteArtist="goDelete(artist)"
        @updateArtist="goEdit(artist)"
        @viewArtist="goView(artist)"
    />
 
  <v-btn  @click="removeAllArtists">
    Remove All
  </v-btn>
</template>
<script>

import ArtistDisplay from '@/components/ArtistDisplay.vue';

import ArtistDataService from "../services/ArtistDataService";

export default {
  name: "artist-list",
  data() {
    return {
      artists: [],
      currentArtist: null,
      currentIndex: -1,
      title: "",
      message : "Search, Edit or Delete Artists"
    };
  },
  components: {
        ArtistDisplay
    },
  methods: {
    goEdit(artist) {
      this.$router.push({ name: 'edit', params: { id: artist.id } });
    },
    goView(artist) {
      this.$router.push({ name: 'viewargs', params: { id: artist.id } });
    },
    goDelete(artist) {
      
      ArtistDataService.delete(artist.id)
        .then( () => {
          this.retrieveArtists()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveArtists() {
      ArtistDataService.getAll()
        .then(response => {
          this.artists = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveArtists();
      this.currentArtist = null;
      this.currentIndex = -1;
    },
    setActiveArtist(artist, index) {
      this.currentArtist = artist;
      this.currentIndex = artist ? index : -1;
    },
    removeAllArtists() {
      ArtistDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchTitle() {
      ArtistDataService.findByTitle(this.title)
        .then(response => {
          this.artists = response.data;
          this.setActiveArtist(null);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveArtists();
  }
};
</script>
<style>

</style>