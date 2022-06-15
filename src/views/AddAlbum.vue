<template>
    <h1>Add Album</h1>
    <h4>{{ message }}</h4>
    <v-form encType = "multipart/form-data">
       <v-text-field
            label="Album Title"
            v-model="album.title"
        />
        <v-text-field
            label="Album Category"
            v-model="album.description"
        />
        <button class="btn btn-info" @click="onPickFile">Upload album image</button>
        <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked"/>
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="AddAlbum($route.params.id)"
                    >Add album</v-btn
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
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save",
      selectedFile: ""
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
    AddAlbum(artistid) {
      let formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("title",this.album.title);
      formData.append("description",this.album.description);
      
      
      AlbumDataService.create(artistid,formData)
        .then(response => {
          this.album.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'view' , params: { id: artistid }});
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'artists' });
    }
  }
}

</script>
<style>

</style>