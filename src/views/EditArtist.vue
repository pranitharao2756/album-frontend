<template>
    <h1>Edit Artist Information</h1>
    <h4>{{ message }}</h4><br>
    <v-form>
      <h4>Artist Image</h4>
      <v-img max-height="100"
              max-width="100" :src=source></v-img><br>
      
      
       <v-text-field
            label="Artist name"
            v-model="artist.name"
        />

        <button class="btn" @click="onPickFile">Click to upload a new artist image</button>&nbsp;
        <input type="file"  ref="fileInput" accept="image/*" @change="onFilePicked"/>

        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <br><v-btn color="success" @click="updateArtist()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <br><v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "edit-artist",
  props: ['id'],
  data() {
    return {
      artist: {},
      source:null,
      selectedFile:null,
      initialpath:"",
      message: "Enter data and click save"
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
    retrieveArtist() {
      ArtistDataService.getArtist(this.id)
        .then(response => {
          this.artist= response.data;
          
          this.source = this.artist.artistimage.substring(17);
          this.initialpath = this.artist.artistimage;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },

    updateArtist() {
      let formData = new FormData();
      
      formData.append("name",this.artist.name);
      if(this.selectedFile != null)
      {
        formData.append("artistimage", this.selectedFile);
        formData.append("initialpath",this.initialpath);
      }
      
      ArtistDataService.update(this.id,formData)
        .then(response => {
          this.artist.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'artists' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        
        this.$router.push({ name: 'artists' });
    }
    
  },
    mounted() {
    this.retrieveArtist();
  }
}

</script>
<style>

</style>