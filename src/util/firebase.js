//The firebase authentication logic

const FirebaseAuth = {
  //Login with an API handled by firebase
  signWithProvider: function(parameters) {
      parameters.context.getFirebaseAuth.signInWithPopup(parameters.provider)
      .then(function(result) {
        let newUser = result.user
        let existing = false
        parameters.context.users.map((user) => {
          if(user.uid === newUser.uid) {
            existing = true
          }
        })
        if(existing == false) {
          let postData = {}
          switch(parameters.name) {
            case "google":
              postData = {
                email:parameters.context.getFirebaseAuth.currentUser.email,
                googleToken: result.credential.accessToken
              }
              break
            case "facebook":
              postData = {
                email:parameters.context.getFirebaseAuth.currentUser.email,
                facebookToken: result.credential.accessToken
              }
              break
            case "twitter":
              postData = {
                email:parameters.context.getFirebaseAuth.currentUser.email,
                twitterToken: result.credential.accessToken
              }
              break
          }
          //Push the tokens on the user table
          let updates = {}
          let uid = parameters.context.getFirebaseAuth.currentUser.uid
          updates['/users/' + uid] = postData
          parameters.context.getFirebaseDB.ref().update(updates)
        }
        //Redirect to /myboards
        parameters.context.$router.push('/myboards')
      })
      .catch(function(error) {
        console.log("error" + error.message)
        parameters.context.providerError = error.message
      })
  },
  //Link an API handled by firebase while already logged in (used in the account panel)
  linkWithProvider: function(parameters) {
    parameters.context.getFirebaseAuth.currentUser.linkWithPopup(parameters.provider)
    .then(function(result) {
      let uid = parameters.context.getFirebaseAuth.currentUser.uid
      let updates = {}
      switch(parameters.name) {
        case "google":
          updates['/users/' + uid + '/googleToken/' ] = result.credential.accessToken
          break
        case "facebook":
          updates['/users/' + uid + '/facebookToken/' ] = result.credential.accessToken
          break
        case "twitter":
          updates['/users/' + uid + '/twitterToken/' ] = result.credential.accessToken
          break
        }
        parameters.context.getFirebaseDB.ref().update(updates)
    }).catch(function(error) {
      console.log('ERROR', error.message)
    });
  },
  //Unlink an API from the account
  unlinkFromProvider: function(parameters) {
    parameters.context.getFirebaseAuth.currentUser.unlink(parameters.providerId)
    .then(function() {
      let uid = parameters.context.getFirebaseAuth.currentUser.uid
      console.log('to remove', uid, parameters.name)
      parameters.context.getFirebaseDB.ref('users/'+ uid + "/").child(parameters.name).remove()
      .catch((error) => console.log("error removing", error.message))
    }).catch(function(error) {
      console.log("ERROR UNLINK", error.message)
    });
  },
  //Store the Pinterest OAuth2 token
  linkPinterest: function(parameters){
      let uid = parameters.context.getFirebaseAuth.currentUser.uid
      let updates = {}
      updates['/users/' + uid + '/pinterestToken/' ] = parameters.token
      parameters.context.getFirebaseDB.ref().update(updates)
  },
  //Remove the Pinterest OAuth2 token
  unlinkPinterest: function(parameters){
      let uid = parameters.context.getFirebaseAuth.currentUser.uid
      let updates = {}
      updates['/users/' + uid + '/pinterestToken/' ] = null
      parameters.context.getFirebaseDB.ref().update(updates)
  },
}

export default FirebaseAuth
