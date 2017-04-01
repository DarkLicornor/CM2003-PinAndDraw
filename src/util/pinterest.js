 
var Const = require('./const');

// Initialize once with app id
PDK.init({ appId: Const.PIN_APP, cookie: true });

/*
 *  Wrapper for all Pinterest SDK actions
 */
var Pinterest = {
  /*
   *  Use the SDK to login to Pinterest
   *  @param {Function} callback - function fired on completion
   */
  login: function(callback) {
    PDK.login({ scope : Const.PIN_SCOPE }, callback);
  },

  getSession: function() {
    return PDK.getSession()
  },

  setSession: function(session) {
    PDK.setSession(session)
  },
  /*
   *  Use the SDK to logout of Pinterest
   */
  logout: function() {
    PDK.logout();
  },
  /*
   *  Use DK to determine auth state of user
   *  @returns {Boolean}
   */
  loggedIn: function() {
    return !!PDK.getSession();
  },
  /*
   *  Use SDK to create a new Pin
   *  @param {Object}   data     - {board, note, link, image_url}
   *  @param {Function} callback - function fired on completion
   */
  createPin: function(data, callback) {
    PDK.request('/pins/', 'POST', data, callback);
  },
  /*
   *  Use SDK to request current users boards
   *  @param {Function} callback - function fired on completion
   */
  getBoards: function(callback) {
    PDK.me('boards', { fields: Const.PIN_BOARD_FIELDS }, callback);
  },
  /*
   *  Use SDK to request current users pins from a board
   *  @param boardId - the id of the board countaining the pins
   *  @param {Function} callback - function fired on completion
   */
  getPins: function(boardId, callback) {
    //PDK.request('boards/'+boardId+'/pins/', { fields: Const.PIN_FIELDS }, callback);

    var pins = [];
    PDK.request('boards/'+boardId+'/pins/', { fields: Const.PIN_PIN_FIELDS }, function (response) { // Make sure to change the board_id
      if (!response || response.error) {
        console.log('! pins retrieval error')
      } else {
        pins = pins.concat(response.data);
        if (response.hasNext) {
          response.next(); // this will recursively go to this same callback
        } else {
          callback(pins)
        }
      }
    });
  }
};

module.exports = Pinterest;