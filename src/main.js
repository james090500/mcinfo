import { createApp } from 'vue'
import App from './App.vue'

// Create Vue App
const app = createApp(App)
app.config.productionTip = false

// Include CSS file
require("halfmoon/css/halfmoon.min.css");

// Import JS Library
var halfmoon = require("halfmoon");
window.halfmoon = halfmoon;

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faCopyright, faSearch, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCopyright, faCog, faSearch, faToggleOn, faToggleOff, faGithub);
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

// Mount Vue app
app.mount('#app')