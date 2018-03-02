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



      firebase.database().ref('/eventData/gran1/').once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
         teamNumberList.push(childSnapshot.val().teamNumber );

   })



    }).then(function(done){
      teamNumberList.sort();
       // var dupe = []; // new array
        for(var i = 0; i < teamNumberList.length; i++ )
        {

          if( dupe.length <= 0 )
          {
            dupe.push( teamNumberList[i] )
          } else {

            var checker = false;
            for( var j = 0; j < dupe.length; j++ )
            {
              if( dupe[j] == teamNumberList[i] )
              {
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

        dupe.sort(sortNumber);
        $ionicLoading.hide();
        $scope.teams = dupe;

   });


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
});
       var teamNumberList = [];



var dupe = [];
function listRetriever() {
    var teamNumberList = [];
    dupe = [];



  firebase.database().ref('/eventData/gran1/').once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     console.log(childSnapshot.val().teamNumber)
     teamNumberList.push(childSnapshot.val().matchNumber);

   })



    }).then(function(done){
        teamNumberList.sort();
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
     if($scope.highgoalAutoCount < 0){
            $scope.highgoalAutoCount = 0;
     }

   }

   $scope.upLowA = function() {
     $scope.lowgoalAutoCount = $scope.lowgoalAutoCount + incriment;
   }
    $scope.downLowA = function() {
     $scope.lowgoalAutoCount = $scope.lowgoalAutoCount - incriment;
     if($scope.lowgoalAutoCount < 0){
            $scope.lowgoalAutoCount = 0;
     }

   }


     $scope.incriTeli2 = 1;

      $scope.setIncri = function(val) {
            console.log("\n \n \n HEY HEY HEY HEY HEY HEY \n \n")
            if(val == 'one'){
              incriment = 1;
              $scope.incriTeli2 = 1;
            }else if(val == 'five'){
              incriment = 5;
              $scope.incriTeli2 = 5;

            }else if(val == 'ten'){
              incriment = 10;
              $scope.incriTeli2 = 10;

            }else if(val == 'twenty'){
              incriment = 20;
              $scope.incriTeli2 = 20;

            }else{
              incriment = 1;
              $scope.incriTeli2 = 1;

            }
      }

  //telop control... same as above
   var incrimentTELE = 1;
   $scope.incriTeli = 1;
  $scope.setIncriTele = function(val) {
      if(val == 'one'){
        incrimentTELE = 1;
        $scope.incriTeli = 1;
      }else if(val == 'five'){
        incrimentTELE = 5;
        $scope.incriTeli = 5;
      }else if(val == 'ten'){
        incrimentTELE = 10;
        $scope.incriTeli = 10;
      }else if(val == 'twenty'){
        incrimentTELE = 20;
        $scope.incriTeli = 20;
      }else{
        incrimentTELE = 1;
        $scope.incriTeli = 1;

      }
   }

  $scope.lowgoalTeleCount = 0;
  $scope.highgoalTeleCount = 0;

   $scope.upHighT = function() {
     console.log("upHIghT");
     $scope.highgoalTeleCount = $scope.highgoalTeleCount + incrimentTELE;
   }

   $scope.downHighT = function() {
     $scope.highgoalTeleCount = $scope.highgoalTeleCount - incrimentTELE;
     if($scope.highgoalTeleCount < 0){
            $scope.highgoalTeleCount = 0;
     }

   }

   $scope.upLowT = function() {
     $scope.lowgoalTeleCount = $scope.lowgoalTeleCount + incrimentTELE;
   }
    $scope.downLowT = function() {
     $scope.lowgoalTeleCount = $scope.lowgoalTeleCount - incrimentTELE;
     if($scope.lowgoalTeleCount < 0){
            $scope.lowgoalTeleCount = 0;
     }

   }

   $scope.gearCountTele = 0;
   $scope.upGearCount = function() {
     $scope.gearCountTele = $scope.gearCountTele + 1;
   }
    $scope.downGearCount = function() {
     $scope.gearCountTele = $scope.gearCountTele - 1;
     if($scope.gearCountTele < 0){
            $scope.gearCountTele = 0;
     }

   }

   $scope.exchangeCount = 0;
   $scope.upExchange = function() {
     $scope.exchangeCount = $scope.exchangeCount + 1;
   }
    $scope.downExchange = function() {
     $scope.exchangeCount = $scope.exchangeCount - 1;
     if($scope.exchangeCount < 0){
            $scope.exchangeCount = 0;
     }

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
  wait(10);
  delay = false;
             $scope.delay = false

  console.log("Done waiting");
}

$scope.updateAttempClimb = function() {
  console.log("ON CLICK!")
if($scope.data.SuccesfulClimb == true){
  $scope.data.attemptClimb = true;
}
}



  //submit
  $scope.submit = function()
  {
    //data sanitation
    if($scope.data.SuccesfulClimb == true){
      $scope.data.attemptClimb = true;
    }
    //keep all neg values above zero
    //should never happen but just in case
    if($scope.lowgoalAutoCount < 0){
      $scope.lowgoalAutoCount = 0;
    }
    if($scope.highgoalAutoCount < 0){
      $scope.highgoalAutoCount = 0;
    }
    if($scope.lowgoalTeleCount < 0){
      $scope.lowgoalTeleCount = 0;
    }
    if($scope.highgoalTeleCount < 0){
      $scope.highgoalTeleCount = 0;
    }
    if($scope.gearCountTele < 0){
      $scope.gearCountTele = 0;
    }

    if($scope.exchangeCount < 0){
      $scope.exchangeCount = 0;
    }


    if($scope.data.AutoMove == false || $scope.data.AutoMove == undefined){
      $scope.data.AutoMove = false;
    }

    if($scope.data.ScoreGear == false || $scope.data.ScoreGear == undefined){
      $scope.data.ScoreGear = false;
    }

    if($scope.data.attemptClimb == false || $scope.data.attemptClimb == undefined){
      $scope.data.attemptClimb = false;
    }

    if($scope.data.SuccesfulClimb == false || $scope.data.SuccesfulClimb == undefined){
      $scope.data.SuccesfulClimb = false;
    }


    if($scope.data.succClimb == false || $scope.data.succClimb == undefined){
      $scope.data.succClimb = false;
    }

    if($scope.data.aidClimb == false || $scope.data.aidClimb == undefined){
      $scope.data.aidClimb = false;
    }

//highgoalTeleCount
//gearCountTele
    //Create REtrning object
    //gran1 updated statically by joe
    var returnValues = {
      eventID: 'gran1',
      teamNumber: $scope.data.teamnumber,
      matchNumber: $scope.data.matchnumber,
      lowgoalAutoCount: $scope.lowgoalAutoCount,
      highGoalAutoCount: $scope.highgoalAutoCount,
      AutoMove: $scope.data.AutoMove,
      AutoScoreGear: $scope.data.ScoreGear,
      OppSwitch: $scope.gearCountTele,
      Scale: $scope.lowgoalTeleCount,
      exchangeCount: $scope.exchangeCount,
      AliSwitch: $scope.highgoalTeleCount,
      climbAttempt: $scope.data.attemptClimb,
      successClimb: $scope.data.SuccesfulClimb,
      aidClimb: $scope.data.aidClimb,
      succClimb: $scope.data.succClimb

    }
    console.log(" ");
    console.log("GAME SCORE OBJECT")
    console.log(returnValues)
    console.log(" ");
    //$scope.delay = true

    if( $scope.data.teamnumber == undefined ||  $scope.data.teamnumber == 0
    &&  $scope.data.matchnumber == undefined ||  $scope.data.matchnumber == 0
    ){
      alert('Team Number and Match Number is required');
     //$scope.delay = false

    }else{

        var database = firebase.database();
        database.ref('/eventData/' + returnValues.eventID).push(returnValues).then(function(snap){
          console.log("SUCCESFUL SUBMIT!");
        $scope.delay = true
            reset();

           $scope.$apply(function() {
            alert("Succesfully Submitted!")
              // every changes goes here
              console.log("apply function")
            $scope.data.succClimb = null;
            $scope.data.aidClimb = null;
            $scope.lowgoalAutoCount = null;
            $scope.highgoalAutoCount = null;
            $scope.highgoalTeleCount = null;
            $scope.lowgoalTeleCount = null;
            $scope.highgoalTeleCount = null;
            $scope.data.AutoMove = null;
            $scope.data.teamnumber = null;
            $scope.data.matchnumber = null;
            $scope.lowgoalAutoCount = null;
            $scope.highgoalAutoCount = null;
            $scope.data.attemptClimb = null;
            $scope.data.SuccesfulClimb = null;
            $scope.data.ScoreGear = null;
            $scope.incriTeli2 = null;
            $scope.incriTeli = null;
            $scope.gearCountTele = null;
            $scope.exchangeCount = null;
           });

          //Succesful Supbut
        }, function(error) {
          // The callback failed.
              alert('Failed to submit Data. Make sure you are on Wifi or Cellular Data' );
              console.error(error);
            $scope.delay = true
            reset();
           // reset();


        });
    }

  /*
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







} else
{
  alert('Team Number, Match Number are REQUIRED! Check Defense values, Cant be negative');
}

}//end if delay
*/
 }//end function

teamnumber();

//team number list retrieve
function teamnumber() {

$scope.data.teamlist = [];
var teamArray = [];
firebase.database().ref('/eventData/gran1/').once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     console.log(childSnapshot.val().teamNumber)
     $scope.data.teamlist.push(childSnapshot.val().teamNumber);

   })



}).then(function(done){

});



}; //end teamnumber




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


