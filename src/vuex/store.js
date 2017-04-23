import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const defaultState = {
  authCurrentUser: null,
  firebaseDB: null,
  firebaseApp: null,
  firebaseStorage: null,
  users: null,
  DBCurrentUser: null,
  pins: null,
  addPopupOpen: false,
  uploadQueue: [],
}

const inBrowser = typeof window !== 'undefined'

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
