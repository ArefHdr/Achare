import {createWebHistory, createRouter} from 'vue-router';
import AddressRegistration from "@/pages/AddressRegistration.vue";
import AddressList from "@/pages/AddressList.vue";
import Map from "@/components/map/Map.vue";
import {ref} from "vue";
export const isAuthenticated = ref(false);  //به صفحه map قبل از پر کردن اطلاعات در صفحه فرم اجازه ورود نمیده

const routes = [
    {name: 'home', path: '/', component: AddressRegistration}, //صفحه پیشفرض
    {name: 'addressRegistration', path: '/address-registration', component: AddressRegistration},
    {name: 'addressRegistrationMap', path: '/address-registration/map', component: Map, meta: {requiresAuth: true}},
    {name: 'addressList', path: '/address-list', component: AddressList},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() { //با تغییر صفحه اسکرول به ابتدای صفحه میرود
        return {top: 0}
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated.value) { //به صفحه map قبل از پر کردن اطلاعات در صفحه فرم اجازه ورود نمیده
        next('/address-registration');
    } else {
        next();
    }
})
export default router