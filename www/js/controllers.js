angular.module('directory.controllers', [])
.controller('DashCtrl', function($scope, $state) {

$scope.list = [];
retriever();
function retriever() {
  $scope.list = [];

 var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.descending("createdAt");

    query.find({
      success: function(results) {

        for( var i = 0; i < results.length; i++ ){
          var red = true;
          var blue = false;
          if( results[i].get("Alliance") == "red" )
          {
            red = true;
            blue = false;

          } else {
            red = false;
            blue = true;
          }

            var object = { Blue: blue, Red: red, Alliance: results[i].get("Alliance"), ScaledTower: results[i].get("ScaledTower"), valPortcullis: results[i].get("valPortcullis"),valRoughterrain: results[i].get("valRoughterrain"),valRockwall: results[i].get("valRockwall"), valSallyPort: results[i].get("valSallyPort"), valramparts: results[i].get("valramparts"), valMoat: results[i].get("valMoat"), valCheva: results[i].get("valCheva"),valPortcullis: results[i].get("valPortcullis"), Team: results[i].get("Team"),  Match: results[i].get("Match"), Low: results[i].get("LowGoal"), High: results[i].get("HighGoal"),  fieldPortcullis: results[i].get("fieldPortcullis"), fieldCheva: results[i].get("fieldCheva"),fieldMoat: results[i].get("fieldMoat"),fieldramparts: results[i].get("fieldramparts"),fielddrawbridge: results[i].get("fielddrawbridge"),fieldSallyPort: results[i].get("fieldSallyPort"),fieldRockwall: results[i].get("fieldRockwall"),fieldRoughterrain: results[i].get("fieldRoughterrain"),};
            $scope.list.push( object );
        }
       
       
      },
      error: function(error) {
        alert("Error retrieving Scouted Team List, Make sure you are on Wifi or 3G");
      }
    });
};

  $scope.doRefresh = function() {
    console.log("Pulling to refresh");
    retriever();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()

  };


})

//controller shows off each team # in a list
.controller('TeamList', function($scope) {
$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});  
  console.log("team controller is on");
       var teamNumberList = [];


    
var dupe = [];
function listRetriever() { 
    var teamNumberList = [];
    dupe = [];

    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.find({
      success: function(results) {
          console.log("We retrieved: " + results.length );
        for( var i = 0; i < results.length; i++ ){
          console.log( results[i].get("Team"))
            teamNumberList.push( results[i].get("Team") );
        }
        teamNumberList.sort();

  
       // var dupe = []; // new array
        for(var i = 0; i < teamNumberList.length; i++ )
        {

          if( dupe.length <= 0 )
          {
            dupe.push( teamNumberList[i] )
          } else {

            console.log("else");
            var checker = false;
            for( var j = 0; j < dupe.length; j++ )
            {
              if( dupe[j] == teamNumberList[i] )
              {
                console.log("Duplicate!");
                checker = true;
              }
            }

            if( checker == false )
            {
              dupe.push(teamNumberList[i]);
            }

          }

        }//end original for loop
        function sortNumber(a,b) {
    return a - b;
}
        console.log("HEY")
        console.log("Should be sorted");
        dupe.sort(sortNumber);
        console.log( dupe );


      },
      error: function(error) {
        alert("Error retrieving Team List, Make sure you are on Wifi or 3G");
      }
    });



   $scope.teams = dupe;
            //$scope.$apply();
        
 }
   listRetriever();

 $scope.doRefresh = function() {
         // here refresh data code
         listRetriever();

         $scope.$broadcast('scroll.refreshComplete');
         $scope.$apply()
      };

})


