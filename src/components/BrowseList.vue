<template>
  <div>
    <v-list two-line subheader>
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
    </v-list>
    
  </div>
</template>

<script>
import {  goTo, normalizeTitle } from '../utils';
export default {
  name: 'browser-list',
  props: ['items', 'type'],
  data() {
    return {
      goTo,
      normalizeTitle
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
    
    navigateTo(item){
      return goTo(this.$router, `/artist/${item.id}/${normalizeTitle(item.name)}`,item)
    }
  }
};
</script>

