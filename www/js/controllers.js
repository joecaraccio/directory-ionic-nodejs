angular.module('directory.controllers', [])


.directive('counter', function() {
    return {
        restrict: 'A',
        scope: { value: '=value' },
        template: '<a href="javascript:;" class="counter-minus" ng-click="minus()">-</a>\
                  <input type="text" class="counter-field" ng-model="value" ng-change="changed()" ng-readonly="readonly">\
                  <a  href="javascript:;" class="counter-plus" ng-click="plus()">+</a>',
        link: function( scope , element , attributes ) {
            // Make sure the value attribute is not missing.
            if ( angular.isUndefined(scope.value) ) {
                throw "Missing the value attribute on the counter directive.";
            }
            
            var min = angular.isUndefined(attributes.min) ? null : parseInt(attributes.min);
            var max = angular.isUndefined(attributes.max) ? null : parseInt(attributes.max);
            var step = angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step);
            
            element.addClass('counter-container');
            
            // If the 'editable' attribute is set, we will make the field editable.
            scope.readonly = angular.isUndefined(attributes.editable) ? true : false;
            
            /**
             * Sets the value as an integer.
             */
            var setValue = function( val ) {
                scope.value = parseInt( val );
            }
            
            // Set the value initially, as an integer.
            setValue( scope.value );
            
            /**
             * Decrement the value and make sure we stay within the limits, if defined.
             */
            scope.minus = function() {
                if ( min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1 ) {
                    setValue( min );
                    return false;
                }
                setValue( scope.value - step );
            };
            
            /**
             * Increment the value and make sure we stay within the limits, if defined.
             */
            scope.plus = function() {
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }
                setValue( scope.value + step );
            };
            
            /**
             * This is only triggered when the field is manually edited by the user.
             * Where we can perform some validation and make sure that they enter the
             * correct values from within the restrictions.
             */
            scope.changed = function() {
                // If the user decides to delete the number, we will set it to 0.
                if ( !scope.value ) setValue( 0 );
                
                // Check if what's typed is numeric or if it has any letters.
                if ( /[0-9]/.test(scope.value) ) {
                    setValue( scope.value );
                }
                else {
                    setValue( scope.min );
                }
                
                // If a minimum is set, let's make sure we're within the limit.
                if ( min && (scope.value <= min || scope.value - step <= min) ) {
                    setValue( min );
                    return false;
                }
                
                // If a maximum is set, let's make sure we're within the limit.
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }
                
                // Re-set the value as an integer.
                setValue( scope.value );
            };
        }
    }
})




