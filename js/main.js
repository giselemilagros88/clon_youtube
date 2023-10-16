function authenticateAndLoadClient() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
        .then(function() { 
          console.log("Sign-in successful"); 
          return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
        })
        .then(function() { 
          console.log("GAPI client loaded for API");
          execute(); // Llama a la función 'execute' después de cargar el cliente
        })
        .catch(function(err) { 
          console.error("Error signing in or loading GAPI client", err); 
        });
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.videos.list({
      "myRating": "like"
    })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        })
        .catch(function(err) { 
          console.error("Execute error", err); 
        });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({ client_id: "622333118308-8rbu9bn5bvrqahogbf92rj1e3md0i186.apps.googleusercontent.com" }).then(function () {
      // Una vez inicializado el cliente de autenticación, llamamos a la función 'authenticateAndLoadClient'
      authenticateAndLoadClient();
    });
  });