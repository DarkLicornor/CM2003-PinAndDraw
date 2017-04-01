import request from 'axios'

request.defaults.baseURL = 'http://jsonplaceholder.typicode.com/'

export const getTopics = ({ commit, state }) => {
  return request.get('posts').then((response) => {
    if (response.statusText === 'OK') {
      commit('TOPICS_LIST', response.data)
    }
  }).catch((error) => {
    console.log(error)
  })
}

export const increment = ({ commit }) => commit('INCREMENT')
export const decrement = ({ commit }) => commit('DECREMENT')

export const setFirebaseDB = ({ commit }, ref) => commit('SETFIREBASEDB', ref)
export const setFirebaseAuth = ({ commit }, ref) => commit('SETFIREBASEAUTH', ref)
export const setAuthCurrentUser = ({ commit }, user) => commit('SETAUTHCURRENTUSER', user)
export const setDBCurrentUser = ({ commit }, user) => commit('SETDBCURRENTUSER', user)

export const storeToken = ({ commit }, tokenData) => commit('STORETOKEN', api, token)


export const addPin = ({ commit }, pin) => commit('ADDPIN', pin)
export const setAddPopupOpen = ({ commit }, isOpen) => commit('SETADDPOPUPOPEN', isOpen)
