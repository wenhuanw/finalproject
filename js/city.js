'use strict';

var myApp = angular.module('CityApp', ['ui.router']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'MapCtrl'
        })

    $urlRouterProvider.otherwise('/home');
}]);

myApp.controller('MapCtrl', ['$scope', '$http', function($scope, $http) {
    // URL of our API
    var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?";

    $scope.load = function() {
    var map = drawMap();


	    function drawMap() {
	        map = L.map('map').setView([47.6553, -122.3035], 13);
	        var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	        layer.addTo(map);
	        return map;
	    }

	    console.log("Map Drawn");
	    var json;

	    var arr = [];
	    $http.get(url).then(function(response) {
	        var data = response.data;
	        $scope.data = data;
	        json = $scope.data.data;
	        //console.log(json[0]);
	        for (var i = 0; i < json.length; i++) {
	            arr.push({
	                id: json[i][8],
	                offense_number: json[i][9],
	                offense: json[i][12],
	                street: json[i][16],
	                incident_time: json[i][15],
	                latitude: json[i][21],
	                longitude: json[i][20]
	            });
	        }
	        console.log(arr);

	        // arr represents our data

	        customBuild(arr);

	        function customBuild(arr) {
	            var assault = new L.LayerGroup([]);
	            var hazard = new L.LayerGroup([]);
	            var burglary = new L.LayerGroup([]);
	            var noise = new L.LayerGroup([]);
	            var theft = new L.LayerGroup([]);
	            var suspicious_person = new L.LayerGroup([]);
	            var liquor_violation = new L.LayerGroup([]);
	            var robbery = new L.LayerGroup([]);
	            var traffic = new L.LayerGroup([]);
	            var other = new L.LayerGroup([]);
	            var allLayers = [assault, hazard, burglary, noise, theft, suspicious_person, liquor_violation, robbery, traffic, other];
	            for (var i = 0; i < arr.length; i++) {
	                var curr = arr[i];
	                var lat = curr["latitude"];
	                var lng = curr["longitude"];
	                var street = curr["street"];
	                var time = curr["incident_time"];
	                var offense_number = curr["offense_number"];
	                var offense = curr["offense"];

	                var circle = new L.circleMarker([lat, lng], {
	                    color: 'red'
	                })
	                if (offense.includes("ASSAULT")) {
	                    circle.addTo(assault);
	                } else if (offense.includes("HAZARDS")) {
	                    circle.addTo(hazard);
	                } else if (offense.includes("BURGLARY")) {
	                    circle.addTo(burglary);
	                } else if (offense.includes("NOISE")) {
	                    circle.addTo(noise);
	                } else if (offense.includes("THEFT")) {
	                    circle.addTo(theft);
	                } else if (offense.includes("SUSPICIOUS")) {
	                    circle.addTo(suspicious_person);
	                } else if (offense.includes("LIQUOR")) {
	                    circle.addTo(liquor_violation);
	                } else if (offense.includes("ROBBERY")) {
	                    circle.addTo(robbery);
	                } else if (offense.includes("TRAFFIC")) {
	                    circle.addTo(traffic);
	                } else {
	                    circle.addTo(other);
	                }
	                circle.bindPopup(offense + " at " + street + " at " + time);
	            }

	            for (var i = 0; i < allLayers.length; i++) {
	                map.addLayer(allLayers[i]);
	            }

	            L.control.layers(null, {
	                "Assualt": assault,
	                "Hazard": hazard,
	                "Burglary": burglary,
	                "Noise": noise,
	                "Theft": theft,
	                "Suspicious Person": suspicious_person,
	                "Liquor Violation": liquor_violation,
	                "Robbery": robbery,
	                "Traffic": traffic,
	                "Other": other
	            }).addTo(map);
	        }
	    });
    }
}]);