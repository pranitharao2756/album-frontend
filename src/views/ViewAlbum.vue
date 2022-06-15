<template>
    
    <h4>{{ message }}</h4>
    <h3> Album: {{album.title}}</h3><br>    

     <v-row>
        <v-col  cols="8"
              sm="2">
            <span class="text-h6">Title</span>
        </v-col>
        <v-col  cols="8"
              sm="4">
            <span class="text-h6">Description</span>
        </v-col>
        <v-col  cols="8"
              sm="4">
            <span class="text-h6">Length</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <TrackDisplay
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        @deleteTrack="goDeleteTrack(track)"
        @updateTrack="goEditTrack(track)"
    />
    <v-btn color="success" @click="goEditAlbum()"
    >Edit</v-btn>&nbsp;
     <v-btn color="success" @click="goAddTrack(id)"
    >Add Track</v-btn>&nbsp;
    <v-btn color="success" @click="goAlbum()"
    >Back</v-btn>

   
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import TrackDataService from "../services/TrackDataService";
import TrackDisplay from '@/components/TrackDisplay.vue';
export default {
  name: "view-album",
  props: ['id'],
    components: {
        TrackDisplay
    },
  data() {
    return {
      album: {},
      tracks : [],
      message: "Add, Edit or Delete Tracks",
      artistid:null
    };
  },
  methods: {
    retrieveTracks() {
      AlbumDataService.getAlbum(this.id)
        .then(response => {
          this.album= response.data;
          this.artistid = this.album.artistId;
          TrackDataService.getAllTracks(this.id)
            .then(response=> {
              this.tracks = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditAlbum() {
      this.$router.push({ name: 'edit', params: { id: this.id } });
    },
    goAlbum()
    {
       this.$router.push({ name: 'viewargs', params: { id: this.artistid } });
    },
    goEditTrack(track) {
      this.$router.push({ name: 'editTrack', params: { albumid: this.id,trackid: track.id} });
    },
    goAddTrack() {
      this.$router.push({ name: 'addTrack', params: { albumid: this.id } });
    },

    goDeleteTrack(track) {
      
      TrackDataService.deleteTrack(track.albumId,track.id)
        .then( () => {
          this.retrieveTracks()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
    
  },
    mounted() {
    this.retrieveTracks();
  }
}
</script>

<style>
</style>