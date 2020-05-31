import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/database';
import VModal from 'vue-js-modal';

Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDDdPPWGx-EEM8P7kQAolRkXatwDw20BdQ',
  authDomain: 'vue-notes-app-test.firebaseapp.com',
  databaseURL: 'https://vue-notes-app-test.firebaseio.com',
  projectId: 'vue-notes-app-test',
  storageBucket: 'vue-notes-app-test.appspot.com',
  messagingSenderId: '629288947167',
  appId: '1:629288947167:web:373bd44cf21dde14c5086a',
  measurementId: 'G-RTP4BWNY4C',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
