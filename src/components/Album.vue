<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <img :src="transformArtistBannerImage" :alt="artist.name">
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex xs2>
          <div class="album-artist">
            <img :src="transformArtistAvatarImage" :alt="artist.name">
            <h3 class="banner">{{artist.name}}</h3>
          </div>
        </v-flex>
        <v-flex xs1/>
        <v-flex xs9>
          <h3 v-if="noAlbums">No albums</h3>
          <album-list v-else :albums="albums" :cl="cl"></album-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AlbumList from './AlbumList'
import { API_BASE_URI, cl } from '../utils';
export default {
  data() {
    return {
      artist: {},
      albums: [],
      cl,
      noAlbums: false
    };
  },
  created() {
    this.fetchAlbums(this.$route.params.artistId);
  },
  computed: {
    transformArtistAvatarImage() {
      return this.cl.url(this.artist.image, {
        width: 200,
        height: 200,
        gravity: 'face',
        crop: 'crop',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch'
      });
    },
    transformArtistBannerImage() {
      return this.cl.url(this.artist.image, {
        width: 1800,
        height: 150,
        gravity: 'west',
        crop: 'lpad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch'
      });
    }
  },
  methods: {
    fetchAlbums: async function(artistId) {
      const response = await fetch(`${API_BASE_URI}/releases/${artistId}`);
      const data = await response.json();
      this.albums = data.releases.release;
      if(this.albums.length < 1) {
        this.noAlbums = true;
        return;
      }
      this.artist = this.albums[0].artist;
      console.log(this.albums);
    }
  },
  components: {
    AlbumList
  }
};
</script>

<style>
.album-artist img {
  border-radius: 100%;
  width: 200px;
  margin: auto;
  display: block;
}
.album-artist h3 {
  text-align: center;
  margin-top: 10px;
}
.banner {
   position: absolute;
   top: 80px;
   left: 350px;
   font-size: 64px;  
}
</style>
