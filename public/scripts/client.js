/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// This code only runs when the whole HTML is rendered by the client
$(document).ready(() => {
  /*************/
  // FUNCTIONS //
  /*************/
  
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

  // Function retrieves tweets from /tweets
  const loadTweets = function() {
    // Make Ajax GET request from /tweets
    // Should receive an array of tweets in JSON
    $.ajax('/tweets')
      .then(data => {
        // calls render Tweets to update the web page
        renderTweets(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  };

  // Function that validates form

  /* *************** */
  // EVENT HANDLERS  //
  /* *************** */

  // handles new tweet creation form submission
  $('.new-tweet form').submit(function(event) {
    // prevents refreshing of page
    event.preventDefault();
    
    // extract input to validate before serialization
    const formInput = $(this).find('textarea').val();


    // extract form data
    // turns form data into: text=somevalue
    const serlalizedInput = $(this).serialize();

    // send AJAX post request to server
    $.ajax('/tweets', { method: 'POST', data: serlalizedInput });
  });

  // Loads tweets on start up
  loadTweets();
});