/**
 * 能耗相关路由
 * **/
import Blank from "@/layout/Blank/index";

import RabbishTypeList from '@/pages/rubbish/TypeList';
import RabbishList from '@/pages/rubbish/List';

export default [
  {
    path: '/rabbish/typeList',
    name: 'RabbishTypeList',
    layout: Blank,
    component: RabbishTypeList,
    meta: {
      title: '垃圾类型管理',
    }
  },
  {
    path: '/rabbish/list',
    name: 'RabbishList',
    layout: Blank,
    component: RabbishList,
    meta: {
      title: '垃圾管理',
    }
  },

]
