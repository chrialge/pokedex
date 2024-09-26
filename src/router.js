import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './view/AppHome.vue';
import showPoke from './view/showPoke.vue';
import ShowPoke from './view/showPoke.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/projects/:slug',
            name: 'showPoke',
            component: ShowPoke,
        },
        // {
        //     path: '/:patchMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]

})

export { router };