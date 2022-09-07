$(document).ready(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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
              <span><b>${tweet.created_at}</b></span>
              <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
    </article>`;

    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
    }
  };

  renderTweets(data);

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const serializedForm = $(this).serialize();
    console.log(serializedForm);
    $.post("/tweets", serializedForm)
      .then((data) => { console.log("form successfully submitted", data) });
  });
});