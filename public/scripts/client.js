// This code only runs when the whole HTML is rendered by the client
$(document).ready(() => {
  /*************/
  // FUNCTIONS //
  /*************/

  // Function that escapes text, Prevents XSS
  const escape = function(str) {
    let div = document.createElement("div");
    // adds in potentially harmful string to div as a text node
    div.appendChild(document.createTextNode(str));
    // only return the contents of the text node
    return div.innerHTML;
  };
  
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
      <p>${escape(content.text)}</p>
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

      // prepend it to the tweet container
      $('.tweets-container').prepend($tweet);
    });
  };

  // Function retrieves tweets from /tweets
  const loadTweets = function() {
    // Make Ajax GET request from /tweets
    // Should receive an array of tweets in JSON
    $.ajax('/tweets')
      .then(data => {
        // if there are already tweets in the container, remove them
        $('.tweets-container').html(null);
        // calls render Tweets to update the web page
        renderTweets(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  };

  // Function that validates form
  // returns an error message, or null if input is okay
  const validateForm = function(input) {
    // checks to make sure the input is not empty, or empty spaces
    if (!input.length || !input.trim()) {
      return 'Tweet must contain text';
    }

    // checks the character limit of input
    const characterLimit = 140;
    if (input.length > characterLimit) {
      return 'Your tweet exceeds the maximum character limit';
    }

    // returns null if input is valid
    return null;
  };

  /* *************** */
  // EVENT HANDLERS  //
  /* *************** */

  // handles new tweet creation form submission
  $('.new-tweet form').submit(function(event) {
    // prevents refreshing of page
    event.preventDefault();
    
    // error message slides up, if existant
    $('span.error').slideUp('fast',function() {
      this.remove();
    });
    
    // extract input to validate before serialization
    const $formInput = $(this).find('textarea');
    
    // Handles form input errors, if present
    const errorMessage = validateForm($formInput.val());
    if (errorMessage) {
      // create span element with "error" styles
      let $error = $('<span></span>').addClass('error');
      $error.text(errorMessage);

      // If an error message is being displayed, replace the contents
      if (document.querySelector('span.error')) {
        return $('span.error').replaceWith($error);
      }

      // If there is no error message present, animate the message
      $error.hide().insertAfter($formInput).slideDown('fast');
    }

    // extract form data
    // turns form data into: text=somevalue
    const serlalizedInput = $(this).serialize();

    // send AJAX post request to server
    const sendTweet = $.ajax('/tweets', { method: 'POST', data: serlalizedInput });
    sendTweet.then(() => {
      // renders tweet on the page after submission
      loadTweets();
      // clear the textarea, reset counter
      $($formInput).val('');
      $($formInput).trigger('input');
    });
  });

  // Event handler to show or hide new tweet form
  $('.new-tweet form').hide();
  $('nav button').on('click', () => {
    $('.new-tweet form').slideToggle();
  });
  
  // Loads tweets on start up
  loadTweets();
});