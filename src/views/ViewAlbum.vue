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
              sm="1">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col  cols="8"
              sm="1">
            <span class="text-h6">Delete</span>
        </v-col>
      </v-row>
      <LessonDisplay
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @deleteLesson="goDeleteLesson(lesson)"
        @updateLesson="goEditLesson(lesson)"
    />
     <v-btn color="success" @click="goEditAlbum()"
    >Edit</v-btn>&nbsp;
     <v-btn color="success" @click="goAddTrack(id)"
    >Add Track</v-btn>&nbsp;
    <v-btn color="success" @click="goAlbum()"
    >Back</v-btn>


   
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import TrackDataService from "../services/TrackDataService";
import LessonDisplay from '@/components/LessonDisplay.vue';
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "view-album",
  props: ['id'],
    components: {
        LessonDisplay
    },
  data() {
    return {
      tutorial: {},
      lessons : [],
      message: "Add, Edit or Delete Tracks",
      artist:false,
      artistname:""
    };
  },
  methods: {
    retrieveTracks() {
      TutorialDataService.get(this.id)
        .then(response => {
          this.tutorial= response.data;
          if(!!this.tutorial.artistId)
          {
            this.artist = true;
          
          ArtistDataService.getArtist(this.tutorial.artistId)
          .then(response=>{
            this.artistname = response.data.name;
          })
          .catch(e => {
                this.message = e.response.data.message;
              });
          }
          TrackDataService.getAllTracks(this.id)
            .then(response=> {
              this.lessons = response.data})
            .catch(e => {
                this.message = e.response.data.message;
              });
            })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     goEditTutorial() {
      this.$router.push({ name: 'edit', params: { id: this.id } });
    },
    goEditLesson(lesson) {
      this.$router.push({ name: 'editLesson', params: { tutorialId: this.id,lessonId: lesson.id} });
    },
    goAddTrack() {
      this.$router.push({ name: 'addTrack', params: { tutorialId: this.id } });
    },
    goAddArtist(){
      this.$router.push({ name: 'addArtist', params: { tutorialId: this.id } });
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