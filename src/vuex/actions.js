import { firebaseAction } from 'vuexfire'

//Example from vuexfire
const setTodosRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('todos', ref)
  // you can unbind it easily too
  unbindFirebaseRef('todos')
})

export const setPinsRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('pins', ref)
})

export const setDBCurrentUserRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('DBCurrentUser', ref)
})

export const increment = ({ commit }) => commit('INCREMENT')
export const decrement = ({ commit }) => commit('DECREMENT')

export const setFirebaseDB = ({ commit }, ref) => commit('SETFIREBASEDB', ref)
export const setFirebaseAuth = ({ commit }, ref) => commit('SETFIREBASEAUTH', ref)
export const setAuthCurrentUser = ({ commit }, user) => commit('SETAUTHCURRENTUSER', user)
export const setDBCurrentUser = ({ commit }, user) => commit('SETDBCURRENTUSER', user)
export const storeToken = ({ commit }, tokenData) => commit('STORETOKEN', tokenData)

export const addPin = ({ commit }, pin) => commit('ADDPIN', pin)
export const setAddPopupOpen = ({ commit }, isOpen) => commit('SETADDPOPUPOPEN', isOpen)
