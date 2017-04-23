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

export const SETFIREBASESTORAGE = (state, ref) => {
  state.firebaseStorage = ref
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

export const ADDPIN = (state, pin) => {
  state.pins.push({
    x: 0,
    y: 0,
    width: pin.width,
    height: pin.height,
    img: pin.url,
    ratio: 1
  })
  state.addPopupOpen = false
}

export const SETADDPOPUPOPEN = (state, isOpen) => {
  state.addPopupOpen = isOpen
}

export const STORETOKEN = (state, tokenData) => {
  state.DBCurrentUser[tokenData.api+'Token'] = tokenData.token
}

export const ADDFILETOUPLOADQUEUE = (state, file) => {
  state.uploadQueue.push(file)
}

export const REMOVEFILEFROMUPLOADQUEUE = (state, file) => {
  let index = state.uploadQueue.indexOf(file)
  if(index > -1){
    state.uploadQueue.splice(index, 1)
  }
}

export const CLEARUPLOADQUEUE = (state) => {
  state.uploadQueue = []
}


