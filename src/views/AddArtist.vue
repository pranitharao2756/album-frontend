<template>
    <h1>Add Artist</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Artist name"
            v-model="artist.name"
        />
        <button class="btn btn-info" @click="onPickFile">Upload artist image</button>
        <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
        
        
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="addArtist($route.params.id)"
                    >Add artist</v-btn
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
import ArtistDataService from "../services/ArtistDataService";
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "add-artist",
  props: {tutorialId : String},
  data() {
    return {
      artist: {
        id:null,
        name:""
      },
      message: "Enter data and click save",
      selectedFile:null
    };
  },
  methods: {
     onPickFile () {
  this.$refs.fileInput.click()
},
onFilePicked (event) {
  const files = event.target.files
  let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    this.imageUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  this.selectedFile = files[0]
},
    addArtist(albumid) {
      let formData = new FormData();
      formData.append("artistimage", this.selectedFile);
      formData.append("name",this.artist.name);
      
      ArtistDataService.createArtist(formData)
        .then(response => {
          this.artist.id = response.data.id;
          console.log(this.artist.id)
           var data = {
        artistId: this.artist.id
      };
      TutorialDataService.update(albumid,data)
        .then(response => {
          
          console.log("add "+response.data);
          this.$router.push({ name: 'albums' });
        })
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
       

    },
    cancel(){
        
        this.$router.push({ name: 'albums' });
    }
    
  }
    
}

</script>
<style>

</style>