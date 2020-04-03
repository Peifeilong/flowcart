<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <el-menu
      :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuText"
        mode="vertical" >
      <el-submenu :index="index+''"  v-for="(item,index) in modelDataList" :key="index">
        <template slot="title">
          <i class="el-icon-menu" style="transform:translatex(-4px)"></i>
          <span >{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="(itemVal,itemIndex) in item.children" :key="itemIndex">
          <template slot="title"></template>
          <el-menu-item :index="itemIndex+''" @click="navagiteToLink(itemVal.url)">{{itemVal.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="index+''" v-for="(item,index) in tabDataList" :key="index" @click="navagiteToLink(item.url)">
        <i class="el-icon-menu" style="transform:translatex(-4px)"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  data() {
    return {
      tabDataList: [],
      modelDataList : []
    }
  },
  components: { SidebarItem, Logo },  

  
  watch:{
    deep:true, 
    getTabData:function(data){
        this.tabDataList.splice(0,this.tabDataList.length)
        this.modelDataList.splice(0,this.modelDataList.length)
        let temData = data
        temData.forEach((item,index)=>{
          if (item.children){
            this.modelDataList.push(item)
          }else{
            this.tabDataList.push(item)
          }
        })
    }
  },
  computed: {
    getTabData() {
      console.log(this.$store.state.tabs.tabData)
        return this.$store.state.tabs.tabData
    },
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    navagiteToLink(url){
      window.open(url)
    }
  },

}
</script>
<style>
.el-submenu__title{}
</style>
