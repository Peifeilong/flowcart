<template>
    <div class="components-container">
      <aside>
        <strong>流程编辑</strong>
        <strong>软件安装</strong>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">新建任务</el-button>
        <el-button type="primary">返回</el-button>
      </aside>
      <split-pane split="vertical" @resize="resize">
        <template slot="paneL">
          <!-- 流程图区域 -->
          <div class="left-container">
            <FlowPanel></FlowPanel>
          </div>
        </template>
        <template slot="paneR">
          <split-pane split="horizontal">
            <template slot="paneL">
              <div class="top-container" />
            </template>
            <template slot="paneR">
              <div class="bottom-container">
                <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
                  <el-table-column align="center" label="名称" width="150">
                      <template slot-scope="scope">
                          {{ scope.row.flowName }}
                      </template>
                  </el-table-column>
                  <el-table-column align="header-center" label="key">
                      <template slot-scope="scope">
                          {{ scope.row.fenlei }}
                      </template>
                  </el-table-column>
                  <el-table-column align="header-center" label="属性">
                      <template slot-scope="scope">
                          {{ scope.row.endTime }}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="输出">
                      <template slot-scope="scope">
                          <el-button type="primary" size="small" @click="">选择</el-button>
                      </template>
                  </el-table-column>
              </el-table>
              </div>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </div>
  </template>
  
  <script>
  import splitPane from 'vue-splitpane'
  // 引进流程图组件
  import FlowPanel from '@/components/panel'
  export default {
    name: 'SplitpaneDemo',
    components: { splitPane,FlowPanel},
    data(){
      return {
        rolesList:[],
      }
    },
    created() {
      var data = [{
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }, {
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }, {
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }, {
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }, {
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }, {
                "id": "1",
                "flowName": "test1",
                "fenlei": "abc",
                "endTime": "2020-4-1",
                "newentime": "2020-3-1",
                "author": "pfl"
            }]
            this.rolesList = data
    },
    methods: {
      resize() {
        console.log('resize')
      }
    }
  }
  </script>
  
  <style  scoped>
    .components-container {
      position: relative;
      height: 100vh;
    }
  
    .left-container {
      background-color: #ccc;
      height: 100%;
    }
  
    .right-container {
      background-color: #FCE38A;
      height: 200px;
    }
  
    .top-container {
      background-color: #FCE38A;
      width: 100%;
      height: 100%;
    }
  
    .bottom-container {
      width: 100%;
      background-color: #95E1D3;
      height: 100%;
    }
  </style>
  