<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      app
      fixed
      clipped
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="goHome()"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'search',
          title: 'Browse'
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Vuesic',
    };
  },
  methods: {
    goHome() {
      window.location.href = '/'
    }
  }
};
</script>
