<template>
    <h1>Add Artist</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{tutorialId}}</h4>
    <v-form>
       <v-text-field
            label="Track Name"
            v-model="lesson.title"
        />
        <v-text-field
            label="Description"
            v-model="lesson.description"
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
import LessonDataService from "../services/LessonDataService";
export default {
  name: "add-lesson",
  props: {tutorialId : String,lessonId:String},
  data() {
    return {
      lesson: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveTrack() {
      var data = {
        title: this.lesson.title,
        description: this.lesson.description,
        tutorialId : this.tutorialId
      };
      LessonDataService.createLesson(this.tutorialId, data)
        .then(response => {
          this.lesson.id = response.data.id;
        
          this.$router.push({ name: 'view' , params: { id: this.tutorialId }} );
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