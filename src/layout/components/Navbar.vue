<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" style="top: 14px;" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="showMsg">
            <span style="display:block;">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="changePwd">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="avatarChange">
            <span style="display:block;">更新头像</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--  个人信息-->
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisiblePersion"
      width="30%"
    >
      <Person />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePersion = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblePersion = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 更新头像   -->
    <el-dialog
      title="更新头像"
      :visible.sync="dialogVisibleAvatar"
      width="30%"
    >
      <Avatar />
      <span slot="footer" class="dialog-footer">
        <el-button @click="avatarCancel">取 消</el-button>
        <el-button type="primary" @click="avatarSure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码   -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisiblePwd"
      width="30%"
    >
      <el-row>
        <el-col :span="4" class="right">旧密码：</el-col>
        <el-col :span="16" class="line-height">
          <el-input v-model="pwd.old" placeholder="" show-password />
        </el-col>
        <el-col :span="24" class="clear" />
        <el-col :span="4" class="right">新密码：</el-col>
        <el-col :span="16" class="line-height">
          <el-input v-model="pwd.new" placeholder="" show-password />
        </el-col>
        <el-col :span="24" class="clear" />
        <el-col :span="4" class="right">重复新密码：</el-col>
        <el-col :span="16" class="line-height">
          <el-input v-model="pwd.confirm" placeholder="" show-password />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePwd=false">取 消</el-button>
        <el-button type="primary" @click="pwdSure">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import request from '@/utils/request'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Person from './Persion'
import Avatar from './Avatar'
import { Message } from 'element-ui'

export default {
  components: {
    Breadcrumb,
    Person,
    Avatar,
    Hamburger
  },
  data() {
    return {
      dialogVisiblePersion: false,
      dialogVisiblePwd: false,
      dialogVisibleAvatar: false,
      pwd: {
        old: '',
        new: '',
        confirm: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'old_avatar',
      'avatar'
    ])
  },
  methods: {
    ...mapMutations({
      SET_OLD_AVATAR: 'user/SET_OLD_AVATAR'
    }),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    showMsg() {
      this.dialogVisiblePersion = true
    },
    avatarChange() {
      this.dialogVisibleAvatar = true
    },
    async logout() {
      this.$confirm('确认退出系统', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
      })
    },
    avatarCancel() {
      // eslint-disable-next-line no-undef
      if (this.old_avatar) {
        this.$store.dispatch('user/setAvatar', this.old_avatar).then(() => {
          this.SET_OLD_AVATAR()
          this.dialogVisibleAvatar = false
        }).catch(() => {

        })
      } else {
        this.dialogVisibleAvatar = false
      }
    },
    avatarSure() {
      request({
        url: '/auth/user/avatar',
        method: 'post',
        data: { avatar: this.avatar }
      }).then(response => {
        if (response.code === 0) {
          this.dialogVisibleAvatar = false
        } else {
          Message.warning(response.msg)
        }
      })
    },
    changePwd() {
      this.dialogVisiblePwd = true
    },
    pwdSure() {
      if (this.pwd.old === '') {
        Message.warning('请输入旧密码')
        return
      }
      if (this.pwd.new === '') {
        Message.warning('请输入新密码')
        return
      }
      if (this.pwd.confirm === '') {
        Message.warning('请再次输入新密码')
        return
      }
      if (this.pwd.new !== this.pwd.confirm) {
        Message.warning('两次输入密码不一致')
        return
      }

      request({
        url: '/auth/user/pwd/change',
        method: 'post',
        data: { pwd: this.pwd }
      }).then(response => {
        if (response.code === 0) {
          Message.success('修改成功')
          this.dialogVisiblePwd = false
        } else {
          Message.warning(response.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.right {
  text-align: right;
  line-height: 40px;
  padding-right: 15px;
  font-weight: bold;
}
.clear {
  clear: both;
  height: 15px;
}

</style>