.controller('ClimbRanking', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        climbAttempt: childSnapshot.val().climbAttempt,
       successClimb: childSnapshot.val().successClimb };
      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})




}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      attempt: 0,
      success: 0,
      matches: 0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
          countUp[j].matches++;

        if(teams[i].climbAttempt == true){
          countUp[j].attempt++;
        }

        if(teams[i].successClimb == true){
          countUp[j].success++;
        }




      }


    } //end inner for loop


  } //end first for loop

  console.log(" \n \n \n")
  console.log("LOOK HERE: ")
  console.log(countUp)
  console.log(" \n \n \n")


  for(var i = 0; i < countUp.length; i++){
    console.log("\n")
    console.log(countUp)
    if(isNaN(countUp[i].success) || countUp[i].success == null || countUp[i].success == Infinity  ){
      countUp[i].success = 0;
    }
    if(isNaN(countUp[i].attempt) || countUp[i].attempt == null || countUp[i].attempt == Infinity ){
      countUp[i].attempt = 0;
    }

    countUp[i].val = countUp[i].attempt / countUp[i].success
    if(isNaN(countUp[i].val) || countUp[i].val == null || countUp[i].val == Infinity){
      countUp[i].val = 0;
    }
  }


function sortNumber(a,b) {
    return   b.success - a.success;
}
countUp.sort( sortNumber );


  $scope.list = countUp;
