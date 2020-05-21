<template>

  <div class="template-container">
    <el-row>
      <el-col :span="12">
        <h4>菜单权限:</h4>
        <el-tree
          ref="menu"
          :data="menuList"
          show-checkbox
          node-key="key"
          :default-checked-keys="checked.menu"
          default-expand-all
        />
      </el-col>
      <el-col :span="12">
        <h4>功能权限</h4>
        <el-tree
          ref="action"
          :data="actionList"
          show-checkbox
          node-key="key"
          :default-checked-keys="checked.action"
          default-expand-all
        />
      </el-col>
    </el-row>

    <el-row>
      <el-row :span="24" style="margin: 30px auto;">
        <el-button type="primary" style="width: 100%;" @click="add">主要按钮</el-button>
      </el-row>
    </el-row>

  </div>
</template>

<script>
import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  name: 'Permission',
  data() {
    return {
      menuList: [],
      actionList: [],
      checked: {
        action: [],
        menu: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      request({
        url: '/auth/role/permission/get',
        method: 'post',
        data: {
          id: this.$route.params.id
        }
      }).then(response => {
        if (response.code === 0) {
          this.menuList = response.data.menu
          this.actionList = response.data.action
          this.checked = response.data.checked
        } else {
          Message.warning(response.msg)
        }
      })
    },
    add: function() {
      const data = {
        id: this.$route.params.id,
        action: this.$refs.action.getCheckedKeys(),
        menu: this.$refs.menu.getCheckedKeys(),
        menu_half: this.$refs.menu.getHalfCheckedKeys()
      }

      request({
        url: '/auth/role/permission/update',
        method: 'post',
        data: data
      }).then(response => {
        if (response.code === 0) {
          this.$router.push({ path: '/permission/role' })
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
