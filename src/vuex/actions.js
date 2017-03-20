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


export const dragPin = ({ commit, pinId, coordinates }) => commit('DRAGPIN', pinId, coordinates)
export const setFirebaseRefUsers = ({ commit, ref }) => commit('SETFIREBASEREFUSERS', ref)
export const setFirebaseApp = ({ commit, ref }) => commit('SETFIREBASEAPP', ref)
