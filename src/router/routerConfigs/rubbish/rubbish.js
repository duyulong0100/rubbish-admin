/**
 * 能耗相关路由
 * **/
import layout from "@/layout/HeaderAside";

import RabbishTypeList from '@/pages/rubbish/TypeList';
import RabbishList from '@/pages/rubbish/List';

const parentNode = 'rabbish'
const parentNodeName = '垃圾管理'

export default [
  {
    path: '/rabbish/typeList',
    name: 'RabbishTypeList',
    layout,
    component: RabbishTypeList,
    meta: {
      title: '垃圾类型',
    }
  },
  {
    path: '/rabbish/list',
    name: 'RabbishList',
    layout,
    component: RabbishList,
    meta: {
      title: '垃圾列表',
    }
  },
].map(item=>{
  return {
    parentNode,
    parentNodeName,
    ...item,
  }
});
