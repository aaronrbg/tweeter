/* character counter for tweets */

$(document).ready(function() {
    $('.new-tweet textarea').on('keyup', function() {
        $('.new-tweet .counter').text(140 - $(this).val().length);
    });
  });