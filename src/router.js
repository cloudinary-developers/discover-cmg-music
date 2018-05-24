import VueRouter from 'vue-router'

import Browse from './components/Browse'
import Album from './components/Album'
import Player from './components/Player'

const routes = [{
    path: '/',
    redirect: './browse/a'
  },
  {
    path: '/browse/:alphabet',
    component: Browse
  },
  {
    path: '/artist/:artistId/:name',
    component: Album
  },
  {
    path: '/player/:albumId/:title/track/:trackId',
    component: Player
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router