.controller('DashCtrl', function($scope, $state) {
  $scope.doneLoading = false;
                $scope.doneLoading = true;


$scope.list = [];
retriever();
function retriever() {
  $scope.list = [];

 var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

    query.descending("createdAt");
    query.limit(25); // limit to at most 10 results

    query.find({
      success: function(results) {

        for( var i = 0; i < results.length; i++ ){

          

            var object = { high: results[i].get("A_HighGoal"), 
     low: results[i].get("fieldRoughterrain") , 
     reachd: results[i].get("A_ReachDefense") ,
     crossd: results[i].get("A_CrossDefense") , ScaledTower: results[i].get("ScaledTower"), valLowBar: results[i].get("lowbar") != null, valPortcullis: results[i].get("fieldPortcullis") != null ,valRoughterrain: results[i].get("fieldRoughterrain") != null,valRockwall: results[i].get("fieldRockwall") != null, valSallyPort: results[i].get("fieldSallyPort") != null, valramparts: results[i].get("fieldramparts") != null, valCheva: results[i].get("fieldMoat")!= null, valCheva: results[i].get("fieldCheva")!= null,valPortcullis: results[i].get("fieldPortcullis")!= null, Team: results[i].get("Team"),  Match: results[i].get("Match"), Low: results[i].get("LowGoal"), High: results[i].get("HighGoal"),  fieldPortcullis: results[i].get("fieldPortcullis"), fieldCheva: results[i].get("fieldCheva"),fieldMoat: results[i].get("fieldMoat"),fieldLowBar: results[i].get("lowbar"), fieldramparts: results[i].get("fieldramparts"), valmoat: results[i].get("fieldMoat") != null, valdrawbridge: results[i].get("fielddrawbridge") != null, fielddrawbridge: results[i].get("fielddrawbridge"),fieldSallyPort: results[i].get("fieldSallyPort"),fieldRockwall: results[i].get("fieldRockwall"),fieldRoughterrain: results[i].get("fieldRoughterrain"),};
           // console.log("JOE CHECK THIS OUT!!!!!!");
            //console.log( object );
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
.controller('TeamList', function($scope, $ionicLoading) {
   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
 $ionicLoading.show({
         template: 'Loading...'
      });
  $scope.controller = false;

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
            query.equalTo( "gse", false ); 

        query.limit( 1000 );

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
      $ionicLoading.hide();


      },
      error: function(error) {
        alert("Error retrieving Team List, Make sure you are on Wifi or 3G");
      }
    });



   $scope.teams = dupe;
        
 } // end of the cunction
   listRetriever();



function filter() {

}



})

//controller shows off each team # in a list
.controller('MatchList', function($scope, $ionicLoading) {

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
 $ionicLoading.show({
         template: 'Loading...'
      });

$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});  
       var teamNumberList = [];


    
var dupe = [];
function listRetriever() { 
    var teamNumberList = [];
    dupe = [];

    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
            query.equalTo( "gse", false ); 

    query.limit( 1000 );
    query.find({
      success: function(results) {
          console.log("We retrieved: " + results.length );
        for( var i = 0; i < results.length; i++ ){
          //console.log( results[i].get("Team"))
            teamNumberList.push( results[i].get("Match") );
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

      $ionicLoading.hide();

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
  console.log("Data Entry Page!")
  $scope.testpls = 69;
  var val = 1;
$scope.data = {};
//$scope.data.teamnumber = 1;
 $scope.calculateQuantity = function() {
     $scope.testpls++;
     console.log("BUTTON PRES!");
  };
  
  
  
  var incriment = 1;
  $scope.lowgoalAutoCount = 0;
  $scope.highgoalAutoCount = 0;
   $scope.upHighA = function() {
     $scope.highgoalAutoCount = $scope.highgoalAutoCount + incriment; 
   }
    $scope.downHighA = function() {
     $scope.highgoalAutoCount = $scope.highgoalAutoCount - incriment;
   }
  
      $scope.setIncri = function(val) {
        console.log(" ")
        console.log(val)
        console.log(" ")
      }
  
  
  

$scope.originalUser = angular.copy($scope.data);

$scope.delay = false;


//wait function 
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function reset()
{
  wait(5000);
  delay = false;
  console.log("Done waiting");
}



  //submit
  $scope.submit = function()
  {
   
    if( $scope.delay == false ) {
      $scope.delay = true
var falseStopper = true;
      if( $scope.data.portcullis  < 0  )
      {
        console.log("uh oh. value is" + $scope.data.portcullis );
        falseStopper = false;
      } else if ( $scope.data.cheval < 0 )
      {
                console.log(" chevaluh oh. value is" + $scope.data.portcullis );

                falseStopper = false;
      } else if ( $scope.data.moat < 0 )
      {
        console.log("rip");
                falseStopper = false;
      } else if ( $scope.data.rampart < 0 )
      {
                console.log("rip");

                falseStopper = false;
      } else if ( $scope.data.drawbridge < 0 )
      {
                console.log("rip");

                falseStopper = false;
      } else if ( $scope.data.roughterrain < 0 )
      {
                console.log("rip");

                falseStopper = false;
      } else if ( $scope.data.lowbar < 0 )
      {
                console.log("rip");

                falseStopper = false;
      }

    if( falseStopper == true && $scope.data.teamnumber != null && $scope.data.matchnumber != null )
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
      gameScore.set("ChallengedTower", $scope.data.challenge);
      gameScore.set("gse", false );
      //gameScore.set("Alliance", color );

      //Autonomous
      gameScore.set("A_ReachDefense", $scope.data.reachd);
      gameScore.set("A_CrossDefense", $scope.data.cdefense);
      gameScore.set("A_LowGoal", $scope.data.lowgoala);
      gameScore.set("A_HighGoal", $scope.data.highgaola);

      
      gameScore.set("fieldPortcullis",$scope.data.portcullis );
      gameScore.set("fieldCheva",$scope.data.cheval );
      gameScore.set("fieldMoat",$scope.data.moat );
      gameScore.set("fieldramparts",$scope.data.rampart );
      gameScore.set("fielddrawbridge",$scope.data.drawbridge );
      gameScore.set("fieldSallyPort",$scope.data.sport );
      gameScore.set("fieldRockwall",$scope.data.rockwall );
      gameScore.set("fieldRoughterrain",$scope.data.roughterrain );
      gameScore.set("lowbar",$scope.data.lowbar );
      gameScore.set("fieldLowBar",$scope.data.lowbar );



      //now how many times they were succesful

      //UPDATE VERSION 2
      //no conger need this
      /*
      gameScore.set("valPortcullis",$scope.data.sportcullis );
      gameScore.set("valCheva",$scope.data.scheval );
      gameScore.set("valMoat",$scope.data.smoat );
      gameScore.set("valramparts",$scope.data.sramparts );
      gameScore.set("valdrawbridge",$scope.data.sdrawbridge );
      gameScore.set("valSallyPort",$scope.data.ssallyport );
      gameScore.set("valRockwall",$scope.data.srockwall );
      gameScore.set("valRoughterrain",$scope.data.srough );
      gameScore.set("valLowBar",$scope.data.slowbar );
    */



  gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    console.log("success")
    alert('Submitted! Keep Scouting! ~ Joe ');
    $scope.delay = false;

    

$scope.$apply(function() { 
   // every changes goes here
   console.log("apply function")
  $scope.data.teamnumber = null;
  $scope.data.matchnumber = null;
  //$scope.data.alliance = null;
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
  $scope.data.lowbar = null;
  $scope.data.reachd = null;
  $scope.data.cdefense = null;
  $scope.data.lowgoala = null;
  $scope.data.highgaola = null;
  $scope.data.challenge = null;



});





  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to submit Data. Make sure you are on Wifi or Cellular Data' );
  }
});


} else
{
  alert('Team Number, Match Number are REQUIRED! Check Defense values, Cant be negative');
}

}//end if delay
 }//end function

teamnumber();

//team number list retrieve
function teamnumber() {

var teamArray = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

    query.limit( 1000 );

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


.controller('scor', function($scope, $ionicLoading) {
 console.log("Stat Controller is on");

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
$ionicLoading.show({
         template: 'Loading...'
      });
towerRank();

function towerRank() {

var teams = [];
var teamList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

    query.limit( 1000 );

query.find({
  success: function(results) {
   for( var i = 0; i < results.length; i++ )
   {
    var teamListObject = { Team: results[i].get("Team") , score: 0,
    lowbar: 0, 
    fieldRoughterrain: 0 , 
    fieldRockwall: 0 ,
    fieldSallyPort: 0, 
    fielddrawbridge: 0 , 
    fieldramparts: 0,
    fieldMoat: 0,
    fieldPortcullis: 0, 
    fieldCheva: 0, 
    match: 0,
    highgoal: 0,
    lowgoal: 0,
    matchAVG: 0, 
    Index: 0};

    var isOnList = false;
    for( var j = 0; j < teamList.length; j++ )
    {
      if( teamList[j].Team == results[i].get("Team") )
      {
        isOnList = true;
      }

    }
    if( isOnList == false )
    {
          teamList.push(  teamListObject );

    }



    var object = { 
     Team: results[i].get("Team") , high: results[i].get("A_HighGoal"), 
     low: results[i].get("A_LowGoal") , 
     reachd: results[i].get("A_ReachDefense") ,
     crossd: results[i].get("A_CrossDefense"), lowbar: results[i].get("lowbar"), 
     fieldRoughterrain: results[i].get("fieldRoughterrain") , 
     fieldRockwall: results[i].get("fieldRockwall") ,
     fieldSallyPort: results[i].get("fieldSallyPort"), 
     fielddrawbridge: results[i].get("fielddrawbridge") , 
     fieldramparts: results[i].get("fieldramparts"),
     fieldMoat: results[i].get("fieldMoat"),
     fieldPortcullis: results[i].get("fieldPortcullis"), 
     fieldCheva: results[i].get("fieldCheva"), lowGoal: results[i].get("LowGoal"),
     highGoal: results[i].get("HighGoal"), scaling: results[i].get("ScaledTower")
      };
   
    teams.push( object );
   }

//console.log("OKAY HERE ARE RESULTS");
//console.log("----------------------");
//console.log( teams );
//console.log( teamList );
//console.log("Results");
for( var k = 0; k < teams.length; k++ )
{

  for( var q = 0; q < teamList.length; q++ )
  {
teams[k].lowbar = teams[k].lowbar || 0;
teams[k].fieldCheva = teams[k].fieldCheva || 0;
teams[k].fieldRoughterrain = teams[k].fieldRoughterrain || 0;
teams[k].fieldRockwall = teams[k].fieldRockwall || 0;
teams[k].fieldSallyPort = teams[k].fieldSallyPort || 0;
teams[k].fielddrawbridge = teams[k].fielddrawbridge || 0;
teams[k].fieldramparts = teams[k].fieldramparts || 0;
teams[k].fieldMoat = teams[k].fieldMoat || 0;
teams[k].fieldPortcullis = teams[k].fieldPortcullis || 0;

var defense = 0;

//var defenseScore = teams[k].fieldRoughterrain + teams[k].fieldRockwall + teams[k].fieldSallyPort + teams[k].fielddrawbridge
//+ teams[k].fieldramparts + teams[k].fieldMoat + teams[k].fieldPortcullis + teams[k].fieldCheva + teams[k].lowbar;
//cross undamaged defense is 5

if( teams[k].fieldRoughterrain > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldRoughterrain;
}

if( teams[k].fieldRockwall > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldRockwall;
}

if( teams[k].fieldSallyPort > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldSallyPort;
}

if( teams[k].fielddrawbridge > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fielddrawbridge;
}

if( teams[k].fieldramparts > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldramparts;
}

if( teams[k].fieldMoat > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldMoat;
}
if( teams[k].fieldPortcullis > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldPortcullis;
}
if( teams[k].fieldCheva > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].fieldCheva;
}
if( teams[k].lowbar > 2 )
{
  defense = defense + 2;

}else {
  defense = defense + teams[k].lowbar;
}




var calculatedD = defense * 5;

var highGoals = teams[k].highGoal * 5;
var lowGoals = teams[k].lowGoal * 2;


    if( teamList[q].Team == teams[k].Team )
    {
      var score = 0;
      if( teams[k].low == true)
      {
        score = score + 5;

      }

      if( teams[k].reachd == true )
      {
        score = score + 2;
      }
       if( teams[k].high == true )
       {
        score = score + 10;
       }  

       if( teams[k].crossd == true )
       {
        score = score + 10;
       }

           var scalePoints = 0;
if( teams[k].scaling == true )
{
  scalePoints = 15;

}
      
       teamList[q].score = teamList[q].score + score + scalePoints + highGoals + lowGoals+ calculatedD;
      teamList[q].match = teamList[q].match + 1;
    } //end team equal checker

  


  }

}
//calculate values
for( var jk = 0; jk < teamList.length; jk++ )
{

//a = a || 0


//a = a || 0;



 

   teamList[jk].matchAVG = teamList[jk].score / teamList[jk].match;
}
        function sortNumber(a,b) {
    return   b.matchAVG - a.matchAVG;
}
teamList.sort( sortNumber );

var index = 1;
for( var kk = 0; kk < teamList.length; kk++ )
{
  teamList[kk].Index = index;
  index++;
}


$scope.list = teamList;
$ionicLoading.hide();

  },
  error: function(error) {
    alert("Error try reloading the root page");
  }
});

};

})


.controller('MatchupControl', function($scope) {
 console.log("Stat Controller is on");
})

.controller('StatControl', function($scope) {
 console.log("Stat Controller is on");
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



.controller('towerrankcontrol', function($scope) {
console.log("tower controller on");
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('TowerRanking', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");

$scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
$ionicLoading.show({
         template: 'Loading...'
      });
towerRank();

function towerRank() {

var teams = [];
var teamList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

    query.limit( 1000 );
query.find({
  success: function(results) {
   for( var i = 0; i < results.length; i++ )
   {
    var teamListObject = { Team: results[i].get("Team") , climbs: 0, total: 0, val: 0, Index: 0};

    var isOnList = false;
    for( var j = 0; j < teamList.length; j++ )
    {
      if( teamList[j].Team == results[i].get("Team") )
      {
        isOnList = true;
      }

    }
    if( isOnList == false )
    {
          teamList.push(  teamListObject );

    }



    var object = { Team: results[i].get("Team"), Tower: results[i].get("ScaledTower") };
    teams.push( object );
   }

//console.log("OKAY HERE ARE RESULTS");
//console.log("----------------------");
//console.log( teams );
//console.log( teamList );
//console.log("Results");
for( var k = 0; k < teams.length; k++ )
{

  for( var q = 0; q < teamList.length; q++ )
  {
    if( teamList[q].Team == teams[k].Team )
    {
      if( teams[k].Tower == true )
      {
        teamList[q].climbs = teamList[q].climbs + 1;
        teamList[q].total = teamList[q].total + 1;

      } else {
                teamList[q].total = teamList[q].total + 1;

      }
      
    }

  }

}
//calculate values
for( var jk = 0; jk < teamList.length; jk++ )
{
  
  teamList[jk].val = teamList[jk].climbs / teamList[jk].total;
}
        function sortNumber(a,b) {
    return   b.val - a.val;
}
teamList.sort( sortNumber );

var index = 1;
for( var kk = 0; kk < teamList.length; kk++ )
{
  teamList[kk].Index = index;
  index++;
}

//console.log( teamList );
$scope.list = teamList;
$ionicLoading.hide();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

};



})



.controller('ScoreRank', function($scope, $ionicLoading) {
$scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

$ionicLoading.show({
         template: 'Loading...'
      });


  console.log("team controller is on");
       var teamNumberList = [];


    
var dupe = [];
function listRetriever() { 
  var dupe = [];

       var teamNumberList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

query.limit(1000);

query.find({
  success: function(results) {
    console.log( results.length );
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      var object = { Index: 0, AverageGoalScore: 0, AverageHighGoal: 0, AverageLowGoal: 0, HighGoal: results[i].get("HighGoal"), LowGoal: results[i].get("LowGoal") , MatchCount: 1, Team: results[i].get("Team")};
      teamNumberList.push( object );
    }


    if( dupe.length <= 0 )
    {
      dupe.push( teamNumberList[0] );
    }

    for( var j = 1; j < teamNumberList.length; j++ )
    {
       console.log( teamNumberList[j] );

       var adder = true;

       for( var q = 0; q < dupe.length; q++ )
       {

          if( teamNumberList[j].Team == dupe[q].Team )
          {
            
            dupe[q].MatchCount = dupe[q].MatchCount + 1;
            dupe[q].HighGoal = dupe[q].HighGoal + teamNumberList[j].HighGoal;
           dupe[q].LowGoal = dupe[q].LowGoal + teamNumberList[j].LowGoal;

            adder = false;

          }
       }

       if( adder == true )
       {
        dupe.push( teamNumberList[j]);
       }

    }
    //lets calculate average low goals and high goals per game
    //high goal = 5;
    //low goal 2
    for( var m = 0; m < dupe.length; m++ )
    {
      var highgoals = dupe[m].HighGoal;
      var lowgoals =  dupe[m].LowGoal;
      var count = dupe[m].MatchCount;
      //mouney_round is just a round function defined below
      dupe[m].AverageHighGoal = money_round(highgoals/count);
      dupe[m].AverageLowGoal = money_round(lowgoals/count);
      var avgscore = ( money_round(highgoals/count) * 5 ) + ( money_round(lowgoals/count) * 2 );

      dupe[m].AverageGoalScore = avgscore;

    }

    //calculte aver goal score 
    //sort
         function sortNumber(a,b) {
    return   b.AverageGoalScore - a.AverageGoalScore;
}
        console.log("HEY")
        console.log("Should be sorted");
        dupe.sort(sortNumber);
        var index = 1;
        for( var g = 0; g < dupe.length; g++ )
        {
          dupe[g].Index = index;
          index = index + 1;
        }

    $scope.teams = dupe;
    //done, finish loading
    $ionicLoading.hide();




  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});




//end list retriever function   
 }
   listRetriever();
   console.log("Retrieve List");
   console.log( teamNumberList );

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}

})

//input 3 bots, show the defenses that they are most likely to be ineffective
.controller('MatchAnalys', function($scope) {

$scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

$ionicLoading.show({
         template: 'Loading...'
      });


  console.log("team controller is on");
       var teamNumberList = [];


    
var dupe = [];
function listRetriever() { 
  var dupe = [];

       var teamNumberList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

query.limit(1000);

query.find({
  success: function(results) {
    console.log( results.length );
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      var object = { Index: 0, AverageGoalScore: 0, AverageHighGoal: 0, AverageLowGoal: 0, HighGoal: results[i].get("HighGoal"), LowGoal: results[i].get("LowGoal") , MatchCount: 1, Team: results[i].get("Team")};
      teamNumberList.push( object );
    }


    if( dupe.length <= 0 )
    {
      dupe.push( teamNumberList[0] );
    }

    for( var j = 1; j < teamNumberList.length; j++ )
    {
       console.log( teamNumberList[j] );

       var adder = true;

       for( var q = 0; q < dupe.length; q++ )
       {

          if( teamNumberList[j].Team == dupe[q].Team )
          {
            
            dupe[q].MatchCount = dupe[q].MatchCount + 1;
            dupe[q].HighGoal = dupe[q].HighGoal + teamNumberList[j].HighGoal;
           dupe[q].LowGoal = dupe[q].LowGoal + teamNumberList[j].LowGoal;

            adder = false;

          }
       }

       if( adder == true )
       {
        dupe.push( teamNumberList[j]);
       }

    }
    //lets calculate average low goals and high goals per game
    //high goal = 5;
    //low goal 2
    for( var m = 0; m < dupe.length; m++ )
    {
      var highgoals = dupe[m].HighGoal;
      var lowgoals =  dupe[m].LowGoal;
      var count = dupe[m].MatchCount;
      //mouney_round is just a round function defined below
      dupe[m].AverageHighGoal = money_round(highgoals/count);
      dupe[m].AverageLowGoal = money_round(lowgoals/count);
      var avgscore = ( money_round(highgoals/count) * 5 ) + ( money_round(lowgoals/count) * 2 );

      dupe[m].AverageGoalScore = avgscore;

    }

    //calculte aver goal score 
    //sort
         function sortNumber(a,b) {
    return   b.AverageGoalScore - a.AverageGoalScore;
}
        console.log("HEY")
        console.log("Should be sorted");
        dupe.sort(sortNumber);
        var index = 1;
        for( var g = 0; g < dupe.length; g++ )
        {
          dupe[g].Index = index;
          index = index + 1;
        }



        for( var t1 = 0; t1 < dupe.length; t1++ )
        {

        }

    $scope.teams = dupe;
    //done, finish loading
    $ionicLoading.hide();




  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});




//end list retriever function   
 }
   listRetriever();
   console.log("Retrieve List");
   console.log( teamNumberList );

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}








})


.controller('AccountCtrl', function($scope, $ionicLoading) {

})

.controller('auto', function($scope, $ionicLoading) {
  console.log("auto");


  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
$ionicLoading.show({
         template: 'Loading...'
      });
towerRank();

function towerRank() {

var teams = [];
var teamList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

query.limit(1000);

query.find({
  success: function(results) {
   for( var i = 0; i < results.length; i++ )
   {
    var teamListObject = { Team: results[i].get("Team") , score: 0,
    match: 0,
    matchAVG: 0, 
    Index: 0};

    var isOnList = false;
    for( var j = 0; j < teamList.length; j++ )
    {
      if( teamList[j].Team == results[i].get("Team") )
      {
        isOnList = true;
      }

    }
    if( isOnList == false )
    {
          teamList.push(  teamListObject );

    }



    var object = { 
     Team: results[i].get("Team") , high: results[i].get("A_HighGoal"), 
     low: results[i].get("A_LowGoal") , 
     reachd: results[i].get("A_ReachDefense") ,
     crossd: results[i].get("A_CrossDefense")
      };
      console.log("object");
      console.log( object );
    teams.push( object );
   }

//console.log("OKAY HERE ARE RESULTS");
//console.log("----------------------");
//console.log( teams );
//console.log( teamList );
//console.log("Results");
for( var k = 0; k < teams.length; k++ )
{

  for( var q = 0; q < teamList.length; q++ )
  {
    if( teamList[q].Team == teams[k].Team )
    {
      var score = 0;
      if( teams[k].low == true)
      {
        score = score + 5;

      }

      if( teams[k].reachd == true )
      {
        score = score + 2;
      }
       if( teams[k].high == true )
       {
        score = score + 10;
       }  

       if( teams[k].crossd == true )
       {
        score = score + 10;
       }
      
       teamList[q].score = teamList[q].score + score;
      teamList[q].match = teamList[q].match + 1;
    } //end team equal checker

  }

}
//calculate values
for( var jk = 0; jk < teamList.length; jk++ )
{

//a = a || 0


//a = a || 0;


console.log("Average calculator");

 

   teamList[jk].matchAVG = teamList[jk].score / teamList[jk].match;
}
        function sortNumber(a,b) {
    return   b.matchAVG - a.matchAVG;
}
teamList.sort( sortNumber );

var index = 1;
for( var kk = 0; kk < teamList.length; kk++ )
{
  teamList[kk].Index = index;
  index++;
}

console.log("this the final list");
console.log( teamList );
$scope.list = teamList;
$ionicLoading.hide();
console.log("yo");

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

};

  
})




.controller('defensetotal', function($scope, $ionicLoading) {
  console.log("Defense Totals");

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
$ionicLoading.show({
         template: 'Loading...'
      });
towerRank();

function towerRank() {

var teams = [];
var teamList = [];
  var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
        query.equalTo( "gse", false ); 

query.limit(1000);
query.find({
  success: function(results) {
   for( var i = 0; i < results.length; i++ )
   {
    var teamListObject = { Team: results[i].get("Team") , 
    lowbar: 0, 
    fieldRoughterrain: 0 , 
    fieldRockwall: 0 ,
    fieldSallyPort: 0, 
    fielddrawbridge: 0 , 
    fieldramparts: 0,
    fieldMoat: 0,
    fieldPortcullis: 0, 
    fieldCheva: 0, 
    totalD: 0,
    match: 0,
    matchAVG: 0, 
    Index: 0};

    var isOnList = false;
    for( var j = 0; j < teamList.length; j++ )
    {
      if( teamList[j].Team == results[i].get("Team") )
      {
        isOnList = true;
      }

    }
    if( isOnList == false )
    {
          teamList.push(  teamListObject );

    }



    var object = { 
     Team: results[i].get("Team") , lowbar: results[i].get("lowbar"), 
     fieldRoughterrain: results[i].get("fieldRoughterrain") , 
     fieldRockwall: results[i].get("fieldRockwall") ,
     fieldSallyPort: results[i].get("fieldSallyPort"), 
     fielddrawbridge: results[i].get("fielddrawbridge") , 
     fieldramparts: results[i].get("fieldramparts"),
     fieldMoat: results[i].get("fieldMoat"),
     fieldPortcullis: results[i].get("fieldPortcullis"), 
     fieldCheva: results[i].get("fieldCheva")
      };

    teams.push( object );
   }

//console.log("OKAY HERE ARE RESULTS");
//console.log("----------------------");
//console.log( teams );
//console.log( teamList );
//console.log("Results");
for( var k = 0; k < teams.length; k++ )
{

  for( var q = 0; q < teamList.length; q++ )
  {
    if( teamList[q].Team == teams[k].Team )
    {
          teamList[q].fieldRoughterrain = teamList[q].fieldRoughterrain + teams[k].fieldRoughterrain;
      teamList[q].fieldRockwall = teamList[q].fieldRockwall + teams[k].fieldRockwall;
      teamList[q].fieldSallyPort = teamList[q].fieldSallyPort + teams[k].fieldSallyPort;
      teamList[q].fielddrawbridge = teamList[q].fielddrawbridge + teams[k].fielddrawbridge;
      teamList[q].fieldramparts = teamList[q].fieldramparts + teams[k].fieldramparts;
      teamList[q].fieldMoat = teamList[q].fieldMoat + teams[k].fieldMoat;
      teamList[q].fieldPortcullis = teamList[q].fieldPortcullis + teams[k].fieldPortcullis;
      teamList[q].fieldCheva = teamList[q].fieldCheva + teams[k].fieldCheva;

      teamList[q].lowbar = teamList[q].lowbar + teams[k].lowbar;
      teamList[q].match = teamList[q].match + 1;
    } //end team equal checker

  }

}
//calculate values
for( var jk = 0; jk < teamList.length; jk++ )
{

//a = a || 0

teamList[jk].lowbar = teamList[jk].lowbar || 0;
teamList[jk].fieldCheva = teamList[jk].fieldCheva || 0;
teamList[jk].fieldRoughterrain = teamList[jk].fieldRoughterrain || 0;
teamList[jk].fieldRockwall = teamList[jk].fieldRockwall || 0;
teamList[jk].fieldSallyPort = teamList[jk].fieldSallyPort || 0;
teamList[jk].fielddrawbridge = teamList[jk].fielddrawbridge || 0;
teamList[jk].fieldramparts = teamList[jk].fieldramparts || 0;
teamList[jk].fieldMoat = teamList[jk].fieldMoat || 0;
teamList[jk].fieldPortcullis = teamList[jk].fieldPortcullis || 0;

//a = a || 0;




 
  teamList[jk].totalD = teamList[jk].lowbar + teamList[jk].fieldCheva 
  + teamList[jk].fieldPortcullis +
   teamList[jk].fieldRoughterrain + 
   teamList[jk].fieldRockwall + 
   teamList[jk].fieldSallyPort + 
   teamList[jk].fielddrawbridge + teamList[jk].fieldramparts + teamList[jk].fieldMoat ;
   teamList[jk].matchAVG = teamList[jk].totalD / teamList[jk].match;
  console.log( "List Total " + teamList[jk].totalD );
}
        function sortNumber(a,b) {
    return   b.matchAVG - a.matchAVG;
}
teamList.sort( sortNumber );

var index = 1;
for( var kk = 0; kk < teamList.length; kk++ )
{
  teamList[kk].Index = index;
  index++;
}

console.log("this the final list");
console.log( teamList );
$scope.list = teamList;
$ionicLoading.hide();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

};


})


.controller('matchupcontrol', function($scope, $ionicLoading, $state, $stateParams, $ionicPlatform) {
//joe come back
console.log("MATCHUP CONTROL");
$scope.joe = "joe";
//TEAM DATA
//$scope.data.r1
//$scope.data.r2
//$scope.data.r3
  $scope.submit = function()
  {
    analyze();
  
  }

function analyze(){
//robots

  var r1 = $scope.r1;
  var r2 = $scope.r2;
  var r3 = $scope.r3;
  if( $scope.r1 == null ) {
    r1 = 0;
  } else if( $scope.r2 == null ){
    r2 = 0;
  } else if( $scope.r3 == null ){
    r3 = 0;
  }


    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
            query.equalTo( "gse", false ); 

    query.limit( 1000 );
    query.find({
      success: function(results) {
        console.log("Amount of results" + results.length);

        //$ionicLoading.hide();
        var r1true = false;
        var r2true = false;
        var r3true = false;
        //Team
        for( var i = 0; i < results.length; i++ )
        {
          if( results[i].get("Team") == r1 )
          {
            r1true = true;

          } else if( results[i].get("Team") == r2 )
          {
            r2true = true;

          } else if( results[i].get("Team") == r3 )
          {
            r3true = true;
            
          }


        } //end for loop

        //COMMON DEFENSE FINDER!
        //defense capablility
        //for each that is true lets find all the defenses that they can do
        /*
      gameScore.set("fieldPortcullis",$scope.data.portcullis );
      gameScore.set("fieldCheva",$scope.data.cheval );
      gameScore.set("fieldMoat",$scope.data.moat );
      gameScore.set("fieldramparts",$scope.data.rampart );
      gameScore.set("fielddrawbridge",$scope.data.drawbridge );
      gameScore.set("fieldSallyPort",$scope.data.sport );
      gameScore.set("fieldRockwall",$scope.data.rockwall );
      gameScore.set("fieldRoughterrain",$scope.data.roughterrain );
      gameScore.set("fieldLowBar",$scope.data.lowbar );
      */
      var fieldPortcullis = false;
      var fieldCheva = false;
      var fieldMoat = false;
      var fieldramparts = false;
      var fielddrawbridge = false;
      var fieldSallyPort = false;
      var fieldRockwall = false;
      var fieldRoughterrain = false;
      var fieldLowBar = false;

      var capableD = [];
      var notCapable = [];

        for( var i = 0; i < results.length; i++ )
        {

          if(r1true) {
            
            if( results[i].get("Team") == r1) {

            }

          }

        }


        console.log("                       ");
        console.log("--Are all of these Verified---");
        console.log( r1true );
        console.log( r2true );
        console.log( r3true );
        console.log("------------");
       
      },
      error: function(error) {
        alert("Error retrieving Scouted Team List, Make sure you are on Wifi or 3G");
      }
    });


}

  

})

.controller('MatchDetailCtrl', function($scope, $ionicLoading, $state, $stateParams, $ionicPlatform) {
   /* 
$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});
*/

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

  console.log("match detailCONTROLLER")
  console.log("LA STORRRRRRY");
  $scope.team = $stateParams.matchID;
  console.log( $scope.team );
  var number = parseInt($scope.team);

  //stats--
  //matches played
  //high goal per match
  //low goal per match
  $ionicLoading.show({
         template: 'Loading...'
      });
  
retriever();
function retriever() {
  $scope.list = [];

 var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.equalTo("Match", number );
            query.equalTo( "gse", false ); 

        query.limit( 1000 );


    query.ascending("createdAt");

    query.find({
      success: function(results) {
        console.log("Amount of results" + results.length);

        for( var i = 0; i < results.length; i++ ){
          /*
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
          */
          //futurejoe ChallengedTower
            var object = { ReachTower: results[i].get("ChallengedTower"), AHighgoal: results[i].get("A_HighGoal"), ALowgoal: results[i].get("A_LowGoal"), CrossD: results[i].get("A_CrossDefense"), ReachD: results[i].get("A_ReachDefense"), ScaledTower: results[i].get("ScaledTower"), valLowBar: results[i].get("lowbar") != null, valPortcullis: results[i].get("fieldPortcullis") != null ,valRoughterrain: results[i].get("fieldRoughterrain") != null,valRockwall: results[i].get("fieldRockwall") != null, valSallyPort: results[i].get("fieldSallyPort") != null, valramparts: results[i].get("fieldramparts") != null, valCheva: results[i].get("fieldMoat")!= null, valCheva: results[i].get("fieldCheva")!= null,valPortcullis: results[i].get("fieldPortcullis")!= null, Team: results[i].get("Team"),  Match: results[i].get("Match"), Low: results[i].get("LowGoal"), High: results[i].get("HighGoal"),  fieldPortcullis: results[i].get("fieldPortcullis"), fieldCheva: results[i].get("fieldCheva"),fieldMoat: results[i].get("fieldMoat"),fieldLowBar: results[i].get("lowbar"), fieldramparts: results[i].get("fieldramparts"), valmoat: results[i].get("fieldMoat") != null, valdrawbridge: results[i].get("fielddrawbridge") != null, fielddrawbridge: results[i].get("fielddrawbridge"),fieldSallyPort: results[i].get("fieldSallyPort"),fieldRockwall: results[i].get("fieldRockwall"),fieldRoughterrain: results[i].get("fieldRoughterrain"),};
            $scope.list.push( object );
        }
             $ionicLoading.hide();

       
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









})
//joeeeeeeeeeeeeeeeeeeeeee
.controller('windham', function($scope, $ionicLoading) {
   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
 $ionicLoading.show({
         template: 'Loading...'
      });
  $scope.controller = false;

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
            query.equalTo( "gse", false ); 

        query.limit( 1000 );

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
      $ionicLoading.hide();


      },
      error: function(error) {
        alert("Error retrieving Team List, Make sure you are on Wifi or 3G");
      }
    });



   $scope.teams = dupe;
        
 } // end of the cunction
   listRetriever();



function filter() {

}



})

//controller shows off each team # in a list
.controller('MatchList', function($scope, $ionicLoading) {

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
 $ionicLoading.show({
         template: 'Loading...'
      });

$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});  
       var teamNumberList = [];


    
var dupe = [];
function listRetriever() { 
    var teamNumberList = [];
    dupe = [];

    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.equalTo( "gse", false ); 
    query.limit( 1000 );
    query.find({
      success: function(results) {
          console.log("We retrieved: " + results.length );
        for( var i = 0; i < results.length; i++ ){
          //console.log( results[i].get("Team"))
            teamNumberList.push( results[i].get("Match") );
            //hoodieallen
            /*
            results[i].set("gse", true );
            results[i].save();
            */
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

      $ionicLoading.hide();

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
.controller('TeamDetailCtrl', function($scope, $state, $ionicLoading, $stateParams, $ionicPlatform) {
   /* 
$scope.$on('$ionicView.afterEnter', function() {
$scope.loadData();
console.log('AFTER ENTER FIRED');
});
*/

  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
 $ionicLoading.show({
         template: 'Loading...'
      });
  $scope.controller = false;

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
        query.equalTo( "gse", false ); 


    query.limit( 1000 );

    query.ascending("createdAt");

    query.find({
      success: function(results) {
        console.log("Amount of results" + results.length);
          //stats
          $scope.matches = 0;
          $scope.challengeTower = 0;
          $scope.towerClimbed = 0;
          $scope.lowgoalScored = 0;
          $scope.highgoalScored = 0;
          $scope.defensepermatch = 0;


        for( var i = 0; i < results.length; i++ ){
          /*
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
          */
          $scope.lowgoalScored = $scope.lowgoalScored + results[i].get("LowGoal");
          $scope.highgoalScored = $scope.highgoalScored + results[i].get("HighGoal");
          $scope.matches++;
          if( results[i].get("ChallengedTower") == true )
          {
            $scope.challengeTower++;
          }
          if( results[i].get("ScaledTower") == true )
          {
            $scope.towerClimbed++
          }

          //$scope.defensepermatch = $scope.defensepermatch + results[i].get("lowbar") + 



            var object = {ReachTower: results[i].get("ChallengedTower"), AHighgoal: results[i].get("A_HighGoal"), ALowgoal: results[i].get("A_LowGoal"), CrossD: results[i].get("A_CrossDefense"), ReachD: results[i].get("A_ReachDefense"),  ScaledTower: results[i].get("ScaledTower"), valLowBar: results[i].get("lowbar") != null, valPortcullis: results[i].get("fieldPortcullis") != null ,valRoughterrain: results[i].get("fieldRoughterrain") != null,valRockwall: results[i].get("fieldRockwall") != null, valSallyPort: results[i].get("fieldSallyPort") != null, valramparts: results[i].get("fieldramparts") != null, valCheva: results[i].get("fieldMoat")!= null, valCheva: results[i].get("fieldCheva")!= null,valPortcullis: results[i].get("fieldPortcullis")!= null, Team: results[i].get("Team"),  Match: results[i].get("Match"), Low: results[i].get("LowGoal"), High: results[i].get("HighGoal"),  fieldPortcullis: results[i].get("fieldPortcullis"), fieldCheva: results[i].get("fieldCheva"),fieldMoat: results[i].get("fieldMoat"),fieldLowBar: results[i].get("lowbar"), fieldramparts: results[i].get("fieldramparts"), valmoat: results[i].get("fieldMoat") != null, valdrawbridge: results[i].get("fielddrawbridge") != null, fielddrawbridge: results[i].get("fielddrawbridge"),fieldSallyPort: results[i].get("fieldSallyPort"),fieldRockwall: results[i].get("fieldRockwall"),fieldRoughterrain: results[i].get("fieldRoughterrain"),};
            $scope.list.push( object );
        }

          $scope.lowavg = $scope.lowgoalScored / $scope.matches;
          $scope.highavg = $scope.highgoalScored / $scope.matches;


             $ionicLoading.hide();

       
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
