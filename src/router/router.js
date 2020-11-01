import Vue from 'vue';
import Router from 'vue-router';

import { isAuthenticated } from '../services/auth';

Vue.use( Router );

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login-page',
            path: '/',
            component: () => import( '@/components/Login/Login' ),
            alias: [ '/login' ]
        },
        {
            name: 'register',
            path: '/register',
            component: () => import( '@/components/Login/Register' )
        },
        {
            name: 'home',
            path: '/home',
            component: () => import( '@/components/Home/Home' ),
        },
        {
            name: 'admin',
            path: '/admin',
            component: () => import( '@/components/Admin/Admin' ),
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: () => import( '@/components/Calendar/Calendar' ),
        },
        {
            name: 'meetings',
            path: '/meetings',
            component: () => import( '@/components/Meetings/Meetings' ),
            children: [
                {
                    name: 'search-meeting',
                    path: '',
                    component: () => import( '@/components/Meetings/FilterMeetings' ),
                },
                {
                    name: 'add-meeting',
                    path: 'add',
                    component: () => import( '@/components/Meetings/AddMeeting' ),
                }
            ],
        },
        {
            name: 'teams',
            path: '/teams',
            component: () => import( '@/components/Teams/Teams' ),
        }
    ]
});

router.beforeEach(( to, from, next ) => {
    if( ( from !== '/' || from !== '/login' ) && isAuthenticated() ) {
        next();
    } else {
        next('/');
    }
})

export default router;