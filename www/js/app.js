angular.module('directory', ['ionic', 'directory.controllers', 'directory.services'])

 .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  Parse.initialize("DT0d4iIkfiaP5JKmeT6MV6pyWn10kgdryGMr9NDX", "R7OVvGNYbeLFNKSBzWbUWX78XZiXlbdkv6S8vU0I");
  console.log("Parse initilized in run");
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.teams', {
      url: '/teams',
      views: {
        'tab-teams': {
          templateUrl: 'templates/tab-teams.html',
          controller: 'TeamList'
        }
      }
    })
   .state('tab.teams-detail', {
      url: '/teams/:teamId',
      views: {
        'tab-teams': {
          templateUrl: 'templates/team-detail.html',
          controller: 'TeamDetailCtrl'
        }
      }
    })
  .state('tab.enter', {
      url: '/enter',
      views: {
        'tab-enter': {
          templateUrl: 'templates/tab-enter.html',
          controller: 'EnterCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})






//home
.controller('home', function($scope) {


    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.find({
      success: function(results) {


        //gameCard = { b1: b2: b3: r1: r2: r3: };
        //set an array of game cards to the same length as the results array
        gamecard[results.length];

        

        for( var i = 0; i < results.length; i++ ){

          

        }

       
       
      },
      error: function(error) {
        alert("Error retrieving Scouted Team List, Make sure you are on Wifi or 3G");
      }
    });


})


//succes rate calculater
//--  amount of times faced/succesfully navigated through
//to find optimal 4 defenses from each gate I would calculate out the best success rates

//maybe try to nuetralized the best shooters/scorers

//Estimated Match Contribution

//Highest Robot success rate 
//Which Robot is likey to do the most Damage.. highest contribution per match

//of the 3 robots calculate who scores the highest amount = (low goal * 2) + (high goal * 5)


//find defenses with lowest overall success rate
// Da facing it in 2 matches.. was able to crosss it 6 times
// Db facing it in 2 matches .. was able to cross it 2 times


//Catagory D is out of your control?



//look at each group with the A and B option. Compare each Robots scoring abilty
//and rank them 1. 2. 3. , ranking would be best shooting per match (low goal + high goal + maybe hanging)
//also look to see if robots have gotten through a defenses a significant amount
//robot 1 you wont to give the worst chance of getting over the ramp


//track what takes the longest amount of time to get through -- if it appears that someone is taking a long time