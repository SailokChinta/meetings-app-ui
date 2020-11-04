import Vue from 'vue';
import Router from 'vue-router';

import { isAdmin, isAuthenticated } from '../services/auth';

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
            children: [
                {
                    name: 'admin-users',
                    path: 'users',
                    component: () => import( '@/components/Admin/Users' ),
                },
                {
                    name: 'admin-meetings',
                    path: 'meetings',
                    component: () => import( '@/components/Admin/Meetings' ),
                },
                {
                    name: 'admin-teams',
                    path: 'teams',
                    component: () => import( '@/components/Admin/Teams' ),
                },
                {
                    name: 'admin-uploads',
                    path: 'uploads',
                    component: () => import( '@/components/Admin/Uploads' ),
                }
            ],
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
    if ( to.name === 'login-page' || to.name === 'register' ) {
        next();
    } else if( isAuthenticated() ) {
        if( isAdmin() ) {
            if( to.name === 'admin' || to.name === 'admin-users' || to.name === 'admin-meetings' || to.name === 'admin-teams' || to.name === 'admin-uploads' ) {
                next();
            } else {
                next( '/admin' );
            }
        }  else {
            if( to.name === 'admin' || to.name === 'admin-users' || to.name === 'admin-meetings' || to.name === 'admin-teams' || to.name === 'admin-uploads' ) {
                next( '/home' );
            } else {
                next();
            }        }
    } else {
        next('/');
    }
})

export default router;