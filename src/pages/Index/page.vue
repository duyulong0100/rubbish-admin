<template>
  <div class="">
    您好，登录成功！
    <ul>
      <li v-for="item in pageRouter">
        <router-link :to="item.path">
          {{ item.meta.title }}
        </router-link>

      </li>
    </ul>
  </div>
</template>
<script>
  import { pageRouter } from '@/routerConfig'
  console.log(pageRouter)
  export default {
    data () {
      return {
        pageRouter:pageRouter,
      }
    },
    mounted(){
      console.log(this.pageRouter)
    }
  }
</script>