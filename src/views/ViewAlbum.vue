<template>
    <h2>Album : <span> {{tutorial.title}}</span> </h2>
    <h4>{{ message }}</h4><br>
    
    <v-btn color="success" @click="goEditTutorial()"
    >Edit</v-btn>&nbsp;
     <v-btn color="success" @click="goAddTrack(id)"
    >Add Track</v-btn>&nbsp;

    <h3 v-if="artist"> Artist : {{artistname}}</h3>
    <v-btn v-else color="success" @click="goAddArtist()"
    >Add Artist</v-btn>
    <br>

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

   
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import LessonDataService from "../services/LessonDataService";
import LessonDisplay from '@/components/LessonDisplay.vue';
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "view-tutorial",
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
    retrieveLessons() {
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
          LessonDataService.getAllLessons(this.id)
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

    goDeleteLesson(lesson) {
      LessonDataService.deleteLesson(lesson.albumId,lesson.id)
        .then( () => {
          this.retrieveLessons()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'albums' });
    }
  },
    mounted() {
    this.retrieveLessons();
  }
}
</script>

<style>
</style>