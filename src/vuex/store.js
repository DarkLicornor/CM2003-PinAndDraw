import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

//Initial state
const defaultState = {
  authCurrentUser: null,
  firebaseDB: null,
  firebaseApp: null,
  firebaseStorage: null,
  users: [],
  DBCurrentUser: null,
  boards: [],
  currentBoard: null,
  addPopupOpen: false,
  uploadQueue: [],
}

const inBrowser = typeof window !== 'undefined'

// the next line is obsolete, used while we had Server-side rendering
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations: {
    ...mutations,
    ...firebaseMutations
  }
})
