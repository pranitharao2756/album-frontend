<template>
    <h1>Edit Album</h1>
    <h4>{{ message }}</h4>
    <v-form>
        <h4>Album Image</h4>
      <v-img max-height="100"
              max-width="100" :src=source></v-img><br>
       <v-text-field
            label="Title"
            v-model="album.title"
        />
        <v-text-field
            label="Description"
            v-model="album.description"
        />
        <button class="btn" @click="onPickFile">Click to upload a new album image</button>&nbsp;
        <input type="file"  ref="fileInput" accept="image/*" @change="onFilePicked"/>

        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateAlbum()"
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
import ArtistDataService from "../services/ArtistDataService";
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "edit-album",
  props: ['id','artistid','albumid'],
  data() {
    return {
      album: {},
      artist:{},
      message: "Enter data and click save",
      source : null,
      selectedFile: null,
      initialpath:"",
      artistid:"",
      albumid:""
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
    retrieveAlbum() {
        this.albumid = this.$route.params.albumid;
        this.artistid= this.$route.params.artistid;
      AlbumDataService.get(this.artistid,this.albumid)
        .then(response => {
          this.album= response.data;
          this.initialpath = this.album.image;
          this.source = this.album.image.substring(17);
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateAlbum() {
      let formData = new FormData();
      
      formData.append("title",this.album.title);
      formData.append("description",this.album.description);
      
      if(this.selectedFile != null)
      {
        formData.append("image", this.selectedFile);
        
        formData.append("initialpath",this.initialpath);
      }
      
      AlbumDataService.update(this.artistid,this.albumid,formData)
        .then(response => {
          this.album.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'viewargs', params: { id: this.artistid }}) ;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
      
    },
    cancel(){
       this.$router.push({ name: 'viewargs', params: { id: this.artistid }});
    }
  },
    mounted() {
    this.retrieveAlbum();
  }
}

</script>
<style>

</style>