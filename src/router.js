import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './view/AppHome.vue';
import TeamPoke from './view/TeamPoke.vue';
import ShowPoke from './view/ShowPoke.vue';
import NotFound from './view/NotFound.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/pokemons/:slug',
            name: 'showPoke',
            component: ShowPoke,
        },
        {
            path: '/teams/:slug',
            name: 'teams',
            component: TeamPoke,
        },
        {
            path: '/teams/:patchMatch(.*)*',
            redirect: { name: 'home' }
        },
        {
            path: '/:patchMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]

})

export { router };
