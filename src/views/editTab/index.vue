<template>
  <div class="app-container">
    <el-button type="primary" style="" @click="addTab">添加一级菜单</el-button>
    <el-button type="primary" style="" @click="addModel">添加二级菜单</el-button>
    <el-card class="add-card add-tab" v-if="showAddTab">
      <div slot="header" class="clearfix">
        <span>{{isEditingtab===true?'edit tab':'add tab'}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeAddCard">close</el-button>
      </div>
      <div class="input-container">
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px">
          <el-col :span="8">
            <span>edit tab name：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabName" placeholder="input tab name here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px">
          <el-col :span="8">
            <span>edit tab url：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabUrl" placeholder="input tab url here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px">
          <el-col :span="8">
            <span>edit explain：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabExplain" placeholder="input tab explain here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px;margin-top:60px">
          <el-button type="primary" style="margin-left:140px;" @click="submitAddTab">submit</el-button>
        </el-row>
      </div>
    </el-card>
    <el-card class="add-card add-model" v-if="showAddModel">
      <div slot="header" class="clearfix">
        <span>add model</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeAddCard">close</el-button>
      </div>
      <div class="input-container">
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px">
          <el-col :span="8">
            <span style="">select model：</span>
          </el-col>
          <el-col :span="5" style="z-index:11111111">
            <el-row style="white-space:nowrap">
              <el-dropdown trigger="click" @command="selectModel">
              <span class="el-dropdown-link">
                {{selectedModelName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="index" v-for="(item,index) in editorTabList" :key="index">{{item}}
                </el-dropdown-item>
                <el-dropdown-item style="font-size:22px;text-align:center;color:#1890ff;">
                  <i class="el-icon-circle-plus-outline" @click="addModelName"></i>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px" v-show="isAddingModel">
          <el-col :span="8">
            <span>add model：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="addingModelName" placeholder="input model name here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px;color:#1890ff;text-align:center;font-size:32px"  v-show="isAddingModel">
            <i class="el-icon-success" @click="submitAddModelName"></i>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px" v-show="!isAddingModel">
          <el-col :span="8">
            <span>edit tab name：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabName" placeholder="input tab name here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px" v-show="!isAddingModel">
          <el-col :span="8">
            <span>edit tab url：</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabUrl" placeholder="input tab url here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px" v-show="!isAddingModel">
          <el-col :span="8">
            <span>edit tab explain</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="editingTabExplain" placeholder="input tab url here"></el-input>
          </el-col>
        </el-row>
        <el-row width="100%" style="margin-top:20px;height:40px;line-height:40px;margin-top:20px" v-show="!isAddingModel">
          <el-button type="primary" style="margin-left:140px;" @click="submitAddModel">submit</el-button>
        </el-row>
      </div>
    </el-card>
    <el-table :data="tabData" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;margin-top:10px" v-show="activeName === 'first'">
      <el-table-column prop="name" label="tab name" width="180">
      </el-table-column>
      <el-table-column prop="url" label="tab url" width="180">
      </el-table-column>
      <el-table-column prop="explain" label="explain">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="editRow(scope.row)" type="text" size="small" :disabled="scope.row.children.length != 0 || scope.row.url === ''">编辑</el-button>
        <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EditTab',
  data() {
      return {
        isEditingtab : false,
        editingIndex : -1,
        editingTabName: '',
        editingTabUrl: '',
        editingTabExplain : '',
        addingModelName : '',
        isAddingModel : false,
        showAddTab: false,
        showAddModel: false,
        activeName: 'first',
        selectedModelName: 'select',
        editorTabList: [],
        tabData: []
      }
  },
  computed: {
    getTabData() {
        return this.$store.state.tabs.tabData
    }
},

  
  watch:{
    deep:true, //深度监听设置为 true
    getTabData:function(data){
        this.editorTabList.splice(0,this.editorTabList.length)
        this.tabData = data
        this.tabData.forEach((item,index)=>{
          if(item.children.length != 0){
            this.editorTabList.push(item.name)
          }
        })
    }
  },
  mounted() {
    
  },
  methods: {
    editRow(data) {
      console.log(data)
      if(typeof(data.parent) === 'undefined'){
        this.tabData.forEach((item,index)=>{
          if(data.name === item.name){
            this.editingIndex = index
          }
        })
      }else{
        this.tabData.forEach((item,index)=>{
          if(data.parent === item.name){
            for (let j = 0; j < item.children.length; j++) {
               if(data.name === item.children[j].name){
                this.editingIndex = ''+index+','+j
            }
            }
          }
        })
      }
      this.isEditingtab = true
      this.editingTabName = data.name
      this.editingTabUrl=data.url 
      this.editingTabExplain=data.explain
      this.showAddTab = true
    },
    deleteRow(data){
      console.log(data)
      if(typeof(data.parent) === 'undefined'){
        this.tabData.forEach((item,index)=>{
          if(data.name === item.name){
            this.editingIndex = index
          }
        })
      }else{
        this.tabData.forEach((item,index)=>{
          if(data.parent === item.name){
            for (let j = 0; j < item.children.length; j++) {
               if(data.name === item.children[j].name){
                this.editingIndex = ''+index+','+j
            }
            }
          }
        })
      }
      this.$store.dispatch('tabs/commitTabData',this.editingIndex)
    },
    addTab(){
        this.showAddModel = false
        this.showAddTab = true
    },
    addModel(){
        this.showAddTab = false
        this.showAddModel = true
        
    },
    selectModel(command){
        let index = parseInt(command)
        this.selectedModelName = this.editorTabList[index]
    },
    addModelName(){
      this.isAddingModel = true
    },
    closeAddCard(){
        this.showAddTab = false
        this.showAddModel = false
    },
    submitAddTab(){
      if(this.isEditingtab === false){
        for(let i=0;i<this.tabData.length;i++){
        console.log(this.addingModelName === this.tabData[i].name)
        if(this.editingTabName === this.tabData[i].name){
          this.$message({
          message: 'the tab is excited!',
          type: 'error'
        });
        return
      }}
        let data = {
            id:  (new Date()).valueOf(),
            name: this.editingTabName,
            url: this.editingTabUrl,  
            explain: this.editingTabExplain,
            children:[]
        }
        this.$store.dispatch('tabs/commitTabData',data);
        this.showAddTab = false
        this.showAddModel = false
        this.editingTabName = ''
        this.editingTabUrl=''  
        this.editingTabExplain=''
      }else{
        this.$store.dispatch('tabs/commitTabData',this.editingIndex)
         let data = {
            id:  (new Date()).valueOf(),
            name: this.editingTabName,
            url: this.editingTabUrl,  
            explain: this.editingTabExplain,
            children:[]
        }
        this.$store.dispatch('tabs/commitTabData',data)
        this.isEditingtab =false
         this.showAddTab = false
        this.showAddModel = false
        this.editingTabName = ''
        this.editingTabUrl=''  
        this.editingTabExplain=''
      }
    },
    submitAddModel(){
      if(this.selectedModelName === 'select' || this.selectedModelName === '' ||typeof(this.selectedModelName)==='undefined' ){
        this.$message({
          message: 'must select model name!',
          type: 'error'
        });
        return
      }
      let data = {
            id:  (new Date()).valueOf(),
            name: this.selectedModelName,
            url: '',  
            explain: '',
            children : [{
              parent : this.selectedModelName,
              id:  (new Date()).valueOf()+1,
              name: this.editingTabName,
              url: this.editingTabUrl,  
              explain: this.editingTabExplain,
              children : []
            }]
        }
        this.$store.dispatch('tabs/commitTabData',data);
        this.showAddTab = false
        this.showAddModel = false
         this.editingTabName = ''
        this.editingTabUrl=''  
        this.editingTabExplain=''
        this.selectedModelName = 'select'
    },
    submitAddModelName(){
      for(let i=0;i<this.tabData.length;i++){
        console.log(this.addingModelName === this.tabData[i].name)
        if(this.addingModelName === this.tabData[i].name){
          this.$message({
          message: 'the tab is excited!',
          type: 'error'
        });
        return
      }
      }
      this.editorTabList.push(this.addingModelName)
      this.isAddingModel = false
    }
  }
}
</script>
<style scoped>
    .add-card{
        width:400px;
        height:400px;
        margin:0 auto;
        position: absolute;
        z-index: 111;
        top: 15%;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .add-card .clearfix span{
        margin-left: 140px;
    }
    .el-icon-circle-plus-outline:hover{
        cursor: pointer;
    }
</style>