$ionicLoading.hide();


}) //end then function


}





})




.controller('TowerRanking', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        climbAttempt: childSnapshot.val().climbAttempt,
       successClimb: childSnapshot.val().successClimb };
      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      attempt: 0,
      success: 0,
      matches: 0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matches++;
        if(teams[i].climbAttempt == true){
          countUp[j].attempt++;
        }

        if(teams[i].successClimb == true){
          countUp[j].success++;
        }

      if(countUp[i].val == NaN){
          countUp[i].val = 0;
        }


      }


    } //end inner for loop


  } //end first for loop

  console.log(" \n \n \n")
  console.log("LOOK HERE: ")
  console.log(countUp)
  console.log(" \n \n \n")


  for(var i = 0; i < countUp.length; i++){
    if(isNaN(countUp[i].success) || countUp[i].success == null || countUp[i].success == Infinity){
      countUp[i].success = 0;
    }
    if(isNaN(countUp[i].attempt) || countUp[i].attempt == null || countUp[i].attempt == Infinity){
      countUp[i].attempt = 0;
    }

    countUp[i].val = countUp[i].attempt / countUp[i].success
    if(isNaN(countUp[i].val) || countUp[i].val == null || countUp[i].val == Infinity){
      countUp[i].val = 0;
    }
  }


