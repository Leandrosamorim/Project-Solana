import Vue from 'vue';
import VueRouter from 'vue-router';
 
export default new VueRouter({
    mode :'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: DailyStats
        },{
            path: '/coin/:symbol',
            name: 'coin',
            component: CoinStats
        },
    ]
});