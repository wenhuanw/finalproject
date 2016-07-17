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

myApp.controller('MapCtrl', ['$scope', '$http', function($scope, $http){
	// URL of our API
	var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?";

	var drawMap = function() {
		map = L.map('map').setView([35, -100], 5);
		var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
		layer.addTo(map);
	}

	console.log("Map Drawn");
	var json;

	var arr = [];
	$http.get(url).then(function(response){
		var data = response.data;
		$scope.data = data;
		json = $scope.data.data;
		//console.log(json[0]);
		for(var i = 0; i < json.length; i++) {
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
		//console.log(arr);

		// arr represents our data

		function customBuild(arr) {
			var fight = new L.LayerGroup([]);
			var hazard = new L.LayerGroup([]);
			var burglary = new L.LayerGroup([]);
			var noise = new L.LayerGroup([]);
			var car_theft = new L.LayerGroup([]);
			var suspicious_person = new L.LayerGroup([]);
			var liquor_violation = new L.LayerGroup([]);
			var robbery = new L.LayerGroup([]);
			var traffic = new L.LayerGroup([]);
			var other = new L.LayerGroup([]);
			var allLayers = [fight, hazard, burglary, noise, car_theft, suspicious_person, liquor_violation, robbery, traffic, other];

		}
	});
}]);