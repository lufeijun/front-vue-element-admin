<template>
  <div>
    <el-row>
      <el-col :span="4" class="right">邮箱：</el-col>
      <el-col :span="16" class="line-height">
        {{ persion.email }}
      </el-col>
      <el-col :span="24" class="clear" />
      <el-col :span="4" class="right">名称：</el-col>
      <el-col :span="16" class="line-height">
        {{ persion.name }}
      </el-col>
      <el-col :span="24" class="clear" />
      <el-col :span="4" class="right">角色：</el-col>
      <el-col :span="16" class="line-height">
        {{ persion.roles.join(',') }}
      </el-col>
      <el-col :span="24" class="clear" />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Persion',
  computed: {
    ...mapGetters([
      'persion'
    ])
  }
}
</script>

<style scoped>
.right {
  text-align: right;
  line-height: 40px;
  padding-right: 15px;
  font-weight: bold;
}
.line-height {
  line-height: 40px;
}
.clear {
  clear: both;
  height: 15px;
}
</style>
