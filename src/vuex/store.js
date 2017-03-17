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
    img: "http://pre07.deviantart.net/ead2/th/pre/i/2015/335/d/3/mad_bomber_by_flotosor-d9intdv.jpg",
    ratio: 1
  },
  {
    title: '2',
    x: 800,
    y: 20,
    width: 300,
    height: 300,
    img: "http://orig10.deviantart.net/cf43/f/2017/027/4/9/profile_picture_by_flotosor-dawx628.jpg",
    ratio: 1
  },
  {
    x: 20,
    y: 600,
    width: 833,
    height: 958,
    img: "http://pre07.deviantart.net/ead2/th/pre/i/2015/335/d/3/mad_bomber_by_flotosor-d9intdv.jpg",
    ratio: 1
  },
  {
    x: 500,
    y: 500,
    width: 833,
    height: 958,
    img: "http://pre07.deviantart.net/ead2/th/pre/i/2015/335/d/3/mad_bomber_by_flotosor-d9intdv.jpg",
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
