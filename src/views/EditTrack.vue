<template>
    <h1>Edit Track</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{album.title}} <br> Track : {{track.title}}</h4>

    <v-form>
       <v-text-field
            label="Title"
            v-model="track.title"
        />
        <v-text-field
            label="category"
            v-model="track.category"
        />
        <v-text-field
            label="length"
            v-model="track.length"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveTrack()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "edit-track",
  props: {albumid : String,trackid:String},
  data() {
    return {
      album:{},
      track: Object,
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveTrack() {
      AlbumDataService.getAlbum(this.$route.params.albumid)
        .then(response => {
          this.album= response.data;
          TrackDataService.getTrack(this.$route.params.albumid,this.$route.params.trackid)
            .then(response=> {
              this.track = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
      
    },
    saveTrack() {
      
      var data = {
        title: this.track.title,
        category: this.track.category,
        albumId : this.$route.params.albumid,
        length: this.track.length
      };
       
      TrackDataService.updateTrack(this.track.albumId,this.track.id, data)
        .then(response => {
          this.track.id = response.data.id;
        
          this.$router.push({ name: 'viewalbum' , params: { id: this.track.albumId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'viewalbum' , params: { id: this.track.albumId }} );
    }
  },
  
    mounted() {
      this.retrieveTrack();
  }
}

</script>
<style>

</style>