<template>
  <div class="avatar">
    <el-upload
      class="avatar-uploader"
      name="image"
      :action="api"
      :headers="{token:token}"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="avatar" :src="avatar" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <h4>点击上传图片</h4>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'Avatar',
  data() {
    return {
      api: process.env.VUE_APP_BASE_API + 'upload/image'
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'token'
    ])
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code) {
        Message.warning(res.msg)
        return
      }
      // this.avatar = res.data.url
      console.log(this.$store.getters.avatar)
      this.$store.dispatch('user/setAvatar', res.data.url).then(() => {

      }).catch(() => {

      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
h4 {
  position: absolute;
  font-size: 80px;
  color: #efefef;
  top: 15px;
  left: 99px;
  z-index: 1;
}
img {
  z-index: 300;
  position: relative;
}
.avatar {
  background-color: #cccccc;
}
.avatar-uploader {
  z-index: 1000;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
