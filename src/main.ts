import { createApp, ref, computed } from 'vue';

import App from './App.vue';

/**
 * Creates the main Vue application instance.
 * The `template` option defines the HTML structure for the root component.
 * The `setup()` function is where we define reactive state, computed properties,
 * and methods that will be exposed to the template.
 */
const app = createApp(App);

// Mount the Vue application to the DOM element with the ID "app".
app.mount('#app');