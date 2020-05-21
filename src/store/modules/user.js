import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    old_avatar: '',
    introduction: '',
    roles: [],
    persion: {},
    ability: {
      action: [],
      menu: []
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.old_avatar = state.avatar
    state.avatar = avatar
  },
  SET_OLD_AVATAR: (state) => {
    state.old_avatar = ''
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ABILITY: (state, ability) => {
    state.ability.action = ability.action
    state.ability.menu = ability.menu
  },
  SET_PERSION: (state, obj) => {
    state.persion = obj
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { email, pwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), pwd: pwd }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, roles, ability } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        commit('SET_ABILITY', ability)
        commit('SET_PERSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 设置头像
  setAvatar({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