function sortNumber(a,b) {
    return   b.val - a.val;
}
countUp.sort( sortNumber );


  $scope.list = countUp;
$ionicLoading.hide();


}) //end then function


}





})




.controller('defensetotal', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        gearCount: childSnapshot.val().gearCountTele,
       };
      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      Gears: 0,
      matches: 0,
      perMatch:0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matches++;
        var count = teams[i].gearCount;
        console.log(" gear count is " + count)
        if(isNaN(count) || count == Infinity || count == null || count == undefined){
          count = 0;
        }

        countUp[j].Gears = countUp[j].Gears + count;





      }


    } //end inner for loop


  } //end first for loop

  console.log(" \n \n \n")
  console.log("LOOK HERE: ")
  console.log(countUp)
  console.log(" \n \n \n")


  for(var i = 0; i < countUp.length; i++){
    countUp[i].perMatch = countUp[i].Gears / countUp[i].matches;

    if(isNaN(countUp[i].perMatch) || countUp[i].perMatch == Infinity || countUp[i].perMatch == null ){
          countUp[i].perMatch = 0;
    }

  }


function sortNumber(a,b) {
    return   b.perMatch - a.perMatch;
}
countUp.sort( sortNumber );
var index = 1;
for(var i = 0; i < countUp.length; i++){
  countUp[i].Index = index;
  index++;
}

  $scope.list = countUp;
$ionicLoading.hide();


}) //end then function


}





})


.controller('auto22', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        gearCount: childSnapshot.val().gearCountTele,
       };
      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      Gears: 0,
      matches: 0,
      perMatch:0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matches++;
        var count = teams[i].gearCount;
        console.log(" gear count is " + count)
        if(isNaN(count) || count == Infinity || count == null || count == undefined){
          count = 0;
        }

        countUp[j].Gears = countUp[j].Gears + count;





      }


    } //end inner for loop


  } //end first for loop

  console.log(" \n \n \n")
  console.log("LOOK HERE: ")
  console.log(countUp)
  console.log(" \n \n \n")


  for(var i = 0; i < countUp.length; i++){
    countUp[i].perMatch = countUp[i].Gears / countUp[i].matches;

    if(isNaN(countUp[i].perMatch) || countUp[i].perMatch == Infinity || countUp[i].perMatch == null ){
          countUp[i].perMatch = 0;
    }

  }


function sortNumber(a,b) {
    return   b.Gears - a.Gears;
}
countUp.sort( sortNumber );
var index = 1;
for(var i = 0; i < countUp.length; i++){
  countUp[i].Index = index;
  index++;
}

  $scope.list = countUp;
$ionicLoading.hide();


}) //end then function


}





})


.controller('auto', function($scope, $stateParams, $ionicLoading ) {
console.log(" Tower Rank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        AutoScoreGear: childSnapshot.val().AutoScoreGear,
       };
      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      GearsAuto: 0,
      matches: 0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matches++;
        if(teams[i].AutoScoreGear == true){
          countUp[j].GearsAuto++;
        }



      }


    } //end inner for loop


  } //end first for loop

  console.log(" \n \n \n")
  console.log("LOOK HERE: ")
  console.log(countUp)
  console.log(" \n \n \n")


  for(var i = 0; i < countUp.length; i++){
    if(isNaN(countUp[i].GearsAuto) || countUp[i].GearsAuto == null || countUp[i].GearsAuto == Infinity){
      countUp[i].GearsAuto = 0;
    }



  }


function sortNumber(a,b) {
    return   b.GearsAuto - a.GearsAuto;
}
countUp.sort( sortNumber );
var index = 1;
for(var i = 0; i < countUp.length; i++){
  countUp[i].Index = index;
  index++;
}

  $scope.list = countUp;
$ionicLoading.hide();


}) //end then function


}





})



