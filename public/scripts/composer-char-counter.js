$(document).ready(() => {
  $('#tweet-text').on('input', function(e) {
    const charLimit = 140;
    const charCount = $(this).val().length;          // the length of textarea text

    const $counter = $(this).parent().find('.counter');
    $counter.text(charLimit - charCount);           // shows user how many characters available

    // the counter becomes red when over the character limit
    if ($counter.val() < 0) {
      return $counter.addClass('over-limit');
    }

    $counter.removeClass('over-limit');
  });
});
