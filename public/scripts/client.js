// Detects when the DOM is ready for JS code to execute.
$(document).ready(() => {

  // Tweet structure
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet-container">
            <div class="name-and-tag">
              <div>
                <img src="${tweet.user.avatars}"
                <span>${tweet.user.name}</span>
              </div>
              <span class="tag">${tweet.user.handle}</span>
            </div>
            <div class="completed-tweet-text">
              <p>${tweet.content.text}</p>
            </div>
            <footer class="timespan">
              <span><b>${timeago.format(tweet.created_at)}</b></span>
              <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
    </article>`;

    return $tweet;
  };

  // Takes in an array of tweet objects from the database,
  // loops through the tweets,
  // calls createTweetElement for each tweet,
  // takes return value and appends it to the tweets container.
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  };
  
  // Uses jQuery and AJAX to make a request to /tweets and receive the array of tweets as JSON.
  function loadTweets() {
    $.ajax("/tweets", { method: 'GET' })
      .then((tweets) => { console.log("form successfully retrieved", tweets); renderTweets(tweets)});
  };
  
  $("#tweet-form").submit(function (event) {
    // To prevent the default behaviour of the page refreshing upon submitting.
    event.preventDefault();
    // To turn the form data into a query string to send to the server in the data field of the AJAX POST REQUEST.
    const serializedForm = $(this).serialize();
    console.log(serializedForm);
    // Validation code
    let textContent = $("#tweet-text").val();
    if (textContent.length > 140) {
      alert("Text content is too long");
      return;
    }
    if (textContent.length === 0 || textContent === null) {
      alert("Add content");
      return;
    }
    // Sending the tweets to the server as the query string created above.
    $.post("/tweets", serializedForm)
      .then((res) => { console.log("form successfully submitted", res); $("#tweets-container").empty(); loadTweets() });
  });

  loadTweets();
});