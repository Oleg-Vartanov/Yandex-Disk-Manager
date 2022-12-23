import { createApp } from 'vue';

import './styles/scss/styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App.vue';
import { router } from './router';

const app = createApp(App);

app.use(router);

router.isReady().finally(() => {
  app.mount('#app');
});