/*
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
*/
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
.controller('ScoreRank', function($scope, $stateParams, $ionicLoading ) {
console.log(" ScoreRank");


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



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
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        climbAttempt: childSnapshot.val().climbAttempt,
       successClimb: childSnapshot.val().successClimb,
       highGoalAutoCount: childSnapshot.val().highGoalAutoCount,
       highgoalCount: childSnapshot.val().highgoalCount,
       lowgoalAutoCount: childSnapshot.val().lowgoalAutoCount,
       lowgoalCount: childSnapshot.val().lowgoalCount

       };

      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      matchCount: 0,
      high: 0,
      highA: 0,
      low: 0,
      lowA: 0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matchCount++;

        countUp[j].high = countUp[j].high + teams[i].highgoalCount
        countUp[j].highA = countUp[j].highA + teams[i].highGoalAutoCount
        countUp[j].low = countUp[j].low + teams[i].lowgoalCount
        countUp[j].lowA = countUp[j].lowA + teams[i].lowgoalAutoCount

        if(countUp[j].lowA == NaN || countUp[j].lowA == null ){
          countUp[j].lowA = 0;
        }

        if(countUp[j].highA == NaN || countUp[j].highA == null ){
          countUp[j].highA = 0;
        }

        if(countUp[j].high == NaN || countUp[j].high == null ){
          countUp[j].high = 0;
        }

        if(countUp[j].highA == NaN || countUp[j].highA == null ){
          countUp[j].highA = 0;
        }





      } //end big if loop


    } //end inner for loop


  } //end first for loop

  //do calculations
  for(var i = 0; i < countUp.length; i++ ){
    var matchCount = countUp[i].matchCount;
    countUp[i].AverageHighGoal = countUp[i].high / matchCount;
    countUp[i].AverageLowGoal = countUp[i].low / matchCount;
    countUp[i].AverageLowGoalA = countUp[i].lowA / matchCount;
    countUp[i].AverageHighGoalA = countUp[i].highA / matchCount;

    if(isNaN(countUp[i].AverageHighGoal) || countUp[i].AverageHighGoal == null || countUp[i].AverageHighGoal == Infinity){
      countUp[i].AverageHighGoal = 0;
    }

    if(isNaN(countUp[i].AverageLowGoal) || countUp[i].AverageLowGoal == null || countUp[i].AverageLowGoal == Infinity){
      countUp[i].AverageLowGoal = 0;
    }

    if(isNaN(countUp[i].AverageLowGoalA) || countUp[i].AverageLowGoalA == null || countUp[i].AverageLowGoalA == Infinity){
      countUp[i].AverageLowGoalA = 0;
    }

    if(isNaN(countUp[i].AverageHighGoalA) || countUp[i].AverageHighGoalA == null || countUp[i].AverageHighGoalA == Infinity){
      countUp[i].AverageHighGoalA = 0;
    }


    countUp[i].AutoGoalPoints = countUp[i].AverageHighGoalA + countUp[i].AverageLowGoalA/3;
    if(isNaN(countUp[i].AutoGoalPoints) || countUp[i].AutoGoalPoints == null || countUp[i].AutoGoalPoints == Infinity){
      countUp[i].AutoGoalPoints = 0;
    }


    countUp[i].AverageTeleGoalPoints = countUp[i].AverageHighGoal/3 + countUp[i].AverageLowGoal/9;
    if(isNaN(countUp[i].AverageTeleGoalPoints) || countUp[i].AverageTeleGoalPoints == null || countUp[i].AverageTeleGoalPoints == Infinity){
      countUp[i].AverageTeleGoalPoints = 0;
    }
    countUp[i].TotalPoints = countUp[i].AutoGoalPoints + countUp[i].AverageTeleGoalPoints;
     if(isNaN(countUp[i].TotalPoints) || countUp[i].TotalPoints == null || countUp[i].TotalPoints == Infinity){
      countUp[i].TotalPoints = 0;
    }
    //high goal auto = 1
    //low goal auto for every 3 = 1

    //high goal 3 = 1
    //low goal 9 = 1



  }

   function sortNumber(a,b) {
    return   b.TotalPoints - a.TotalPoints;
    }
        console.log("HEY")
        console.log("Should be sorted");
        countUp.sort(sortNumber);

        var indexCount = 0;

  for(var i = 0; i < countUp.length; i++ ){
    indexCount++;
    countUp[i].Index = indexCount;

}



/*
function sortNumber(a,b) {
    return   b.val - a.val;
}
countUp.sort( sortNumber );
*/

  $scope.teams = countUp;
