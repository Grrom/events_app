import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { createPinia } from "pinia";

import { initializeApp } from "firebase/app";
import AuthenticationHelper from "./helpers/AuthenticationHelper";
import firebaseConfig from "../firebaseConfig";

const app = createApp(App);

export const authenticationHelper = new AuthenticationHelper(
  initializeApp(firebaseConfig)
);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");
