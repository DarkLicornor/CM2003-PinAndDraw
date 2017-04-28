import { firebaseAction } from 'vuexfire'
let dbref = null

//Example from vuexfire
const setTodosRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('todos', ref)
  // you can unbind it easily too
  unbindFirebaseRef('todos')
})

export const setBoardsRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('boards', ref)
})

export const setDBCurrentUserRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('DBCurrentUser', ref)
})

export const setCurrentBoardRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('currentBoard', ref)
})
//export const setCurrentBoard = ({ commit }, board) => commit('SETCURRENTBOARD', board)

export const increment = ({ commit }) => commit('INCREMENT')
export const decrement = ({ commit }) => commit('DECREMENT')

export const setFirebaseDB = ({ commit }, ref) => {
  commit('SETFIREBASEDB', ref)
}
export const setFirebaseAuth = ({ commit }, ref) => commit('SETFIREBASEAUTH', ref)
export const setFirebaseStorage = ({ commit }, ref) => commit('SETFIREBASESTORAGE', ref)
export const setAuthCurrentUser = ({ commit }, user) => commit('SETAUTHCURRENTUSER', user)
export const setDBCurrentUser = ({ commit }, user) => commit('SETDBCURRENTUSER', user)
export const storeToken = ({ commit }, tokenData) => commit('STORETOKEN', tokenData)

export const setAddPopupOpen = ({ commit }, isOpen) => commit('SETADDPOPUPOPEN', isOpen)

export const addFileToUploadQueue = ({ commit }, file) => commit('ADDFILETOUPLOADQUEUE', file)
export const removeFileFromUploadQueue = ({ commit }, file) => commit('REMOVEFILEFROMUPLOADQUEUE', file)
export const clearUploadQueue = ({ commit }) => commit('CLEARUPLOADQUEUE')