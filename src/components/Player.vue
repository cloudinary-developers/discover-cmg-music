<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
<!-- Breadcrumbs here -->
    <v-breadcrumbs large>
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
        <div class="album-artist" v-if="!noTracks">
          <img :src="transformAlbumAvatarImage" :alt="album.title">
          <h3>{{album.title}}</h3>
          <rise-loader :loading="loading" color="#fff"></rise-loader>
        </div>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs6>
        <h3 v-if="noTracks">Wow! Something happened, we could not fetch the songs.</h3>
        <aplayer
          :autoplay="autoPlay"
          :music="initial"
          :list="tracks"
          float
          v-if="!loading"
          @playing="isPlayed($event)"
        />
        <rise-loader :loading="loading" color="#fff" v-if="!noTracks"></rise-loader>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs2 v-if="!noTracks">
        <social-sharing 
                      :title="this.share.title"
                      :description="this.share.description"
                      :quote="this.share.quote"
                      :hashtags="this.share.hashtags"
                      :twitter-user="this.share.twitteruser"
                      :url="this.share.src"
                      inline-template>
           <v-layout align-center justify-space-around>
            <network network="twitter">
              <v-icon>fa fa-twitter</v-icon>
            </network>
             <!-- <network network="email">
              <v-icon>fa fa-envelope</v-icon>
            </network>
            <network network="linkedin">
              <v-icon>fa fa-linkedin</v-icon>
            </network>
            <network network="whatsapp">
              <v-icon>fa fa-whatsapp</v-icon>
            </network>
            <network network="facebook">
              <v-icon>fa fa-facebook</v-icon> -->
            </network>

          </v-layout>
        </social-sharing>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Aplayer from 'vue-aplayer';
import RiseLoader from 'vue-spinner/src/RiseLoader';
import { API_BASE_URI, cl, goTo, formatSlug, normalizeTitle } from '../utils';
export default {
  data() {
    return {
      share:{},
      album: {},
      tracks: [],
      artist: {},
      originalTracks: [],
      playlist:[],
      autoPlay: false,
      cl,
      noTracks: false,
      loading: false,
      currentTrack: {},
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
    console.log('Route:',this.$route);

    this.fetchTracks(this.$route.params.albumId, this.$route.params.trackId);
    //this.album = this.$route.query.album;
   // console.log(this.album);
  },
  computed: {
    breadcrumbs() {
      // console.table(this.album);
      // console.log(this.album, this.artist, this.$route);
    //normalizeTitle
      let artistLink =
        '/artist/' + this.artist.id + '/' + this.artist.name;


      // Album
      return [
        {
          text: 'Search',
          link: '/browse/a', // Search or Browse
          disabled: false
        },
        {
          text: this.artist.name,
          link: artistLink,
          disabled: false
        },
        {
          text: this.album.title,
          link: this.$route.path,
          disabled: false
        },
        {
          text: this.currentTrack.title,
          link: this.$route.path,
          disabled: true
        }
      ];
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
    
    fetchTracks: async function(albumId,track_ID) {
      const trackId = parseInt(track_ID, 10);
      console.log(albumId,track_ID,trackId);
 
      this.loading = true;
      const response = await fetch(`${API_BASE_URI}/tracks/${albumId}`);
      const data = await response.json();

      console.log(data);
      this.loading = false;
      

      this.originalTracks = data.tracks.track;
      this.currentTrack = this.findTrackInList(track_ID);

      this.initial = this.formatPlayListItem(this.currentTrack);
      this.share = this.formatShareItem(this.currentTrack);

      console.log('currentTrack initial load:',this.currentTrack);

      //debugger

      this.tracks = this.createPlayList(this.originalTracks);
      this.playlist = this.createPlayList(this.originalTracks);

      this.album = this.tracks[0].albumInfo;
      this.artist = this.tracks[0].artistInfo;
      let title = this.artist.name + '>' + this.album.title + '>' + this.currentTrack.title;

        goTo(this.$router,`/player/${this.artist.id}/${this.album.id}/${this.currentTrack.id}/${normalizeTitle(title)}`,this.currentTrack); 
      
      this.autoPlay = true;
      this.loading = false;

       if (this.tracks.length < 1) {
        this.noTracks = true;
        return;
      }
    },
    createPlayList(tracks) {
      return tracks.map(track => this.formatPlayListItem(track));
    },
    createHashTag(text){
      return text.replace(/\./g, '').replace(/ /g, '');
    },
    formatShareItem(track){
      console.log("share track",track);
      let title = track.title.split('?')[0];
      let description =  `${track.artist.name} - ${track.release.title}`;
      let quote = `${track.artist.name} - ${track.release.title}`;

      /*
      url="https://vuejs.org/"
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      */

      const share = {
        url: `${API_BASE_URI}/song/${track.id}/stream`,
        title: title,
        description: description,
        quote: quote,
        hashtags: `${this.createHashTag(track.artist.name)},${this.createHashTag(track.release.title)}` ,
        twitteruser:"cloudinary"
      };
      console.log('share:',share);
      return share;
    },
    formatPlayListItem(track) {
      // console.log(track)
      const newTrack = {
        src: `${API_BASE_URI}/song/${track.id}/stream`,
        artist: track.artist.name,
        title: track.title,
        pic: track.release.image.replace('http', 'https'),
        theme: 'pic',
        id: track.id,
        artistInfo: track.artist,
        albumInfo: track.release || {}
      };
      return newTrack;
    },
    isPlayed(e) {
      const track_ID = e.srcElement.currentSrc.split('/')[5];

      this.currentTrack = this.findTrackInList(track_ID);
      this.share = this.formatShareItem(this.currentTrack);


      console.log('Selected Track',this.currentTrack.title,this.currentTrack, track_ID);

      let title = this.artist.name + '_' + this.album.title + '_' + this.currentTrack.title;

        goTo(this.$router,`/player/${this.artist.id}/${this.album.id}/${this.currentTrack.id}/${normalizeTitle(title)}`,this.currentTrack);

    },
    findTrackInList(id) {
      if(id === 0 || id ==="0"){
        return this.originalTracks[0];
      }
      return this.originalTracks.find(track => track.id === id.toString());
    },
    pickTrack(id) {
      return this.originalTracks.find(track => track.id === id.toString());
    }
  },
  components: {
    Aplayer,
    RiseLoader
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
