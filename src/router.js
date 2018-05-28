import VueRouter from 'vue-router'

import Browse from './components/Browse'
import Album from './components/Album'
import Player from './components/Player'

const routes = [{
    name: 'browse',
    path: '/',
    redirect: './browse/a',
  },
  {
    name: 'browse-alpha',
    path: '/browse/:alphabet',
    components: { default: Browse},
    props: { default: true }
  },
  {
    name: 'album',
    path: '/artist/:artistId/:name',
    components: { default: Album},
    props: { default: true }
  },
  {
    name: 'player',
    path: '/player/:artistId/:albumId/:trackId/:title',
    components: { default: Player},
    props: { default: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router