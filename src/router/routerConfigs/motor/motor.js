/**
 * 能耗相关路由
 * **/
import layout from "@/layout/HeaderAside/index";

import MotorList from '@/pages/motor/List';
import pageRouters from "../rubbish/rubbish";

const parentNode = 'motor'
const parentNodeName = '马达管理'

export default [
  {
    path: '/motor/list',
    name: 'motorList',
    layout,
    component: MotorList,
    meta: {
      title: '马达列表',
    }
  },
].map(item=>{
  return {
    parentNode,
    parentNodeName,
    ...item,
  }
});