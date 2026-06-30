import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/LandingPage.vue')
  },
  // --- Public Routes (AuthLayout) ---
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/auth/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/auth/Register.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/pages/auth/ForgotPassword.vue')
      }
    ]
  },
  // Redirection pour maintain compatibility avec /login etc.
  { path: '/login', redirect: '/auth/login' },
  { path: '/register', redirect: '/auth/register' },
  { path: '/forgot-password', redirect: '/auth/forgot-password' },

  // --- Private Routes (MainLayout) ---
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/Dashboard.vue')
      },
      {
        path: 'documents',
        name: 'Documents',
        component: () => import('@/pages/documents/DocList.vue')
      },
      {
        path: 'documents/:id',
        name: 'DocumentDetail',
        component: () => import('@/pages/documents/DocDetail.vue'),
        props: true
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/pages/documents/DocUpload.vue')
      },
      {
        path: 'trash',
        name: 'Trash',
        component: () => import('@/pages/documents/DocTrash.vue')
      },
      {
        path: 'ai/chat/:id',
        name: 'AIChat',
        component: () => import('@/pages/ai/AIChat.vue'),
        props: true
      },
      {
        path: 'ai/explore',
        name: 'AIExplore',
        component: () => import('@/pages/ai/AIExplorer.vue')
      },
      {
        path: 'admin',
        meta: { requiresAdmin: true },
        children: [
          {
            path: 'audit',
            name: 'AdminAudit',
            component: () => import('@/pages/admin/AuditLogs.vue')
          },
          {
            path: 'users',
            name: 'AdminUsers',
            component: () => import('@/pages/admin/UserManagement.vue')
          },
          {
            path: 'settings',
            name: 'AdminSettings',
            component: () => import('@/pages/admin/SystemSettings.vue')
          },
          {
            path: 'monitoring',
            name: 'AdminMonitoring',
            component: () => import('@/pages/admin/Monitoring.vue')
          }
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/profile/Profile.vue')
      },
      {
        path: 'unauthorized',
        name: 'Unauthorized',
        component: () => import('@/pages/errors/Unauthorized.vue')
      }
    ]
  },
  // Fallback
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/errors/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.fetchUser();
  }

  // 1. Check Authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }

  // 2. Check Admin Role
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!authStore.isAdmin) {
      return next({ name: 'Unauthorized' });
    }
  }

  next();
});

export default router;
