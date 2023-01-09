import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueLazyLoad from "vue3-lazyload";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

createApp(App).use(VueLazyLoad, {}).use(router).mount("#app");
