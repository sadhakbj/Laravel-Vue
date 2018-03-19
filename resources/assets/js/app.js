require('./bootstrap');

window.Vue = require('vue');
import Form from './utilities/Form';
window.Form = Form;

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './route'

new Vue({
    el: '#app',
    router: router
});
