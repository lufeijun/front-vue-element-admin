<template>
  <el-row>
    <el-col :span="4" class="right">邮箱：</el-col>
    <el-col :span="16">
      <span v-if="isEdit" style="line-height: 40px;">
        {{ obj.email }}
      </span>
      <span v-else>
        <el-input v-model="obj.email" placeholder="邮箱" />
      </span>
    </el-col>
    <el-col :span="24" class="clear" />
    <el-col :span="4" class="right">用户名称：</el-col>
    <el-col :span="16">
      <el-input v-model="obj.name" placeholder="用户姓名" />
    </el-col>
    <el-col :span="24" class="clear" />
    <el-col :span="4" class="right">密码：</el-col>
    <el-col :span="16">
      <el-input v-model="obj.pwd" placeholder="用户密码，空表示不修改密码，默认密码：123456" />
    </el-col>
    <el-col :span="24" class="clear" />
    <el-col :span="4" class="right">状态：</el-col>
    <el-col :span="16">
      <el-select v-model="obj.enable" placeholder="请选择">
        <el-option
          v-for="enable in ['在职','离职']"
          :key="enable"
          :value="enable"
        />
      </el-select>
    </el-col>
    <el-col :span="24" class="clear" />
    <el-col :span="4" class="right">角色：</el-col>
    <el-col :span="16">
      <el-checkbox-group v-model="obj.roles" style="line-height: 40px;">
        <el-checkbox
          v-for="role in roles"
          :key="role.id"
          :label="role.name"
        />
      </el-checkbox-group>
    </el-col>
    <el-col :span="24" class="clear" />

  </el-row>
</template>

<script>
export default {
  name: 'Add',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    obj: Object,
    // eslint-disable-next-line vue/require-default-prop
    roles: Object,
    // eslint-disable-next-line vue/require-default-prop
    isEdit: Number
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
.clear {
  clear: both;
  height: 15px;
}
</style>
