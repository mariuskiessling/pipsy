chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    togglePIP();
})

const NORMAL = 0;
const POPPED = 1;

let players = null;
let status = NORMAL;

const togglePIP = function() {
  if(status == NORMAL) {
    popOut();
  } else {
    popIn();
  }
}

const popOut = function() {
  if(players == null) {
    players = collectPlayers();
  }

  if(players.length == 0) {
    alert("Could not find any players that can be popped.");
  } else {
    let failedTries = 0;

    for(i = 0; i < players.length; i++) {
      try {
        players[i].requestPictureInPicture();
      } catch(e) {
        failedTries++;
      } finally {
        if(failedTries == players.length) {
          alert("Could not find any players that can be popped.");
        } else {
          status = POPPED;
        }
      }
    };
  }
}

const popIn = function() {
  try {
    document.exitPictureInPicture();
    status = NORMAL;
  } catch(e) {
  }
}

const collectPlayers = function() {
  return document.getElementsByTagName("video");
}
