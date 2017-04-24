export const getTopics = state => state.topics
export const myBoards = state => state.boards
export const currentBoard = state => state.currentBoard
export const users = state => state.users
export const authCurrentUser = state => state.authCurrentUser
export const DBCurrentUser = state => state.DBCurrentUser
export const getFirebaseDB = state => state.firebaseDB
export const getFirebaseAuth = state => state.firebaseApp
export const getFirebaseStorage = state => state.firebaseStorage
export const isAddPopupOpen = state => state.addPopupOpen
export const uploadQueue = state => state.uploadQueue

//debug
export const getState = state => state
