import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "solana-wallets-vue/styles.css";
import { Buffer } from "buffer";

loadFonts();

window.Buffer = Buffer;

createApp(App).use(router).use(vuetify).mount("#app");
