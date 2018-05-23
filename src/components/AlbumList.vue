<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 v-for="album in albums" :key="album.id">
        <a @click="goTo($router, `/player/${album.id}/${album.title.replace('/', '-').replace(' ', '-').toLowerCase()}`)">
        <v-card>
          <v-card-media
            :src="transformArtistBannerImage(album.image)"
            height="200px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
              <p>{{transformArtistBannerImage(album.src)}}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <span class="headline white--text" v-text="album.title"></span>
          </v-card-actions>
        </v-card>
      </a>
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
        width: 300,
        height: 150,
        gravity: 'center',
        crop: 'pad',
        // aspectRatio: '16:9',
        background:'auto:predominant',
        //background: 'blurred:10',
     //   effect:"art:red_rock",
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch'
      });
    }
  }
};
</script>

<style>
.card__media__content {
  height: 200px;
}
</style>
