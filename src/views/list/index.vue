<template>
    <div class="app-container">
        <el-button type="primary" @click="">新建</el-button>
        <el-button type="primary" @click="">导出</el-button>
        <el-button type="primary" @click="">导入</el-button>

        <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="ID" width="50">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="流程名称" width="200">
                <template slot-scope="scope">
                    {{ scope.row.flowName }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="分类">
                <template slot-scope="scope">
                    {{ scope.row.fenlei }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="更新时间">
                <template slot-scope="scope">
                    {{ scope.row.endTime }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="子流程更新">
                <template slot-scope="scope">
                    {{ scope.row.newentime }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="创建人">
                <template slot-scope="scope">
                    {{ scope.row.author }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="">编辑</el-button>
                    <el-button type="danger" size="small" @click="">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import path from 'path'
    import Request from '@/utils/request'
    export default {
        data() {
            return {
                rolesList:[],
            }
        },
        computed: {
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
            this.getList()
        },
        methods: {
            getList() {
                console.log('222');
                let data = {

                }
                let url = 'vue-admin-template/table/list'
                let method = 'get'
                Request(url,method,data).then(res=>{
                    console.log(res.code)
                    if(res.code == '000'){
                        // this.rolesList = res.data.entity
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }

        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>