//controls data entry view
.controller('EnterCtrl', function($scope) {
  console.log("enterctrl is on")

  var val = 1;
$scope.data = {};
//$scope.data.teamnumber = 1;


$scope.originalUser = angular.copy($scope.data);

  //submit
  $scope.submit = function()
  {
    
    var color = "red";

    if( $scope.data.red == true )
    {
      color = "red";
    } else if( $scope.data.blue == true)
    {
      color = "blue";
    }




    if( $scope.data.teamnumber != null && $scope.data.matchnumber != null )
    {
      console.log("====submited data ===");
      
      var lowgoal;
      var highgoal;

      console.log("joe look " + $scope.data.portcullis)

      //low goal
      if( $scope.data.lowgoal == null )
      {
        lowgoal = 0;
      } else 
      {
        lowgoal = $scope.data.lowgoal;
      }

      //high goal
      if( $scope.data.highgoal == null )
      {
        highgoal = 0;
      } else 
      {
        highgoal = $scope.data.highgoal;
      }



      //save the object
      var GameScore = Parse.Object.extend("GameScore");
      var gameScore = new GameScore();

      gameScore.set("Team", $scope.data.teamnumber );
      gameScore.set("Match", $scope.data.matchnumber);
      gameScore.set("LowGoal", lowgoal);
      gameScore.set("HighGoal", highgoal);
      gameScore.set("ScaledTower", $scope.data.scale);
      gameScore.set("Alliance", color );
      
      gameScore.set("fieldPortcullis",$scope.data.portcullis );
      gameScore.set("fieldCheva",$scope.data.cheval );
      gameScore.set("fieldMoat",$scope.data.moat );
      gameScore.set("fieldramparts",$scope.data.rampart );
      gameScore.set("fielddrawbridge",$scope.data.drawbridge );
      gameScore.set("fieldSallyPort",$scope.data.sport );
      gameScore.set("fieldRockwall",$scope.data.rockwall );
      gameScore.set("fieldRoughterrain",$scope.data.roughterrain );

      //now how many times they were succesful
      gameScore.set("valPortcullis",$scope.data.sportcullis );
      gameScore.set("valCheva",$scope.data.scheval );
      gameScore.set("valMoat",$scope.data.smoat );
      gameScore.set("valramparts",$scope.data.sramparts );
      gameScore.set("valdrawbridge",$scope.data.sdrawbridge );
      gameScore.set("valSallyPort",$scope.data.ssallyport );
      gameScore.set("valRockwall",$scope.data.srockwall );
      gameScore.set("valRoughterrain",$scope.data.srough );
      gameScore.set("valLowBar",$scope.data.slowbar );




  gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    console.log("success")
    alert('Submitted! Keep Scouting! ~ Joe ');
    

$scope.$apply(function() { 
   // every changes goes here
   console.log("apply function")
  $scope.data.teamnumber = null;
  $scope.data.matchnumber = null;
  $scope.data.alliance = null;
  $scope.data.portcullis = null;
  $scope.data.cheval = null;
  $scope.data.moat = null;
  $scope.data.rampart = null;
  $scope.data.drawbridge = null;
  $scope.data.sport = null;
  $scope.data.rockwall = null;
  $scope.data.roughterrain = null;
  $scope.data.sportcullis = null;
  $scope.data.scheval = null;
  $scope.data.smoat = null;
  $scope.data.sramparts = null;
  $scope.data.sdrawbridge = null;
  $scope.data.ssallyport = null;
  $scope.data.srockwall = null;
  $scope.data.srough = null;
  $scope.data.slowbar = null;
  $scope.data.scale = null; //tower
  $scope.data.lowgoal = null;
  $scope.data.highgoal = null;




});





  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to submit Data. Make sure you are on Wifi or Cellular Data' + error.message);
  }
});


} else
{
  alert('Team Number, Match Number and Alliance are REQUIRED!')
}

 }//end function

teamnumber();

//team number list retrieve
function teamnumber() {

var teamArray = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
query.find({
  success: function(results) {
console.log("succesful team list retrieve")    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      teamArray.push(results[i].get("Team"));

    }
    console.log("Fin Team List");
    console.log(teamArray);
    $scope.data.teamlist = teamArray;

  },
  error: function(error) {
    console.log("Error Retrieving Team List")
  }
});

};




})





.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('TeamDetailCtrl', function($scope, $state, $stateParams) {
    
$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});  
  console.log("TEAM DETAIL CONTROLLER")
  console.log("LA STORRRRRRY");
  $scope.team = $stateParams.teamId;
  console.log( $scope.team );
  var number = parseInt($scope.team);

  //stats--
  //matches played
  //high goal per match
  //low goal per match
  
retriever();
function retriever() {
  $scope.list = [];

 var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.equalTo("Team", number );

    query.ascending("createdAt");

    query.find({
      success: function(results) {
        console.log("Amount of results" + results.length);

        for( var i = 0; i < results.length; i++ ){
          var red = true;
          var blue = false;
          if( results[i].get("Alliance") == "red" )
          {
            red = true;
            blue = false;

          } else {
            red = false;
            blue = true;
          }

            var object = { Blue: blue, Red: red, Alliance: results[i].get("Alliance"), ScaledTower: results[i].get("ScaledTower"), valPortcullis: results[i].get("valPortcullis"),valRoughterrain: results[i].get("valRoughterrain"),valRockwall: results[i].get("valRockwall"), valSallyPort: results[i].get("valSallyPort"), valramparts: results[i].get("valramparts"), valMoat: results[i].get("valMoat"), valCheva: results[i].get("valCheva"),valPortcullis: results[i].get("valPortcullis"), Team: results[i].get("Team"),  Match: results[i].get("Match"), Low: results[i].get("LowGoal"), High: results[i].get("HighGoal"),  fieldPortcullis: results[i].get("fieldPortcullis"), fieldCheva: results[i].get("fieldCheva"),fieldMoat: results[i].get("fieldMoat"),fieldramparts: results[i].get("fieldramparts"),fielddrawbridge: results[i].get("fielddrawbridge"),fieldSallyPort: results[i].get("fieldSallyPort"),fieldRockwall: results[i].get("fieldRockwall"),fieldRoughterrain: results[i].get("fieldRoughterrain"),};
            $scope.list.push( object );
        }
       
       
      },
      error: function(error) {
        alert("Error retrieving Scouted Team List, Make sure you are on Wifi or 3G");
      }
    });
};
/*
 $scope.doRefresh = function() {
    console.log("Pulling to refresh");
    retriever();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()

  };
*/
//$state.go($state.current, {}, {reload: true});

});