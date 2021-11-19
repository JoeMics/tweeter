$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const charLimit = 140;
    // the length of textarea text
    const charCount = $(this).val().length;

    const $counter = $(this).parent().find('.counter');
    // shows user how many characters available
    $counter.text(charLimit - charCount);

    // the counter becomes red when over the character limit
    if ($counter.val() < 0) {
      return $counter.addClass('over-limit');
    }

    $counter.removeClass('over-limit');
  });
});
