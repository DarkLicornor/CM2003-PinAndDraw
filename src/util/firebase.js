const FirebaseAuth = {
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
          switch(parameters.name) {
            case "google":
              parameters.context.getFirebaseDB.ref('users').push({
                email:parameters.context.getFirebaseAuth.currentUser.email,
                uid: parameters.context.getFirebaseAuth.currentUser.uid,
                googleToken: result.credential.accessToken
              })
              break
            case "facebook":
              parameters.context.getFirebaseDB.ref('users').push({
                email:parameters.context.getFirebaseAuth.currentUser.email,
                uid: parameters.context.getFirebaseAuth.currentUser.uid,
                facebookToken: result.credential.accessToken
              })
              break
            case "twitter":
              parameters.context.getFirebaseDB.ref('users').push({
                email:parameters.context.getFirebaseAuth.currentUser.email,
                uid: parameters.context.getFirebaseAuth.currentUser.uid,
                twitterToken: result.credential.accessToken
              })
              break
          }
        }
        parameters.context.$router.push('/board')
      })
      .catch(function(error) {
        console.log("error" + error.message)
        parameters.context.providerError = error.message
      })
  }
}

export default FirebaseAuth
