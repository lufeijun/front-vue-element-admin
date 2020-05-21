import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param ability
 * @param route
 */
function hasPermission(ability, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
  if (route.meta && route.meta.ability) {
    return ability.menu.indexOf(route.meta.ability + ',') !== -1
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, ability) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(ability, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, ability)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, ability) {
    return new Promise(resolve => {
      let accessedRoutes
      // eslint-disable-next-line prefer-const
      accessedRoutes = filterAsyncRoutes(asyncRoutes, ability)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
