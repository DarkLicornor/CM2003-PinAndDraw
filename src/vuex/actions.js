import { firebaseAction } from 'vuexfire'

//Link the local state with specific firebase database endpoints
export const setBoardsRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('boards', ref)
})
export const setUsersRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('users', ref)
})
export const setDBCurrentUserRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('DBCurrentUser', ref)
})
export const setCurrentBoardRef = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
  bindFirebaseRef('currentBoard', ref)
})

//Firebase actions
export const setFirebaseDB = ({ commit }, ref) => commit('SETFIREBASEDB', ref)
export const setFirebaseAuth = ({ commit }, ref) => commit('SETFIREBASEAUTH', ref)
export const setFirebaseStorage = ({ commit }, ref) => commit('SETFIREBASESTORAGE', ref)
export const setAuthCurrentUser = ({ commit }, user) => commit('SETAUTHCURRENTUSER', user)
export const setDBCurrentUser = ({ commit }, user) => commit('SETDBCURRENTUSER', user)

//Old code used to store the API tokens locally
export const storeToken = ({ commit }, tokenData) => commit('STORETOKEN', tokenData)

//Hide or display popup
export const setAddPopupOpen = ({ commit }, isOpen) => commit('SETADDPOPUPOPEN', isOpen)

//Upload file component
export const addFileToUploadQueue = ({ commit }, file) => commit('ADDFILETOUPLOADQUEUE', file)
export const removeFileFromUploadQueue = ({ commit }, file) => commit('REMOVEFILEFROMUPLOADQUEUE', file)
export const clearUploadQueue = ({ commit }) => commit('CLEARUPLOADQUEUE')
