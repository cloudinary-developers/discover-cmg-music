<template>
  <div>
  	<v-carousel hide-controls hide-delimiters interval="3000" dark>
      <v-carousel-item v-for="(item,i) in transformedItems" 
      :src="item.src" 
      :key="item.id"
      transition="fade"
      reverse-transition="fade">
		 <h1 class="display-4">{{item.name}}</h1>
		 <img :src="transformCoverImage(item)"  @click="navigateTo(item)">
          	     
      </v-carousel-item>
	</v-carousel>

    <!-- <v-list two-line subheader>
      <v-list-tile v-for="item in transformedItems" :key="item.id" avatar @click="navigateTo(item)">
        <v-list-tile-avatar>
          <img :src="item.image.replace('300.jpg', '50.jpg').replace('http', 'https')">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>ARTIST</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list> -->
    
  </div>
</template>

<script>
import {  goTo, normalizeTitle, cl } from '../utils';
export default {
  name: 'carousel',
  props: ['items', 'type'],
  data() {
    return {
      goTo,
      normalizeTitle,
      cl
    }
  },
  computed: {
    transformedItems() {
      if(this.type === 'search') {
        return this.items.map(item => item.artist)
      } else {
        return this.items
      }
    }
  },
  methods: {
  	transformCoverImage(item) {
  		console.log(item)
      let url =  item.image || "http://artwork-cdn.7static.com/static/img/artistimages/00/008/194/0000819457_300.jpg";
      return this.cl.url(url, {
        width: '1036',
        height: 250,
        gravity: 'center',
        crop: 'pad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        // radius: '0:0:149:0',
        //predominant
        effect:'gradient_fade:symmetric_pad:0.05',
        // x:0.2,
        fetchFormat: 'auto',
        format:'png',
        quality: 'auto',
        type: 'fetch',
      });
    },    
    navigateTo(item){
      return goTo(this.$router, `/artist/${item.id}/${normalizeTitle(item.name)}`,item)
    }
  }
};
</script>
<style>

.carousel{
	height: 350px; 
	/*width:300px;*/
	/*background: #FFF;*/
	/*width: 100%;*/
}

h1{

	/*color: #000;*/
}

.fade-enter-active,
.fade-leave-active,
.fade-leave-to {
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
}
.fade-enter,
.fade-leave,
.fade-leave-to {
  opacity: 0;
}

	
</style>
