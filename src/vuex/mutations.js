export const PINS_LIST = (state, topics) => {
  state.topics = topics
}

export const INCREMENT = (state) => {
  state.count++
}

export const DECREMENT = (state) => {
  state.count--
}

export const DRAG = (state, pinId, coordinates) => {
  state.pin[pinId].x += coordinates.x
  state.pin[pinId].y += coordinates.y
}

export const SETFIREBASEREFUSERS = (state, ref) => {
  state.firebaseRefUsers = ref
}
export const SETFIREBASEAPP= (state, ref) => {
  state.firebaseApp = ref
}
