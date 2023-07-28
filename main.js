// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  // Get element 
  const errorModal = document.getElementById("modal");
  
  // Add the .hidden class to the error modal so it does not appear when the page first loads
  errorModal.classList.add("hidden");

  // Add click event listener to all empty hearts
  const emptyHearts = document.querySelectorAll(".like-glyph");
  emptyHearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // On success, change the heart to a full heart
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch((error) => {
          // On failure, display the error modal with the error message
          const modalMessage = document.getElementById("modal-message");
          modalMessage.innerText = error;
          errorModal.classList.remove("hidden");
          setTimeout(() => {
            // Hide the error modal after 2 seconds
            errorModal.classList.add("hidden");
          }, 2000);
        });
    });
  });

  // Add click event listener to all full hearts
  const heartContainer = document.querySelector(".media-post");
  heartContainer.addEventListener("click", (event) => {
    const clickedHeart = event.target;
    if (clickedHeart.classList.contains("activated-heart")) {
      // Change the heart back to an empty heart
      clickedHeart.innerText = EMPTY_HEART;
      clickedHeart.classList.remove("activated-heart");
    }
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
