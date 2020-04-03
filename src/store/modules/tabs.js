const state = {

    tabData: []
}

const mutations = {

    SET_TABDATA: (state, tabData) => {
      if(typeof(tabData) === 'number'){
        state.tabData.splice(tabData,1)
      }else if(typeof(tabData) === 'string'){
        state.tabData[parseInt(tabData.split(',')[0])].children.splice(parseInt(tabData.split(',')[1]),1)
      }else{
        if( state.tabData.length === 0){
          state.tabData.push(tabData)
        }else{
          let temIndex = -1
          state.tabData.forEach((item,index)=>{
            if(item.name === tabData.name){
              temIndex = index
            }
          })
          if(temIndex === -1){
            state.tabData.push(tabData)
          }else{
            state.tabData[temIndex].children.push(...tabData.children)
          }
        }
      }
      
        
    }

}
const actions = {
    commitTabData({commit},tabData){
      commit("SET_TABDATA", tabData)
    }
  }



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
