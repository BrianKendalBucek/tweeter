$(document).ready(function() {

  console.log("Ready to be manipulated by jQuery.");
  const initialCount = 140;

  $("#tweet-text").keyup(function(){

    let content = this.value.length;

    let remainingCount = initialCount - content;

    $(".counter").html(remainingCount);

    if (remainingCount < 0) {
      $(".counter").css("color", "rgb(255,0,0)");
    }

    if (remainingCount >= 0 && $(".counter").css("color") == $("#textColor").css("color")) {
      $(".counter").css("color", "rgb(0,0,0)");
    }
  });
});


// keydown event
// keyup event
// keypress event
// change event
// input event

// Which is the best event to detect the correct length of the input and update the counter?