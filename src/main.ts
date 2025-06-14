import { createApp } from 'vue';

import App from './App.vue';

import { createPinia } from 'pinia';

import './assets/style.css';

/**
 * Creates the main Vue application instance.
 * The `template` option defines the HTML structure for the root component.
 * The `setup()` function is where we define reactive state, computed properties,
 * and methods that will be exposed to the template.
 */
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

// Mount the Vue application to the DOM element with the ID "app".
app.mount('#app');
