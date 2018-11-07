/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
        

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
        const daysAgo = 0


        let $tweet = $('<article>').addClass('tweet');
        $tweet.append(`<header><img src="${img}"><h2>${name}</h2><span class='userID'>${handle}</span></header>`);
        $tweet.append(`<p>${text}</p>`);
        $tweet.append(`<footer>${timestamp}<i class="fas fa-flag"></i></footer></article>`);
        return $tweet;
    }

    function renderTweets(tweets) {
        tweets.forEach(function(x, i){
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
      console.log('clear the tweets')
    }

    $('form').on('submit', function(event) {
      event.preventDefault();
      $.post('/tweets/', $('form').serialize());
      clearTweets();
      loadTweets();
    });

    loadTweets()
});