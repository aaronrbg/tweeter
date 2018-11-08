/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
    
    function toDaysAgo(time){
        const timeAgo = Date.now() - parseInt(time, 10);
        let daysAgo = Math.floor(timeAgo/(1000*60*60*24));
        if (daysAgo === 1) {
            daysAgo += ' day ago'
        } else {
            daysAgo += ' days ago'
        }
        return daysAgo
    }

    //this function escapes any possible html or script which could end up in the DOM
    function escape(text){
        let escaped = $('<div/>').text(text).html()
        return escaped;
    }

    function createTweetElement(tweetDataObject){
        const img = escape(tweetDataObject.user.avatars.small);
        const name = escape(tweetDataObject.user.name);
        const handle = escape(tweetDataObject.user.handle);
        const text = escape(tweetDataObject.content.text);
        const timestamp = escape(tweetDataObject.created_at);
        const daysAgo = toDaysAgo(timestamp);


        let $tweet = $('<article>').addClass('tweet');
        $tweet.append(`<header><img src="${img}"><h2>${name}</h2><span class='userID'>${handle}</span></header>`);
        $tweet.append(`<p>${text}</p>`);
        $tweet.append(`<footer>${daysAgo}<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-thumbs-up"></i></footer></article>`);
        return $tweet;
    }

    function renderTweets(tweets) {
        tweets.reverse().forEach(function(x, i){
            const $tweet = createTweetElement(tweets[i]);
            $('section.tweets-container').append($tweet);
        });
    }

    function loadTweets(){
      console.log('load the tweets')
      $.get('/tweets', (data) => {
        renderTweets(data);
      });
    }

    function clearTweets(){
        $('section.tweets-container').empty();
    }

    function errorUser(message) {
        if ($('div.error').is(":visible")) {
            $('div.error').hide();
        }

        if (!message) {
            $('div.error').text("your squeek aint got nuttin' in der").slideDown('fast');
            return true;
        } else if (message.length > 140) {
            $('div.error').text("too much squeek!").slideDown('fast');
            return true;
        } else { 
            return false;
        }
    }

    $('form').on('submit', function(event) {
      event.preventDefault();
      const tweet = $('form textarea').val()
      const $tweet = $('form').serialize();
        if (errorUser(tweet)) {
        } else {
            $.post('/tweets/', $tweet, function(){
                $('form textarea').val('');
                $('.new-tweet .counter').text('140');
                clearTweets();
                loadTweets();
                });
        }
    });

    $('#nav-bar .button').on('click', function(event){
        if ($('div.error').is(":visible")) {
            $('div.error').hide();
        }
        $('.new-tweet').slideToggle('slow');
        $('textarea').select();
    })

    loadTweets()
});