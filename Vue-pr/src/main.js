import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import HomeView from './view/HomeView.vue'
import pokemonDetail from './components/pokemonDetail.vue'
const routes =[
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/:id',
        component: pokemonDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  createApp(App)
  .use(router)
  .mount('#app')
