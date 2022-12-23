import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import { authGuard, loginGuard, tokenExpGuard } from './guards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'defaultLayout',
    component: (): Promise<Component> =>
      import('../pages/layouts/DefaultLayout.vue'),
    beforeEnter: [tokenExpGuard, authGuard],
    children: [
      {
        path: '/',
        name: 'main',
        component: (): Promise<Component> => import('../pages/MainPage.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: (): Promise<Component> => import('../pages/AboutPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'loginLayout',
    component: (): Promise<Component> =>
      import('../pages/layouts/LoginLayout.vue'),
    beforeEnter: [loginGuard],
    children: [
      {
        path: '/login',
        name: 'login',
        component: (): Promise<Component> => import('../pages/LoginPage.vue'),
      },
      {
        path: '/login/callback',
        name: 'loginCallback',
        component: (): Promise<Component> =>
          import('../pages/LoginCallback.vue'),
      },
    ],
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  strict: true,
  history: routerHistory,
  routes,
});
