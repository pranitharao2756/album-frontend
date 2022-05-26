<template>
    <v-app>
      <v-app-bar  >
            <v-img
                class="mx-2"
                :src="logo"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-app-bar-title  >Album</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn 
                    variant="text"
                    @click="goList"
                    >
                  List
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goAdd"
                    >
                  Add Album
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goAddTrack"
                    >
                  Add Track
                </v-btn>
                
                
          
    </v-toolbar-items>
      </v-app-bar>
      <v-main >
        <v-container>
          <router-view />
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>

import logo from './assets/oc-logo-white.png'
export default {


  name: 'App',

  data: () => ({
    logo,
    
  }),
  methods: {
    goAdd() {
      
      this.$router.push({ name: 'add' });
    },
    goAddTrack() {
      this.$router.push({ name: 'addTrack' });
    },
    
  },

}
</script>

