'use strict'
var nav = angular.module('CityApp',[]);
nav.controller('myNav',['$scope', '$window', '$location', function($scope, $window, $location){
    //creates a list of that we will be navigating
    var initNav = function(){
        $scope.navList = ["Home", "Crime Level", "Recent Crime", "Safety Tips"];
        var currentUrl = $location.url();
        var removeIndex = 0;
        if(window.location.href.indexOf("#/home") != -1)
            removeIndex = 0;
        else if(window.location.href.indexOf("#/home/crimelevel"))
            removeIndex = 1;
        else if(window.location.href.indexOf("#/home/recentcrime"))
            removeIndex = 2;
        else if(window.location.href.indexOf("#/home/safetytips"))
            removeIndex = 3;
        $scope.navList.splice(index, 1);
        $scope.navContent.first = $scope.navList[0];
        $scope.navContent.second = $scope.navList[1];
        $scope.navContent.third = $scope.navList[2];
    }
    
    var makeLink = function(content){
      var str = content.replace(/\s+/g, '');
      return str.toLowerCase();
    }
    initNav();
}]);