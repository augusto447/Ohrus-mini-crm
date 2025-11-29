import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import { createPinia } from "pinia";
import "./global.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
