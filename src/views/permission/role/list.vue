<template>

  <div class="template-container">

    <el-row style="margin-bottom: 10px; text-align: right;">
      <el-col :span="24">
        <el-button type="primary" @click="add()">新增角色</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table
          :data="list"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            style="width: 20%"
          />
          <el-table-column
            prop="name"
            label="姓名"
            style="width: 20%"
          />
          <el-table-column
            fixed="right"
            label="操作"
            style="width: 20%"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="permission(scope.row)">权限</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog
      title="角色名称"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-input v-model="role.name" placeholder="请输入角色名称" />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEdit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  name: 'RoleList',
  data() {
    return {
      list: [],
      dialogVisible: false,
      role: {
        id: 0,
        name: ''
      }
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    getRoles: function() {
      request({
        url: '/auth/role/list',
        method: 'post'
      }).then(response => {
        if (response.code === 0) {
          this.list = response.data
        } else {
          Message.warning(response.msg)
        }
      })
    },
    edit: function(obj) {
      this.role.id = obj.id
      this.role.name = obj.name
      this.dialogVisible = true
    },
    add: function() {
      this.role.id = 0
      this.role.name = ''
      this.dialogVisible = true
    },
    addOrEdit: function() {
      const data = {
        id: this.role.id,
        name: this.role.name
      }
      request({
        url: '/auth/role/update',
        method: 'post',
        data: data
      }).then(response => {
        if (response.code === 0) {
          this.getRoles()
          this.dialogVisible = false
        } else {
          Message.warning(response.msg)
        }
      })
    },
    permission: function(obj) {
      this.$router.push({ path: '/permission/permission/' + obj.id })
    }
  }
}
</script>

<style scoped>

</style>
