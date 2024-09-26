import { createApp } from 'vue';
import './assets/sass/app.scss';
import App from './App.vue';
import { router } from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).mount('#app')

