<template>
    <h1>Add Track</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{this.tutorialId}}</h4>
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
            label="Artist"
            v-model="track.artist"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveTrack($route.params.id)"
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
import LessonDataService from "../services/LessonDataService";
export default {
  name: "add-lesson",
  props: ['tutorialId'],
  data() {
    return {
      track: {
        id: null,
        title: "",
        category: "",
        artist:"",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveTrack(albumid) {
      var data = {
        title: this.track.title,
        category: this.track.category,
        albumId: albumid,
        artist : this.track.artist
      };
      LessonDataService.createLesson(albumid, data)
        .then(response => {
          this.track.id = response.data.id;
        
          this.$router.push({ name: 'view' , params: { id: albumid }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.tutorialId }} );
    }
  }
}

</script>
<style>

</style>