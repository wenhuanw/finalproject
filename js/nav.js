'use strict'
var nav = angular.module('navApp',[]);
nav.controller('myNav',['$scope', '$window', '$location', function($scope, $window, $location){
    //initalizes the page specific nav bar on load
    /*
    var initNav = function(){
        //creates a list of that we will be navigating
        $scope.navList = [{name:"Home", link:"home"}, {name:"Crime Level", link:"crimelevel"}, {name:"Recent Crime", link:"list"}, {name:"Safety Tips", link:"safetytips"}];
        $scope.navContent = {};
        console.log($scope.navList);
        var removeIndex = 0;
        if(window.location.href.indexOf("#/home") != -1)
            removeIndex = 0;
        else if(window.location.href.indexOf("#/home/crimelevel"))
            removeIndex = 1;
        else if(window.location.href.indexOf("#/list"))
            removeIndex = 2;
        else if(window.location.href.indexOf("#/home/safetytips"))
            removeIndex = 3;
        $scope.navList.splice(removeIndex, 1);
        $scope.navContent.first = $scope.navList[0].name;
        $scope.navContent.second = $scope.navList[1].name;
        $scope.navContent.third = $scope.navList[2].name;
        $scope.navContent.firstL = $scope.navList[0].link;
        $scope.navContent.secondL = $scope.navList[1].link;
        $scope.navContent.thirdL = $scope.navList[2].link;
    }
    initNav();*/

    $scope.isActive = function (viewLocation) { 
        return !(viewLocation === $location.path());
    };
}]);