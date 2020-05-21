const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  old_avatar: state => state.user.old_avatar,
  name: state => state.user.name,
  persion: state => state.user.persion,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
