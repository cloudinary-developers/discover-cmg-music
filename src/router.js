import VueRouter from 'vue-router'

import Browse from './components/Browse'
import Album from './components/Album'
import Player from './components/Player'

const routes = [{
    name: 'browse',
    path: '/',
    redirect: './browse/a'
  },
  {
    name: 'browse-alpha',
    path: '/browse/:alphabet',
    component: Browse
  },
  {
    name: 'album',
    path: '/artist/:artistId/:name',
    component: Album,
  },
  {
    name: 'playerA',
    path: '/player/:artistId/:albumId/:trackId/:title',
    component: Player
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router