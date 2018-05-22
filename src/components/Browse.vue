<template>
 <div>
    <v-container fluid fill-height>
    <v-layout>
      <v-flex xs8 offset-xs2>
         <v-text-field
          name="input-1-3"
          label="Search Artists"
          single-line
          prepend-icon="search"
          v-model="search"
          @input="debounceSearch"
        ></v-text-field> 
      </v-flex>
    </v-layout>
    
  </v-container>
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs2>
        <browse-list  v-if="!loading" :items="items" :type="type" :pageSize="pageSize" :totalItems="totalItems" @changePage="changePage($event)"></browse-list>
        <div v-if="!loading" class="text-xs-center">
          <v-pagination :length="Math.ceil(totalItems / pageSize)" v-model="page" circle></v-pagination>
        </div>
        <rise-loader :loading="loading" color="#fff"></rise-loader>
      </v-flex>
      <v-flex xs2>
        <div class="alphabets" v-for="i in Math.ceil(alphabets.length / 6)" :key="i">
          <v-container fluid fill-height>
            <v-layout @click="goTo($router, `/browse/${alphabet}`)" v-for="(alphabet) in alphabets.slice((i - 1) * 6, i * 6)" :key="alphabet" row shrink>
              <v-flex xs2>
                <h3>{{alphabet.toUpperCase()}}</h3>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
 </div>
</template>

<script>
import debounce from 'lodash/debounce';
import BrowseList from './BrowseList';
import RiseLoader from 'vue-spinner/src/RiseLoader';
import { API_BASE_URI, ALPHABETS, goTo, fetchFilteredItems } from '../utils';
export default {
  name: 'browser',
  data() {
    return {
      search: '',
      items: [],
      type: 'browse',
      alphabets: ALPHABETS.split(''),
      goTo,
      loading: false,
      page: 1,
      totalItems: 0,
      pageSize: 6
    };
  },
  watch: {
    '$route.params.alphabet'() {
      this.fetchBrowsedItems(this.$route.params.alphabet);
    },
    page(newPage) {
      this.fetchBrowsedItems(this.$route.params.alphabet, newPage);
    }
  },
  created() {
    this.fetchBrowsedItems(this.$route.params.alphabet);
  },
  methods: {
    debounceSearch: debounce(function(text) {
      if (!text) return;
      this.search = text;
      this.fetchSearchedItem.call(this, text);
    }, 1000),
    fetchBrowsedItems: async function(browsePath = 'a', page, pageSize) {
      this.loading = true;
      const data = await fetchFilteredItems(
        'browse',
        browsePath,
        page,
        pageSize
      );
      this.type = 'browse';
      this.items = data.artists.artist;
      this.totalItems = data.artists.totalItems;
      this.page = page;
      this.loading = false;
    },
    fetchSearchedItem: async function(searchTerm, page, pageSize) {
      if(!searchTerm) return;
      this.loading = true;
      const data = await fetchFilteredItems(
        'search',
        searchTerm,
        page,
        pageSize
      );
      console.log(data);
      this.type = 'search';
      this.items = data.searchResults.searchResult;
      this.totalItems = data.searchResults.totalItems;
      this.page = page;
      this.loading = false;
    },
    changePage(newPage) {
      this.fetchFilteredItems(this.$route.params.alphabet, 'browse', newPage);
    }
  },
  components: {
    BrowseList,
    RiseLoader
  }
};
</script>

<style>
.alphabets .container {
  padding: 2px;
}

.alphabets .layout {
  padding: 10px 15px;
  text-align: center;
}
.alphabets .layout:hover {
  background: #e1e1e1;
  color: #303030;
  cursor: default;
}
.pagination {
  margin-top: 15px;
}
.pagination__item--active {
  color: #303030 !important;
}
</style>