$ionicLoading.hide();


}) //end then function


}





})

/*
controller('defensetotal', function($scope, $stateParams, $ionicLoading ) {
console.log(" defensetotal");
.

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
             });
   }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};



$scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };      $ionicLoading.hide();
   };
$ionicLoading.show({
         template: 'Loading...'
      towerRank();

function towerRank() {

var teams = [];
var teamList = [];
var countUp = [];
var teamNumbers = [];

var ref123 = firebase.database().ref('/eventData/gran1/');
ref123.once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
var teamListObject = { Team: childSnapshot.val().teamNumber ,
        climbAttempt: childSnapshot.val().climbAttempt,
       successClimb: childSnapshot.val().successClimb,
       highGoalAutoCount: childSnapshot.val().highGoalAutoCount,
       highgoalCount: childSnapshot.val().highgoalCount,
       lowgoalAutoCount: childSnapshot.val().lowgoalAutoCount,
       lowgoalCount: childSnapshot.val().lowgoalCount,
       gear: childSnapshot.val().gearCountTele

       };

      teams.push(teamListObject);

   var trufa = contains.call(teamNumbers, childSnapshot.val().teamNumber ); // true
      if(trufa == true){
        //already on dont add
      }else{
        teamNumbers.push(childSnapshot.val().teamNumber);
      }

})



}).then(function(done){

  //setup count up
  for(var ii = 0; ii < teamNumbers.length; ii++ ){
    var ob23 = {
      Team: teamNumbers[ii],
      matchCount: 0,
      high: 0,
      highA: 0,
      low: 0,
      lowA: 0
     }
     countUp.push(ob23)
  }




  for(var i = 0; i < teams.length; i++){
    var found = false;
    for(var j = 0; j < countUp.length; j++ ){

      if(countUp[j].Team == teams[i].Team){
        countUp[j].matchCount++;

        countUp[j].high = countUp[j].high + teams[i].highgoalCount
        countUp[j].highA = countUp[j].highA + teams[i].highGoalAutoCount
        countUp[j].low = countUp[j].low + teams[i].lowgoalCount
        countUp[j].lowA = countUp[j].lowA + teams[i].lowgoalAutoCount
      if(countUp[j].high == NaN || countUp[j].high == null ){
          countUp[j].high = 0;
        }

        if(countUp[j].highA == NaN || countUp[j].highA == null ){
          countUp[j].highA = 0;
        }

        if(countUp[j].highA == NaNaN){
      countUp[i].AverageLowGoal = 0;
    }

    if(countUp[i].AverageLowGoalA == NaN){
      countUp[i].AverageLowGoalA = 0;
    }

    if(countUp[i].AverageHighGoalA == NaN){
      countUp[i].AverageHighGoalA = 0;
    }


    countUp[i].AutoGoalPoints = countUp[i].AverageHighGoalA + countUp[i].AverageLowGoalA/3;
    if(countUp[i].AutoGoalPoints == NaN){
      countUp[i].AutoGoalPoints = 0;
    }


    countUp[i].AverageTeleGoalPoints = countUp[i].AverageHighGoal/3 + countUp[i].AverageLowGoal/9;
    if(countUp[i].AverageTeleGoalPoints == NaN){
      countUp[i].AverageTeleGoalPoints = 0;
    }
    countUp[i].TotalPoints = countUp[i].AutoGoalPoints + countUp[i].AverageTeleGoalPoints;
     if(countUp[i].TotalPoints == NaN){
      countUp[i].TotalPoints = 0;
    }

    //high goal auto = 1
    //low goal auto for every 3 = 1

    //high goal 3 = 1
    //low goal 9 = 1



    countUp[i].Index = indexCount;
  }



/*
function sortNumber(a,b) {
    return   b.val - a.val;
}
countUp.sort( sortNumber );
*/














.controller('AccountCtrl', function($scope, $ionicLoading) {

})
/*
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
*/


/*
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

*/
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


  $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

  $scope.team = $stateParams.matchID;
  console.log( $scope.team );
  var number = parseInt($scope.team);



  /*
  firebase.database().ref('/eventData/gran1/').once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     */

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
var results = [];

