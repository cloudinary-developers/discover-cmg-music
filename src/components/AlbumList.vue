<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 v-for="album in albums" :key="album.id">
        <v-card>
          <v-card-media
            :src="transformArtistBannerImage(album.image)"
            height="200px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline white--text" v-text="album.title"></span>
                  <p>{{transformArtistBannerImage(album.src)}}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-btn flat @click="goTo($router, `/player/${album.id}/${album.title}`)">Tracks</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { goTo } from '../utils';
export default {
  data() {
    return { goTo };
  },
  props: ['albums', 'cl'],
  methods: {
    transformArtistBannerImage(image) {
      return this.cl.url(image, {
        // width: 1800,
        height: 150,
        gravity: 'east',
        crop: 'lpad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch'
      });
    }
  }
};
</script>

