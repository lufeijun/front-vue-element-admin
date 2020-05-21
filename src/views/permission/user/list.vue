<template>
  <div class="template-container">
    <el-row>
      <el-col :span="24" style="margin-bottom: 30px;">
        <el-col :span="6">
          角色：
          <el-select v-model="search.role_name" placeholder="请选择">
            <el-option
              value="全部"
            />
            <el-option
              v-for="role in roles"
              :key="role.id"
              :value="role.name"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          状态：
          <el-select v-model="search.enable" placeholder="请选择">
            <el-option
              v-for="enable in ['全部','在职','离职']"
              :key="enable"
              :value="enable"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          关键词：
          <el-input v-model="search.keyword" placeholder="邮箱、姓名" style="width: 65%;" />
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button icon="el-icon-search" type="primary" @click="searchList">搜 索</el-button>
          <el-button type="primary" @click="add">新 增</el-button>
        </el-col>

      </el-col>

      <el-col :span="24">
        <el-table
          :data="list"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            style="width: 10%"
          />
          <el-table-column
            prop="name"
            label="姓名"
            style="width: 10%"
          />
          <el-table-column
            prop="email"
            label="邮箱"
            style="width: 20%"
          />
          <el-table-column
            label="角色"
            style="width: 20%"
          >
            <template slot-scope="scope">
              {{ scope.row.roles.join(',') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="enable"
            label="状态"
            style="width: 10%"
          />
          <el-table-column
            fixed="right"
            label="操作"
            style="width: 10%"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="24" style="text-align: right; margin-top: 30px;">
        <el-pagination
          :current-page.sync="pages.current_page"
          :page-size="pages.per_page"
          layout="prev, pager, next, jumper"
          :total="pages.total"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>

    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <Add :obj="theObj" :roles="roles" :is_edit="is_edit" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Add from './add'
import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  name: 'List',
  components: { Add },
  data() {
    return {
      dialogVisible: false,
      is_edit: false,
      roles: [],
      list: [],
      pages: {
        total: 0,
        per_page: 0,
        current_page: 1,
        last_page: 1,
        all_page: 1
      },
      theObj: {
        id: 0,
        name: '',
        email: '',
        pwd: '',
        enable: '',
        roles: []
      },
      search: {
        page: 1,
        keyword: '',
        enable: '全部',
        role_name: '全部'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      this.search.page = this.pages.current_page
      request({
        url: '/auth/user/list',
        method: 'post',
        data: {
          search: this.search
        }
      }).then(response => {
        if (response.code === 0) {
          this.list = response.data.list
          this.pages = response.data.pages
          this.roles = response.data.roles
        } else {
          Message.warning(response.msg)
        }
      })
    },
    searchList: function() {
      this.init()
    },
    add: function() {
      this.dialogVisible = true
      this.is_edit = false
      this.theObj = {
        id: 0,
        name: '',
        pwd: '',
        email: '',
        enable: '',
        roles: []
      }
    },
    edit: function(obj) {
      this.dialogVisible = true
      this.is_edit = true
      this.theObj = JSON.parse(JSON.stringify(obj))
      this.theObj.pwd = ''
    },
    handleCurrentChange(page) {
      this.pages.current_page = page
      this.init()
    },
    addSubmit: function() {
      const data = {
        is_edit: this.is_edit,
        user: this.theObj
      }

      // 验证
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!regEmail.test(this.theObj.email)) {
        Message.warning('请输入正确的邮箱')
        return false
      }

      if (this.theObj.name === '') {
        Message.warning('用户名称不能为空')
        return false
      }

      if (this.theObj.enable === '') {
        Message.warning('请选择员工状态')
        return false
      }

      request({
        url: '/auth/user/update',
        method: 'post',
        data: data
      }).then(response => {
        if (response.code === 0) {
          this.dialogVisible = false
          this.init()
          Message.success('操作成功')
        } else {
          Message.warning(response.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
