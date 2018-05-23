<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
<!-- Breadcrumbs here -->
    <v-breadcrumbs large="true">
      <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="item in breadcrumbs"
        :href="item.link"
        :key="item.text"
        :disabled="item.disabled">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <div class="album-artist">
          <img :src="transformAlbumAvatarImage" :alt="album.title">
          <h3>{{album.title}}</h3>
        </div>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs6>
        <h3 v-if="noTracks">No Tracks</h3>
        <aplayer
          :music="initial"
          :list="tracks"
          float
        />
      </v-flex>
      <v-flex xs1/>
      <v-flex xs2>
        <social-sharing :url="initial.src"
                      :title="initial.title"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="cloudinary,vuejs,music"
                      inline-template>
          <div>
            <network network="twitter">
              <img class="share--twitter" src="http://res.cloudinary.com/christekh/image/upload/c_crop,h_200,w_192/v1526979659/white-twitter-logo-transparent-background-9-300x200_atjr4d.png" alt="">
            </network>
          </div>
        </social-sharing>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Aplayer from 'vue-aplayer';
import { API_BASE_URI, cl } from '../utils';
export default {
  data() {
    return {
      album: {},
      tracks: [],
      artist: {},
      originalTracks: [],
      cl,
      noTracks: false,
      initial: {
        src: '/',
        artist: '',
        title: '',
        pic: '',
        theme: 'pic'
      }
    };
  },
  created() {
    this.fetchTracks(this.$route.params.albumId);
  },
  computed: {
    breadcrumbs (){
      console.log(this.album, this.album.artist, this.$route);
      let artistName =  this.artist.name;
      let artistLink = '../../artist/' + this.artist.id + '/' + this.artist.name;

     // Album
     return [
          {
            text: "Search",
            link: '/browse/a',
            disabled: false
          },
          {
            text: artistName,
            link: artistLink,
            disabled: false
          },
          {
            text: this.album.title,
            link: this.$route.path,
            disabled: false
          },
          {
            text: this.initial.title,
            link: this.$route.path,
            disabled: false
          }
        ]

    },
    transformAlbumAvatarImage() {
      return this.cl.url(this.album.image, {
        width: 200,
        height: 200,
        gravity: 'auto',
        crop: 'fill',
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
    updateBreadcrumbs: function(){

      this.breadcrumbs.pop();

      this.breadcrumbs.push({
            text: 'Song Name Here', //selected track
            link: this.$route.path,
            disabled: true
          });

    },
    fetchTracks: async function(albumId) {
      const response = await fetch(`${API_BASE_URI}/tracks/${albumId}`);
      const data = await response.json();
      this.originalTracks = data.tracks.track;
      this.tracks = this.transformTracks(this.originalTracks);
      if (this.tracks.length < 1) {
        this.noTracks = true;
        return;
      }
      this.album = this.originalTracks[0].release;
      this.artist = this.originalTracks[0].artist;
      this.initial = this.tracks[0];
      console.log('>>>>> ',data);
    },
    transformTracks(tracks) {
      return tracks.map(track => {
        const newTrack = {
          src: `${API_BASE_URI}/song/${track.id}/stream`,
          artist: track.artist.name,
          title: track.title,
          pic: track.release.image,
          theme: 'pic'
        };
        return newTrack;
      });
    }
  },
  components: {
    Aplayer
    // AlbumList
  }
};
</script>

<style>
.aplayer-title {
  color: #303030 !important;
}
.aplayer-list ol li:hover {
    color: #303030 !important;
}
.aplayer-list-light {
  color: #303030 !important;
}
.share--twitter {
  display: block;
  width: 50px;
  height: auto;
}
</style>
