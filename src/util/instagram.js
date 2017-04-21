let Const = require('./const');

/*
 *  Wrapper for all Instagram API interactions
 */
let Instagram = {
    /*
     *  Open an Instagram OAuth window and catch the redirect callback from OAuth.js
     *  @param {Function} callback - function fired on completion
     */
    login: function(callback) {
        let popup = window.open(Const.IG_OAUTH, null, Const.POPUP_OPTIONS);

        let token

        popup.onload = function() {
            //an interval runs to get the access token from the pop-up
            let interval = setInterval(function() {
                try {
                    //check if hash exists
                    if(popup.location.hash.length) {
                        //hash found, that includes the access token
                        clearInterval(interval);
                        token = popup.location.hash.slice(14); //slice #access_token= from string
                        popup.close();
                        if(callback != undefined && typeof callback == 'function') callback(token);
                    }
                }
                catch(evt) {
                    //permission denied
                    console.log("error");
                }
            }, 100);
        }


    },
    /*
     *  Remove the Instagram cookie
     */
    logout: function() {
        //Cookie.remove(Const.IG_COOKIE);
    },
    /*
     *  Check to see if there is a cookie set. In the future it may
     *  be nice to attempt a request to verify token is valid
     *  @returns {Boolean}
     */
    loggedIn: function() {
        //return !!Cookie.load(Const.IG_COOKIE);
    },
    /*
     *  JSONP request feed data. 
     *  @param {String}   url      - contains base url and pagination data
     *  @param {Function} callback - function fired on completion
     */


     // pagination info : http://stackoverflow.com/questions/10881511/instagram-api-how-to-get-all-user-media
    getPictures: function(token, callback) {
        let script = document.createElement('SCRIPT');
        script.src = Const.IG_FEED + token;

        // this callback is pointed to in the IG_FEED const
        window._instaFeed = (response) => {
            callback(response);
            document.head.removeChild(script);
        }
        document.head.appendChild(script);
    }
};

module.exports = Instagram;