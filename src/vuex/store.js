import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const defaultState = {
  topics: [],
  pins: [
  {
    x: 20,
    y: 20,
    width: 833,
    height: 958,
    img: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-kRnZimNNJsA%2FUBlEl68mn0I%2FAAAAAAAARns%2FyCBKphe6nG4%2Fs1600%2Ffunny-cat-pictures-009-001.jpg&f=1",
    ratio: 1
  },
  {
    title: '2',
    x: 800,
    y: 20,
    width: 300,
    height: 300,
    img: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FmW3S0u8bj58%2Fmaxresdefault.jpg&f=1",
    ratio: 1
  },
  {
    x: 20,
    y: 600,
    width: 833,
    height: 958,
    img: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.STP1XITH9uoxv3yGhdcsWAEsDg%26pid%3D15.1&f=1",
    ratio: 1
  },
  {
    x: 500,
    y: 500,
    width: 833,
    height: 958,
    img: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.dumpaday.com%2Fwp-content%2Fuploads%2F2012%2F10%2Ffunny-cats-1.jpg&f=1",
    ratio: 1
  }]
}

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
  PINS_LIST: (state, topics) => {
    state.topics = topics
  },

  INCREMENT: (state) => {
    state.count++
  },

  DECREMENT: (state) => {
    state.count--
  },

  DRAG: (state, pinId, coordinates) => {
    stage.pin[pinId].x += coordinates.x
    stage.pin[pinId].y += coordinates.y

  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
