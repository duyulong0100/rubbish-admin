/* eslint-disable */
// 工具
import UtilIce from '@/libs/util-ice.js'; // 页面和布局
import Blank from './layout/Blank';

// 变量名 routerConfig 为 iceworks 检测关键字
import Index from './pages/Index';
import Login from './pages/Login';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';

//垃圾分类
import rubbish from './router/routerConfigs/rubbish/rubbish';

const routerConfig = [
  {
    path: '/',
    name: 'index',
    layout: Blank,
    component: Index,
  },
];

// 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig
const routerConfigMenuOut = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: Error401,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '*',
    component: Error404,
  },
];

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export const pageRouter = [
  ...rubbish
]

export default UtilIce.recursiveRouterConfig([
  ...pageRouter,
  ...routerConfigMenuOut,
  ...routerConfig
]);


// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用
export const frameInRoutes = UtilIce.recursiveRouterConfig(routerConfig).map(
  e => {
    const route = e.children ? e.children[0] : e;
    return {
      path: e.path,
      name: route.name,
      meta: route.meta,
    };
  }
);
