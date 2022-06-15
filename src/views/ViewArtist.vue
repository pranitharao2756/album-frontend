<template>
    <h2>Artist : <span> {{artist.name}}</span> </h2>
    <h4>{{ message }}</h4><br>
    <v-btn color="primary" @click="goArtist()"
    >Back</v-btn>&nbsp;
    <v-row >
        <v-col  cols="12"
        sm="2">
          <br><v-btn color = "success"
            @click="searchTitle"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <br><v-text-field density="compact" clearable
              label = "Search your favorite albums"
              v-model="title"/>
        </v-col> 
      </v-row>

    <v-row>
        <v-col  cols="9"
              sm="2">
              <span class="text-h6">Album</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6">Description</span>
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
      <AlbumDisplay
        v-for="album in albums"
        :key="album.id"
        :album="album"
        @deleteAlbum="goDelete(album)"
        @updateAlbum="goEdit(album)"
        @viewAlbum="goView(album)"
    /><br>
  <v-btn color="success" @click="goEditArtist()"
    >Edit Artist</v-btn>&nbsp;
     <v-btn color="success" @click="goAddAlbum(id)"
    >Add Album</v-btn>&nbsp;
    
  <v-btn  @click="removeAllAlbums">
    Remove All
  </v-btn>
</template>
<script>

import AlbumDataService from "../services/AlbumDataService";
import TrackDataService from "../services/TrackDataService";
import AlbumDisplay from '@/components/AlbumDisplay.vue';
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "view-album",
  props: ['id','artistid','albumid'],
    components: {
        AlbumDisplay
    },
  data() {
    return {
      artist: {},
      albums : [],
      message: "Add, Edit or Delete Albums",
      artist:false,
      artistname:"",
      albumid:null,
      artistid:null,
      currentAlbum: null,
      currentIndex: -1
    };
  },
  methods: {
    goEdit(album) {
      this.$router.push({ name: 'editAlbum', params: { artistid: this.id, albumid:album.id} });
    },
    goView(album) {
      this.$router.push({ name: 'viewalbum', params: { id: album.id } });
    },
    goArtist(){
      this.$router.push({ name: 'artists' });
    },
    goDelete(album) {
      
      TrackDataService.deleteAll(album.id)
      .then( () => {})
      .catch(e => {
        this.message = e.response.data.message;
      })
      
      AlbumDataService.delete(album.id)
        .then( () => {
          this.retrieveAlbums();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    retrieveAlbums() {
      ArtistDataService.getArtist(this.id)
        .then(response => {
          this.artist= response.data;
          
            AlbumDataService.getAllAlbums(this.id)
            .then(response=> {
              this.albums = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditArtist() {
      this.$router.push({ name: 'edit', params: { id: this.id } });
    },
    
    goAddAlbum() {
      this.$router.push({ name: 'add', params: { artistid : this.id } });
    },

    removeAllAlbums() {
      
      AlbumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    searchTitle() {
      AlbumDataService.findByTitle(this.id,this.title)
        .then(response => {
          this.albums = response.data;
          this.setActiveAlbum(null);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    setActiveAlbum(album, index) {
      this.currentAlbum = album;
      this.currentIndex = album ? index : -1;
    },
     refreshList() {
      this.retrieveAlbums();
      this.currentAlbum = null;
      this.currentIndex = -1;
    }
  },
    mounted() {
    this.retrieveAlbums();
  }
}
</script>

<style>
</style>