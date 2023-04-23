import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomView from '../views/CustomTask.vue'
import TimeView from '../views/Time.vue'
import BreakView from '../views/BreakTime.vue'
import MusicView from '../views/MusicSlider.vue'
import SettingsView from '../views/Settings.vue'
import AdminView from '../views/Admin.vue'
import Navbar from '../components/AppHeader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        navbar: Navbar
      }
    },
    {
      path: '/custom',
      name: 'custom',
      components: {
        default: CustomView,
        navbar: Navbar
      }
    },
    {
      path: '/time',
      name: 'time',
      components: {
        default: TimeView,
        navbar: Navbar
      }
    },
    {
      path: '/breaktime',
      name: 'breaktime',
      components: {
        default: BreakView,
        navbar: Navbar
      }
    },
    {
      path: '/music-slider',
      name: 'musicSlider',
      components: {
        default: MusicView,
        navbar: Navbar
      }
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: SettingsView,
        navbar: Navbar
      }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        default: AdminView,
        navbar: Navbar
      }
    }
  ]
})

export default router
