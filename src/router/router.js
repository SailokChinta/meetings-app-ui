import Vue from 'vue';
import Router from 'vue-router';

Vue.use( Router );

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'login-page',
            path: '/',
            component: () => import( '@/components/Login/Login' ),
            alias: [ '/login' ]
        },
        {
            name: 'home',
            path: '/home',
            component: () => import( '@/components/Home/Home' ),
            beforeEnter: (to, from, next) => {
                if( localStorage.token ) {
                    next();
                } else {
                    next( false );
                }
            }
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: () => import( '@/components/Calendar/Calendar' ),
            beforeEnter: (to, from, next) => {
                if( localStorage.token ) {
                    next();
                } else {
                    next('/');
                }
            }
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
                    beforeEnter: (to, from, next) => {
                        if( localStorage.token ) {
                            next();
                        } else {
                            next('/');
                        }
                    }
                },
                {
                    name: 'add-meeting',
                    path: 'add',
                    component: () => import( '@/components/Meetings/AddMeeting' ),
                    beforeEnter: (to, from, next) => {
                        if( localStorage.token ) {
                            next();
                        } else {
                            next('/');
                        }
                    }
                }
            ],
            beforeEnter: (to, from, next) => {
                if( localStorage.token ) {
                    next();
                } else {
                    next('/');
                }
            }
        },
        {
            name: 'teams',
            path: '/teams',
            component: () => import( '@/components/Teams/Teams' ),
            beforeEnter: (to, from, next) => {
                if( localStorage.token ) {
                    next();
                } else {
                    next('/');
                }
            }
        }
    ]
});