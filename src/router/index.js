import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AppsView from '../views/AppsView.vue'
import TodoAppView from '../views/apps/TodoAppView.vue'
import FinanceAppView from '../views/apps/FinanceAppView.vue'
import EcommerceAppView from '../views/apps/EcommerceAppView.vue'
import AIProjectsView from '../views/apps/AIProjectsView.vue'
import TimelineView from '../views/TimelineView.vue'
import TimerView from '../views/TimerView.vue'
import SecurityView from '../views/SecurityView.vue'
import APIPlaygroundView from '../views/APIPlaygroundView.vue'
import SecurityLabHomeView from '../views/security/SecurityLabHomeView.vue'
import SecurityLabDetailView from '../views/security/SecurityLabDetailView.vue'
import DocsHome from '../views/documentation/DocsHome.vue'
import DocsDetail from '../views/documentation/DocsDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView
        },
        {
            path: '/apps',
            name: 'apps',
            component: AppsView
        },
        {
            path: '/apps/todo',
            name: 'apps-todo',
            component: TodoAppView
        },
        {
            path: '/apps/finance',
            name: 'apps-finance',
            component: FinanceAppView
        },
        {
            path: '/apps/ecommerce',
            name: 'apps-ecommerce',
            component: EcommerceAppView
        },
        {
            path: '/apps/ai-projects',
            name: 'apps-ai-projects',
            component: AIProjectsView
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: TimelineView
        },
        {
            path: '/apps/timer',
            name: 'apps-timer',
            component: TimerView
        },
        {
            path: '/apps/security',
            name: 'apps-security',
            component: SecurityView
        },
        {
            path: '/apps/api',
            name: 'apps-api',
            component: APIPlaygroundView
        },
        {
            path: '/security-lab',
            name: 'security-lab-home',
            component: SecurityLabHomeView
        },
        {
            path: '/security-lab/:slug',
            name: 'security-lab-detail',
            component: SecurityLabDetailView
        },
        {
            path: '/documentation',
            name: 'documentation-home',
            component: DocsHome
        },
        {
            path: '/documentation/:category/:doc?',
            name: 'documentation-detail',
            component: DocsDetail
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.path === '/' && to.hash && to.hash == '#landing-page') {
            return {
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'instant'
            }
        }
        if (to.path === '/' && to.hash) {
            return {
                el: to.hash,
                top: isScrollingUp(to.hash) ? getOffsetHeight() : 0,
                behavior: window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'instant'
            }
        }

        if (to.hash) {
            return {
                el: to.hash,
                top: 96,
                behavior: window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'instant'
            }
        }

        return { top: 0 }
    },
})

let isScrollingUp = (elem_id) => {
  const elem = document.querySelector(elem_id)
  if (!elem) {
    return false
  }

  const toScrollPos = elem.getBoundingClientRect().top

  return toScrollPos < 0
}

let getOffsetHeight = () => {
  const nav = document.querySelector('nav')
  const navHeight = nav.getBoundingClientRect().height + 25

  return navHeight
}

export default router
