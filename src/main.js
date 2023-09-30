import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseCard from './UI/BaseCard.vue'
import BaseError from './UI/BaseError.vue'
import BaseButton from './UI/BaseButton.vue'
import store from './store/store.js'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
app.use(router);
app.use(store);
app.use(vuetify)
app.component('base-card', BaseCard);
app.component('base-error', BaseError);
app.component('base-button', BaseButton);

app.mount('#app');
