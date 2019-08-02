<template>
  <div class="">
    您好，登录成功！
    <ul class="nav-ul-dep1">
      <li class="nav-li-dep1" v-for="item in pageRouterShow">
        {{ item[0].parentNodeName }}
        <ul class="nav-ul-dep2">
          <li class="nav-li-dep2" v-for="router in item">
            <router-link :to="router.path">
              {{ router.meta.title }}
            </router-link>
          </li>
        </ul>


      </li>
    </ul>
  </div>
</template>
<script>
  import { pageRouter } from '@/routerConfig'
  export default {
    data () {
      return {
        pageRouter:pageRouter,
      }
    },
    computed:{
      pageRouterShow(){

        let parentNodes = [];
        let res = [];
        if( this.pageRouter.length==0){
          return [];
        }
        this.pageRouter.map(item=>{
          let parentNodesIndex = parentNodes.indexOf(item.parentNode)
          if(parentNodesIndex==-1){
            parentNodes.push(item.parentNode);
            res[res.length] = [
              item
            ]
          }else{
            console.log(parentNodesIndex);
            res[parentNodesIndex].push(item);
          }
        })
        return res;
      },
    },
    mounted(){

    }
  }
</script>