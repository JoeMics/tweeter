/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// This code only runs when the whole HTML is rendered by the client
$(document).ready(() => {

  // Fake data taken from initial-tweets.json
  // ONLY FOR DEBUGGING
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  // Function takes a tweet object, returns the <article> containing tweet HTML
  const createTweetElement = function(tweetObject) {

    const {
      user,                   // contains user's name, avatars, and handle
      content,                // the text of the tweet
      created_at: createdAt   // time created in Unix time
    } = tweetObject;

    // Converts time to "x 'days/months/years' ago", using timeago library
    const formattedTime = timeago.format(createdAt);

    // returns the element as a jquery element
    return $(`
    <article class="tweet">
    <header>
      <div class="left">
        <img src="${user.avatars}" alt="profile icon">
        <h3>${user.name}</h3>
      </div>
        <span class="handle">${user.handle}</span>
    </header>
      <p>${content.text}</p>
    <footer>
      <span class="date">${formattedTime}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
  };

  // Function that appends to the tweet container
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {

      // take the json data, and add them to tweet html
      const $tweet = createTweetElement(tweet);

      // append it to the tweet container
      $('.tweets-container').append($tweet);
    });
  };

  /* *************** */
  // EVENT HANDLERS  //
  /* *************** */

  // handles new tweet creation form submission
  $('.new-tweet form').submit(function(event) {
    // prevents refreshing of page
    event.preventDefault();

    // extract form data
    const formInput = $(this).find('textarea').val();

    // send AJAX post request to server

  });

  // runner code for debugging
  renderTweets(data);
});