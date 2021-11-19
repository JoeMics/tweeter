// Function that escapes text, Prevents XSS
const escape = function(str) {
  let div = document.createElement("div");
  // adds in potentially harmful string to div as a text node
  div.appendChild(document.createTextNode(str));
  // only return the contents of the text node
  return div.innerHTML;
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