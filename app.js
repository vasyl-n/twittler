$(document).ready(function(){
  var $body = $('body');
  $body.html('');
  var $tweetsContainer = $('<div></div>');
  $tweetsContainer.attr('id', 'tweetsContainer');
  var $showNewTweetsButton = $('<button>Show new twitts</button>');
  $tweetsContainer.appendTo($body);
  var $header = $('<div></div>').attr('id', 'header');
  $header.prependTo($body)
  var $home = $('<div></div>').attr({'class': 'headerButtons button', 'id': 'home'}).text('Home');
  $home.prependTo($header)
  streams.users.vasyl = [];
  function makeShowButton(){
    $showNewTweetsButton.attr({'id': 'showNewTweetsButton', 'class': 'button'})
    $showNewTweetsButton.prependTo($tweetsContainer);
  }

  function showHomeTweets(){
    $tweetsContainer.empty()
    makeShowButton()
    $('.user').on('click', callToRenderAnyUser)
    $showNewTweetsButton.on('click', function(){
      $tweetsContainer.empty()
      showHomeTweets()
      createTweets()
      $('.user').on('click', callToRenderAnyUser)
      makeTwittsField()
    })
  }

  function createTweets(loc='home'){
    if(loc === 'home'){
      var index = streams.home.length - 1;
    } else {
      var index = streams.users[loc].length - 1;
    }
    while(index >= 0){
      if(loc === 'home'){
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[loc][index];
      }
      var $tweet = $('<div></div>');
      var $user = $('<div></div>');
      var $message = $('<div></div>');
      var $timestamp = $('<div></div>');
      $user.text('@' + tweet.user).attr({'class': 'inline user button'});
      $message.text(tweet.message).attr('class', 'message');
      var timeAgo = time(tweet.created_at);
      $timestamp.text(timeAgo).attr({'class': 'inline timestamp'});
      $tweet.attr('class', 'tweet')
      $user.appendTo($tweet);
      $timestamp.appendTo($tweet)
      $message.appendTo($tweet);
      $tweet.appendTo($tweetsContainer);
      index -= 1;
    }
  }

showHomeTweets();
createTweets();
makeTwittsField();
$('.user').on('click', callToRenderAnyUser);

  function time(time){
    var now = new Date();
    deltaSec = Math.ceil((now - time) / 1000);
    if(deltaSec > 120){
      return Math.floor(deltaSec / 60) + " mins ago";
    }
    else if(deltaSec > 60){
      return Math.floor(deltaSec / 60) + " min ago";
    } else if(deltaSec > 5){
      return deltaSec + " seconds ago";
    } else {
      return "Just now";
    }
  }

  function callToRenderAnyUser(){
    var text = $(this).text();
    text = text.slice(1, text.length);
    $tweetsContainer.empty();
    createTweets(text);
  }

  $('#home').on('click', function(){
    showHomeTweets();
    createTweets();
    makeTwittsField();
    $('.user').on('click', callToRenderAnyUser);
  })

  function makeTwittsField(){
    $form = $('<input id="form" type="text">');
    
    $submit = $('<button id="submit" class="button">Tweet</button>');
    $submit.prependTo($tweetsContainer);
    $form.prependTo($tweetsContainer);
    $('#form').on('click', clearInputField);
    $('#submit').on('click', submitTweet);
    resetFormText();
  }

  function clearInputField(){
    $(this).val('');
  }

  function submitTweet(){
    var message = $('#form').val();
    var tweet = {};
    tweet.user = "vasyl";
    tweet.message = message;
    tweet.created_at = new Date();
    addTweet(tweet);
    resetFormText();
    showHomeTweets();
    createTweets();
    makeTwittsField();
    $('.user').on('click', callToRenderAnyUser);
  }

  function resetFormText(){
    $('#form').val("Whats is happening??");
  }




});
