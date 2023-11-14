import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import ru from "element-plus/es/locale/lang/ru";
import "element-plus/dist/index.css";
import "./assets/index.postcss";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(ElementPlus, { locale: ru });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
