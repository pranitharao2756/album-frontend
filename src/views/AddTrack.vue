<template>
    <h1>Add Track</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Track Name"
            v-model="track.title"
        />
        <v-text-field
            label="Track Category"
            v-model="track.category"
        />
        <v-text-field
            label="Track Length"
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
export default {
  name: "add-lesson",
  props: ['albumId'],
  data() {
    return {
      track: {
        id: null,
        title: "",
        category: "",
        length:""
        
      },
      message: "Enter data and click save",
      album:{}
    };
  },
  methods: {
    saveTrack() {
      var albumid = this.$route.params.id;
      var data = {
        title: this.track.title,
        category: this.track.category,
        albumId: albumid,
        length : this.track.length
      };
      TrackDataService.createTrack(albumid, data)
        .then(response => {
          this.track.id = response.data.id;
        
          this.$router.push({ name: 'viewalbum' , params: { id: albumid }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'viewalbum' , params: { id: this.$route.params.id }} );
    }
  }
}

</script>
<style>

</style>