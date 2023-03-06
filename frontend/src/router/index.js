import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  {
    path: '/services', // added path for the services page
    name: 'services',
    component: () => import('../components/services.vue') // component path
  },
  {
    path: '/serviceForm', // added path for the add services page
    name: 'serviceform',
    component: () => import('../components/serviceForm.vue') // component path
  },
  {
    path: '/serviceDetails', // added path for the service details page
    name: 'serviceDetails',
    component: () => import('../components/serviceDetails.vue') // component path
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
