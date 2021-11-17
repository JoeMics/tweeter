/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// This code only runs when the whole HTML is rendered by the client
$(document).ready(() => {
  
  // Function takes a tweet object, returns the <article> containing tweet HTML
  const createTweetElement = function(tweetObject) {

    const {
      user,                   // contains user's name, avatars, and handle
      content,                // the text of the tweet
      created_at: createdAt   // time created in Unix time
    } = tweetObject;

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
      <span class="date">${createdAt}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
  };


  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});