var ref12 = firebase.database().ref('/eventData/gran1/');
console.log(" GO GO GO GO GO ")
ref12.orderByChild("matchNumber").equalTo(number).once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     //console.log(childSnapshot.val().teamNumber)
     //$scope.data.teamlist.push(childSnapshot.val().teamNumber);
     results.push(childSnapshot.val());
     console.log(childSnapshot.val())
     console.log("BIG CAT!")
   })



}).then(function(done){
  console.log("^^^^^^^^^^^^^^^^^^^^^")
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
          var autoGear = 0;
          if(results[i].AutoScoreGear == true){
            autoGear = 1;
          }

          //futurejoe ChallengedTower
            var object = { Team: results[i].teamNumber,
              Match: results[i].matchNumber,
              Low: results[i].lowgoalCount,
              High: results[i].highgoalCount,
              HighAuto: results[i].highGoalAutoCount,
              LowAuto: results[i].lowgoalAutoCount,
              AutoMove: results[i].AutoMove,
              AutoScoreGear: autoGear,
              climbAttempt: results[i].climbAttempt,
              successClimb: results[i].successClimb,
              gearCountTele: results[i].gearCountTele,
              exchangeCount: results[i].exchangeCount,
              highgoalTeleCount: results[i].highgoalTeleCount,

              AliSwitchCube: results[i].AliSwitch,
              OppSwitchcube: results[i].OppSwitch,
              ScaleCube: results[i].Scale,
              exc: results[i].exchangeCount,
              autoswitch: results[i].highGoalAutoCount,
              autoscale: results[i].lowgoalAutoCount,
              CrossAutoLine: results[i].AutoMove,
              aidClimb: results[i].aidClimb,
              succClimb: results[i].succClimb



            };
            $scope.list.push( object );
        }
             $ionicLoading.hide();
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


    firebase.database().ref('/eventData/gran1/').once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     console.log(childSnapshot.val().teamNumber)
     teamNumberList.push(childSnapshot.val().matchNumber);
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
        dupe.sort(sortNumber);
        console.log( dupe );

      $ionicLoading.hide();

   })

}).then(function(done){
      $scope.teams = dupe;
});


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


  function retriever() {
  $scope.list = [];
var results = [];

var ref12 = firebase.database().ref('/eventData/gran1/');
console.log(" GO GO GO GO GO ")
ref12.orderByChild("teamNumber").equalTo(number).once('value').then(function(snapshot) {

   snapshot.forEach(function(childSnapshot) {
     //console.log(childSnapshot.val().teamNumber)
     //$scope.data.teamlist.push(childSnapshot.val().teamNumber);
     results.push(childSnapshot.val());
   })



}).then(function(done){
  console.log("^^^^^^^^^^^^^^^^^^^^^")
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
          var autoGear = 0;
          if(results[i].AutoScoreGear == true){
            autoGear = 1;
          }


          //futurejoe ChallengedTower
          var object = { Team: results[i].teamNumber,
            Match: results[i].matchNumber,
            Low: results[i].lowgoalCount,
            High: results[i].highgoalCount,
            HighAuto: results[i].highGoalAutoCount,
            LowAuto: results[i].lowgoalAutoCount,
            AutoMove: results[i].AutoMove,
            AutoScoreGear: autoGear,
            climbAttempt: results[i].climbAttempt,
            successClimb: results[i].successClimb,
            gearCountTele: results[i].gearCountTele,
            exchangeCount: results[i].exchangeCount,
            highgoalTeleCount: results[i].highgoalTeleCount,

            AliSwitchCube: results[i].AliSwitch,
            OppSwitchcube: results[i].OppSwitch,
            ScaleCube: results[i].Scale,
            exc: results[i].exchangeCount,
            autoswitch: results[i].highGoalAutoCount,
            autoscale: results[i].lowgoalAutoCount,
            CrossAutoLine: results[i].AutoMove,
            aidClimb: results[i].aidClimb,
            succClimb: results[i].succClimb



          };
            $scope.list.push( object );
        }
             $ionicLoading.hide();
});


};

retriever();







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
