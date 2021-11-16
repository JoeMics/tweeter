$(document).ready(() => {
  $('#tweet-text').on('input', function(e) {
    const charLimit = 140;
    const charCount = $(this).val().length; // the length of textarea text

    const $counter = $(this).parent().find('.counter');
    $counter.text(charLimit - charCount);
  });
});
