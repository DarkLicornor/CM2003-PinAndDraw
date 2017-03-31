export const PINS_LIST = (state, topics) => {
  state.topics = topics
}

export const INCREMENT = (state) => {
  state.count++
}

export const DECREMENT = (state) => {
  state.count--
}

export const SETFIREBASEDB = (state, ref) => {
  state.firebaseDB = ref
}

export const SETFIREBASEAUTH = (state, ref) => {
  state.firebaseApp = ref
}

export const SETAUTHCURRENTUSER = (state, user) => {
  state.authCurrentUser = user
}

export const SETDBCURRENTUSER = (state, user) => {
  state.DBCurrentUser = user
}
