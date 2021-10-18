import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

//Pages
import HomePage from './pages/HomePage.vue'
import UserPage from './pages/UserPage.vue'
import McInfo from './McInfo.vue'

// Create Vue App
const app = createApp(McInfo)
app.config.productionTip = false

// Include CSS file
require("halfmoon/css/halfmoon.min.css");

// Import JS Library
var halfmoon = require("halfmoon");
window.halfmoon = halfmoon;

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faCopyright, faHome, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCopyright, faCog, faSearch, faToggleOn, faToggleOff, faHome,faGithub);
app.component('fa', FontAwesomeIcon)

// Filters
app.config.globalProperties.$filters = {
    formatDate(value) {
        if(/^\d+$/.test(value)) value = +value;
        let date = new Date(value);
        let formatDate = `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        let formatTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
        return `${formatDate} ${formatTime}`
    }
}

// Axios
import axios from 'axios'
app.config.globalProperties.axios = axios;

// Router
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/:user?', component: UserPage }
    ]
})
app.use(router);

// Mount Vue app
app.mount('#app')