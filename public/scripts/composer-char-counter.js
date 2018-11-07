/* character counter for tweets */

$(function() {
    $('.new-tweet textarea').on('keyup', function() {
        const characterCount = $(this).val().length;
        const charactersRemaining = (140 - characterCount);
        $('.new-tweet .counter').text(charactersRemaining);
        if (charactersRemaining < 0) {
            $('.new-tweet .counter').addClass('red');
        } else {
            $('.new-tweet .counter').removeClass('red');
        }
    });
  });