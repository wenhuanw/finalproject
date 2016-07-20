'use strict';

var myApp = angular.module('CityApp', ['ui.router']);


myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'mapCtrl'
        })
		.state('alert', {
            url: '/alert',
            templateUrl: 'partials/alert.html',
            controller: 'AlertCtrl'
        })
		.state('list', {
			url: '/list',
			templateUrl: 'partials/list.html',
			controller: 'ListCtrl'
		})
		.state('tips', {
			url: '/safety_tips',
			templateUrl: 'partials/tips.html'
		})
		.state('statistics', {
			url: '/statistics',
			templateUrl: 'partials/statistics.html',
			controller: 'StatCtrl'
		})
		.state('danger', {
			url: '/danger',
			templateUrl: 'partials/danger.html',
			controller: 'commonCtrl'
		})

    $urlRouterProvider.otherwise('/home');
}]);

myApp.controller('mapCtrl', ['$scope', '$http', function ($scope, $http) {

    var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?";

    $scope.load = function () {
		var map = drawMap();


		function drawMap() {
			map = L.map('map').setView([47.6553, -122.3035], 13);
			var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
			layer.addTo(map);
			return map;
		}

<<<<<<< HEAD
		////console.log("Map Drawn");
		var json;
=======
		console.log("Map Drawn");
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389

		var json;
		var arr = [];
		$http.get(url).then(function (response) {
			var data = response.data;
			$scope.data = data;
			json = $scope.data.data;
			////console.log(json[0]);
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
			//console.log(arr);
<<<<<<< HEAD
=======

>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389

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

myApp.controller('AlertCtrl', ['$scope', '$http', '$window', '$interval', function ($scope, $http, $window, $interval) {
	/*
	$interval(function () {
        $window.location.reload();
    }, 30000);
    */

	// old API
	var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?";

	// function to get the hour of the crime 
	$scope.getHour = function (s) {
<<<<<<< HEAD
		////console.log("time is: " +s);
		var sHour = s.slice(s.length - 8, s.length - 6);
		////console.log("sHour is: " +sHour);
=======
		//console.log("time is: " +s);
		var sHour = s.substr(s.length - 12, 2);
		//console.log("sHour is: " +sHour);
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389
		var incidentHour = parseInt(sHour);
		return incidentHour;

	}

	// function to get the date of the crime
	$scope.getDay = function (s) {
<<<<<<< HEAD
		////console.log("time is: "+s);
		var sDay = s.slice(s.length - 11, s.length - 9);
		////console.log("day is: " + sDay);
=======
		//console.log("time is: "+s);
		var sDay = s.substr(s.length - 15, 2);
		//console.log("day is: " + sDay);
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389
		var incidentDay = parseInt(sDay);
		return incidentDay;
	}

    // function to get the minute of the crime
	$scope.getMinuete = function (s) {
		//console.log(s);
		var sMinuete = s.substr(s.length - 9, 2);
		//console.log(sMinuete);
		var incidentMinuete = parseInt(sMinuete);
		//console.log(incidentMinuete);
		return incidentMinuete;
	}

	// helper function to transform date
	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}



	// create crime map within 20 minutes before
	$scope.loadRecent = function () {
<<<<<<< HEAD
		//$scope.lcontrol = {};
		//console.log($scope.map.removeLayer($scope.lcontrol));
		$scope.map.removeLayer($scope.lcontrol);
=======
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389

		// get the current time with the same format of the crime's time
		$scope.getTimeNow = function () {
			var d = new Date();
			$scope.month = addZero(d.getMonth() + 1);
			$scope.day = addZero(d.getDate());
			$scope.hour = addZero(d.getHours());
			$scope.minuete = addZero(d.getMinutes());
			$scope.second = addZero(d.getSeconds());
			$scope.millionSecond = d.getMilliseconds();
			var result = "2016-" + $scope.month + "-" + $scope.day + "T" + $scope.hour + ":" + $scope.minuete + ":" + $scope.second + "." + $scope.millionSecond;
			//console.log(result);
			return result;

		}

		// function to get the day when going back 20 minuetes
		$scope.getbackDay = function () {
			// if we need to go back a day
			if ($scope.hour == 0 && $scope.minuete < 20) {
				// if we go back from the first day of a month
				if ($scope.day - 1 == 0) {
					if ($scope.mongth == 1 || $scope.mongth == 4 || $scope.mongth == 6 || $scope.mongth == 8 || $scope.mongth == 9 || $scope.mongth == 11) {
						return 31;
					} else if ($scope.mongth == 3) {
						// leap year for going back to Feb
						if (((year % 100 != 0) && (year % 4 == 0)) || (year % 400 == 0)) {
							return 29;
						} else {
							return 28;
						}
					} else {
						return 30;
					}
					// if we still stay in the same month
				} else {
					return $scope.day - 1;
				}
				// if we don't need to go back a day
			} else {
				return $scope.day;
			}
		}

		// function to get the hour when going back 20 minutes
		$scope.getbackHour = function () {
			if ($scope.minuete < 20) {
				return $scope.hour - 1 < 0 ? 23 : $scope.hour - 1;
			} else {
				return $scope.hour;
			}
		}

		// function to get the minuete when going back 20 minuetes
		$scope.getbackMinuete = function () {
			if ($scope.minuete < 20) {
				return 60 - (20 - $scope.minuete);
			} else {
				return $scope.minuete - 20;
			}
		}

		// get the time with the same format as crime's time when going back 20 minuetes from current time
		$scope.getTimeHappen = function () {
			var dayHappen = addZero($scope.getbackDay());
			var hourHappen = addZero($scope.getbackHour());
			var minueteHappen = addZero($scope.getbackMinuete());
			var result = "2016-" + $scope.month + "-" + $scope.day + "T" + hourHappen + ":" + minueteHappen + ":" + $scope.second + "." + $scope.millionSecond;
			return result;
		}


		$scope.timeNow = $scope.getTimeNow();
		//console.log("time now is: " +  $scope.timeNow);
		$scope.timeHappen = $scope.getTimeHappen();
		//console.log("time before 20 minuetes is: "+ $scope.timeHappen);

		// the newAPI url
		var urlNew = "https://data.seattle.gov/resource/pu5n-trf4.json?$where=event_clearance_date between '" + $scope.timeHappen + "' and '" + $scope.timeNow + "' ";

		// the url for test
		var urlTest = "https://data.seattle.gov/resource/pu5n-trf4.json?$where=event_clearance_date between '2016-07-19T20:22:18.825' and '2016-07-19T22:22:18.825' ";

		// clear all the layers on map
		$scope.map.eachLayer(function (layer) {
			//console.log(layer);
			$scope.map.removeLayer(layer);
		});

		// remove the controller on map
		$scope.map.removeControl($scope.lControl);

		// add the tile layer on the map to make a map looks like a map
		var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
		layer.addTo($scope.map);

		// get the user's current location and add a marker on it
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(success);
		}
		function success(pos) {
			L.marker([pos.coords.latitude, pos.coords.longitude]).addTo($scope.map).bindPopup('I am here').openPopup();
		}


		// get the API data and store in arr variable as an array of crime object
		var arr = [];
<<<<<<< HEAD
		$http.get(url).then(function (response) {
			var data = response.data;
			$scope.data = data;
			json = $scope.data.data;
			////console.log(json[0]);
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
			// function used to add markers of each crime, by creating a layergroup for each typee of markers(crimes)
=======
		console.log(urlTest);
		$http.get(urlTest).then(function (response) {
			// respons.data is an array of crime object
			arr = response.data;
			//console.log(data);
			console.log(arr);
			console.log(arr.length);

			// function used to add markers of each crime, by creating a layergroup for each typee of crime
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389
			customBuild(arr);
			function customBuild(arr) {
				$scope.assault = new L.LayerGroup([]);
				$scope.hazard = new L.LayerGroup([]);
				$scope.burglary = new L.LayerGroup([]);
				$scope.disturbance = new L.LayerGroup([]);
				$scope.theft = new L.LayerGroup([]);
				$scope.suspicious_person = new L.LayerGroup([]);
				$scope.liquor_violation = new L.LayerGroup([]);
				$scope.robbery = new L.LayerGroup([]);
				$scope.traffic = new L.LayerGroup([]);
				$scope.other = new L.LayerGroup([]);
				$scope.happenNow = new L.LayerGroup([]);
				$scope.allLayers = [$scope.assault, $scope.hazard, $scope.burglary, $scope.disturbance, $scope.theft, $scope.suspicious_person, $scope.liquor_violation, $scope.robbery, $scope.traffic, $scope.other, $scope.happenNow];
				for (var i = 0; i < arr.length; i++) {
					var curr = arr[i];
					var id = curr["cad_cdw_id"]
					var lat = curr["latitude"];
					var lng = curr["longitude"];
					var time = curr["event_clearance_date"];
					var type = curr["event_clearance_group"];
					var street = curr["hundred_block_location"];
					var minHappen = $scope.getMinuete(time);
					var hourHappen = $scope.getHour(time);
					//var dayHappen = $scope.getDay(time);
					// filter out the crime happened earlier
					/*
					if (dayHappen == day) {
						if ((minuete > 30 && minuete - minHappen >= 0 && minuete - minHappen <= 30 && hour == hourHappen) || (minuete < 30 && ((minHappen - minuete >= 30 && hour == hourHappen + 1) || (minHappen < 30 && hour == hourHappen)))) {
							//console.log('get the recent data');
							var diff = minuete - minHappen > 0 ? minuete - minHappen : minuete + 60 - minHappen;
							*/

					var marker;
					// compute the time difference
					var diff = $scope.minuete - minHappen >= 0 ? $scope.minuete - minHappen : $scope.minuete + 60 - minHappen;
					// for those crimes happening within 10 minutes
					if (diff <= 10) {
						console.log('crime now');
						// create custom icon
						/*
						var myIcon = L.icon({
							iconUrl: 'img/Plush-48.png',
							//iconRetinaUrl: 'my-icon@2x.png',
							iconSize: [38, 95],
							iconAnchor: [22, 94],
							popupAnchor: [-3, -76],
							//shadowUrl: 'my-icon-shadow.png',
							//shadowRetinaUrl: 'my-icon-shadow@2x.png',
							//shadowSize: [68, 95],
							//shadowAnchor: [22, 94]
						});
						*/
						// create special icon for the crime happen within 10 minutes
						var pulsingIcon = L.icon.pulse({ iconSize: [20, 20], color: 'red' });
						marker = L.marker([lat, lng], { icon: pulsingIcon }).bindPopup(type + " happened " + diff + " minutes ago at " + street);
						marker.addTo($scope.happenNow);
						// for other crimes happening between 10 and 20 minutes ago, create circle markers with different colors for them
					} else {
						if (type === "ASSAULTS") {
							marker = new L.circleMarker([lat, lng], {
								color: 'red'
							    ,fillOpacity: 0.6
							});
							marker.addTo($scope.assault);
						} else if (type === "HAZARDS") {
							marker = new L.circleMarker([lat, lng], {
								color: 'yellow'
								,fillOpacity: 0.9
							});
							marker.addTo($scope.hazard);
						} else if (type === "BURGLARY ALACAD(FALSE)") {
							marker = new L.circleMarker([lat, lng], {
								color: 'blue'
								,fillOpacity: 0.8
							});
							marker.addTo($scope.burglary);
						} else if (type === "DISTURBANCES") {
							marker = new L.circleMarker([lat, lng], {
								color: 'purple'
								,fillOpacity: 0.8
							});
							marker.addTo($scope.noise);
						} else if (type === "THEFT") {
							marker = new L.circleMarker([lat, lng], {
								color: 'brown'
								,fillOpacity: 0.8
							});
							marker.addTo($scope.theft);
						} else if (type === "SUSPICIOUS CIRCUMSTANCES") {
							marker = new L.circleMarker([lat, lng], {
								color: 'coral'
								,fillOpacity: 0.8
							});
							marker.addTo($scope.suspicious_person);
						} else if (type === "LIQUOR VIOLATIONS") {
							marker = new L.circleMarker([lat, lng], {
								color: 'orange'
								,fillOpacity: 0.9
							});
							marker.addTo($scope.liquor_violation);
						} else if (type === "ROBBERY") {
							marker = new L.circleMarker([lat, lng], {
								color: 'black'
								,fillOpacity: 0.7
							});
							marker.addTo($scope.robbery);
						} else if (type == "TRAFFIC RELATEDS CALLS") {
							marker = new L.circleMarker([lat, lng], {
								color: 'violet'
								,fillOpacity: 0.8
							});
							marker.addTo($scope.traffic);
						} else {
							marker = new L.circleMarker([lat, lng], {
								color: 'syan'
								,fillOpacity: 0.5
							});
							marker.addTo($scope.other);

						}

					}

					marker.bindPopup(type + " happened " + diff + " minutes ago at " + street);

				}

				// add each layergroup to the map
				for (var i = 0; i < $scope.allLayers.length; i++) {
					$scope.map.addLayer($scope.allLayers[i]);
				}
<<<<<<< HEAD
				////console.log('$scope.lcontrol:');
				////console.log($scope.lcontrol);
				//$scope.lcontrol.addTo($scope.map);
=======


				// create a controller for each layer group and add it to the map
				$scope.lcontrol = L.control.layers(null, {
					"Assualt": $scope.assault,
					"Hazard": $scope.hazard,
					"Burglary": $scope.burglary,
					"Noise": $scope.disturbance,
					"Theft": $scope.theft,
					"Suspicious Person": $scope.suspicious_person,
					"Liquor Violation": $scope.liquor_violation,
					"Robbery": $scope.robbery,
					"Traffic": $scope.traffic,
					"Other": $scope.other,
					"HappenNow": $scope.happenNow
				}).addTo($scope.map);
				//console.log('$scope.lcontrol:');
				//console.log($scope.lcontrol);

>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389
			}

		});

    };


	// The original crime map with focus on user's location

	$scope.loadRaw = function () {
		//$scope.mapId = 'alertmap';
		//console.log($scope.mapId);
		$scope.map = drawmap();

		//$scope.raw = true;
		//$scope.recent = false;

		function drawmap() {
			// get the user location
			var map = L.map('map').locate({ setView: true, maxZoom: 15 });
			//setView([47.6553, -122.3035], 13);
			var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
			layer.addTo(map);
			return map;
		}


		$scope.map.on('locationfound', onLocationFound);
		function onLocationFound(e) {
			// e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
			L.marker(e.latlng).addTo($scope.map).bindPopup('I am here').openPopup();
		}
		// get the API data and store in arr variable
		var json;
		var arr = [];
		$http.get(url).then(function (response) {
			var data = response.data;
			$scope.data = data;
			json = $scope.data.data;
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
			// function used to add markers, by creating a layergroup for each typee of markers
			customBuild(arr);
			function customBuild(arr) {
				$scope.assault = new L.LayerGroup([]);
				$scope.hazard = new L.LayerGroup([]);
				$scope.burglary = new L.LayerGroup([]);
				$scope.noise = new L.LayerGroup([]);
				$scope.theft = new L.LayerGroup([]);
				$scope.suspicious_person = new L.LayerGroup([]);
				$scope.liquor_violation = new L.LayerGroup([]);
				$scope.robbery = new L.LayerGroup([]);
				$scope.traffic = new L.LayerGroup([]);
				$scope.other = new L.LayerGroup([]);
				$scope.allLayers = [$scope.assault, $scope.hazard, $scope.burglary, $scope.noise, $scope.theft, $scope.suspicious_person, $scope.liquor_violation, $scope.robbery, $scope.traffic, $scope.other];
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
						circle.addTo($scope.assault);
					} else if (offense.includes("HAZARDS")) {
						circle.addTo($scope.hazard);
					} else if (offense.includes("BURGLARY")) {
						circle.addTo($scope.burglary);
					} else if (offense.includes("NOISE")) {
						circle.addTo($scope.noise);
					} else if (offense.includes("THEFT")) {
						circle.addTo($scope.theft);
					} else if (offense.includes("SUSPICIOUS")) {
						circle.addTo($scope.suspicious_person);
					} else if (offense.includes("LIQUOR")) {
						circle.addTo($scope.liquor_violation);
					} else if (offense.includes("ROBBERY")) {
						circle.addTo($scope.robbery);
					} else if (offense.includes("TRAFFIC")) {
						circle.addTo($scope.traffic);
					} else {
						circle.addTo($scope.other);
					}
					circle.bindPopup(offense + " at " + street + " at " + time);
				}

				for (var i = 0; i < $scope.allLayers.length; i++) {
					$scope.map.addLayer($scope.allLayers[i]);
				}

				$scope.lControl = L.control.layers(null, {
					"Assualt": $scope.assault,
					"Hazard": $scope.hazard,
					"Burglary": $scope.burglary,
					"Noise": $scope.noise,
					"Theft": $scope.theft,
					"Suspicious Person": $scope.suspicious_person,
					"Liquor Violation": $scope.liquor_violation,
					"Robbery": $scope.robbery,
					"Traffic": $scope.traffic,
					"Other": $scope.other
				});
				$scope.lControl.addTo($scope.map);
				//console.log($scope.lControl['_layers'])[0]
				//console.log($scope.lcontrol);
				//$scope.lcontrol.addTo();
			}
		});
	};

}]);


myApp.controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
	// URL of our API
<<<<<<< HEAD
    var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?$limit=5";
    //console.log(url);
=======
	var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?$limit=5";
	console.log(url);
>>>>>>> 30a181f9dca667b46c1ca0b83c1f361b22cb7389
	// load data
	$http.get(url).then(function (response) {
		var data = response.data;
		var json = response.data.data;
		var arr = [];
		for (var i = 0; i < json.length; i++) {
			arr.push({
				id: json[i][8],
				offense_number: json[i][9],
				offense: json[i][12],
				street: json[i][16],
				incident_time: new Date(json[i][15]),
				latitude: json[i][21],
				longitude: json[i][20]
			});
		}
		//console.log('list.html data:');
		$scope.data = arr;
		//console.log($scope.data);
	});
}]);

myApp.controller('TypeCtrl', ['$scope', function ($scope) {
	$scope.crimeTypes = [
		{ 'type': 'assult', 'value': false },
		{ 'type': 'hazard', 'value': false },
		{ 'type': 'burglary', 'value': false },
		{ 'type': 'noise', 'value': false },
		{ 'type': 'theft', 'value': false },
		{ 'type': 'robbery', 'value': false },
		{ 'type': 'traffic', 'value': false }];

	$scope.toggle = function (index) {
		//console.log(index);
		$scope.crimeTypes[index].value = !$scope.crimeTypes[index].value;
		//console.log($scope.crimeTypes);
	}
}]);

myApp.controller('StatCtrl', ['$scope', '$http', function ($scope, $http) {

	// choose table for general or details
	$scope.type = 'General';

	// Seattle Neighbors and Precinct Map
	$scope.precinct = [
		{ 'beat': '99', 'precinct': 'North Precinct', 'Neighbors': '' },
		{ 'beat': 'N1', 'precinct': 'North Precinct', 'Neighbors': 'BITTERLAKE, BALLARD NORTH, GREENWOOD' },
		{ 'beat': 'N2', 'precinct': 'North Precinct', 'Neighbors': 'BITTERLAKE, NORTHGATE' },
		{ 'beat': 'N3', 'precinct': 'North Precinct', 'Neighbors': 'BITTERLAKE, NORTHGATE, GREENWOOD' },
		{ 'beat': 'J1', 'precinct': 'North Precinct', 'Neighbors': 'BALLARD NORTH, GREENWOOD' },
		{ 'beat': 'J2', 'precinct': 'North Precinct', 'Neighbors': 'BALLARD NORTH, GREENWOOD, PHINNEY RIDGE' },
		{ 'beat': 'J3', 'precinct': 'North Precinct', 'Neighbors': 'GREENWOOD, PHINNEY RIDGE, ROOSEVELT/RAVENNA' },
		{ 'beat': 'B1', 'precinct': 'North Precinct', 'Neighbors': 'BALLARD SOUTH' },
		{ 'beat': 'B2', 'precinct': 'North Precinct', 'Neighbors': 'BALLARD SOUTH, FREMONT, PHINNEY RIDGE' },
		{ 'beat': 'B3', 'precinct': 'North Precinct', 'Neighbors': 'WOLLINGFORD, FREMONT, PHINNEY RIDGE' },
		{ 'beat': 'L1', 'precinct': 'North Precinct', 'Neighbors': 'LAKECITY, NORTHGATE' },
		{ 'beat': 'L2', 'precinct': 'North Precinct', 'Neighbors': 'LAKECITY, NORTHGATE, ROOSEVELT/RAVENNA' },
		{ 'beat': 'L3', 'precinct': 'North Precinct', 'Neighbors': 'LAKECITY, SANDPOINT' },
		{ 'beat': 'U1', 'precinct': 'North Precinct', 'Neighbors': 'ROOSEVELT/RAVENNA, UNIVERSITY' },
		{ 'beat': 'U2', 'precinct': 'North Precinct', 'Neighbors': 'UNIVERSITY' },
		{ 'beat': 'U3', 'precinct': 'North Precinct', 'Neighbors': 'SANDPOINT, UNIVERSITY, ROOSEVELT/RAVENNA' },
		{ 'beat': 'Q1', 'precinct': 'West Precinct', 'Neighbors': 'MAGNOLIA' },
		{ 'beat': 'Q2', 'precinct': 'West Precinct', 'Neighbors': 'QUEEN ANNE' },
		{ 'beat': 'Q3', 'precinct': 'West Precinct', 'Neighbors': 'QUEEN ANNE, SLU/CASCADE' },
		{ 'beat': 'D1', 'precinct': 'West Precinct', 'Neighbors': 'BELLTOWN, SLU/CASCADE' },
		{ 'beat': 'D2', 'precinct': 'West Precinct', 'Neighbors': 'QUEEN ANNE, SLU/CASCADE' },
		{ 'beat': 'D3', 'precinct': 'West Precinct', 'Neighbors': 'EASTLAKE - WEST, SLU/CASCADE' },
		{ 'beat': 'M1', 'precinct': 'West Precinct', 'Neighbors': 'DOWNTOWN COMMERCIAL' },
		{ 'beat': 'M2', 'precinct': 'West Precinct', 'Neighbors': 'DOWNTOWN COMMERCIAL, SLU/CASCADE' },
		{ 'beat': 'M3', 'precinct': 'West Precinct', 'Neighbors': 'DOWNTOWN COMMERCIAL' },
		{ 'beat': 'K1', 'precinct': 'West Precinct', 'Neighbors': 'DOWNTOWN COMMERCIAL' },
		{ 'beat': 'K2', 'precinct': 'West Precinct', 'Neighbors': 'PIONEER SQUARE' },
		{ 'beat': 'K3', 'precinct': 'West Precinct', 'Neighbors': 'INTERNATIONAL DISTRICT - WEST' },
		{ 'beat': 'C1', 'precinct': 'East Precinct', 'Neighbors': 'MONTLAKE/PORTAGE BAY, EASTLAKE - EAST, NROTH CAPITOL HILL, CAPITAL HILL, MILLER PARK, CENTRAL AREA/SQUIRE PARK' },
		{ 'beat': 'C2', 'precinct': 'East Precinct', 'Neighbors': 'MILLER PARK, MONTLAKE/PORTAGE BAY, MADISON PARK, CENTRAL AREA/SQUIRE PARK' },
		{ 'beat': 'C3', 'precinct': 'East Precinct', 'Neighbors': 'MADISON PARK, CENTRAL AREA/SQUIRE PARK, MADRONA/LESCHI' },
		{ 'beat': 'E1', 'precinct': 'East Precinct', 'Neighbors': 'CAPITOL HILL' },
		{ 'beat': 'E2', 'precinct': 'East Precinct', 'Neighbors': 'CAPITOL HILL, FIRST HILL' },
		{ 'beat': 'E3', 'precinct': 'East Precinct', 'Neighbors': 'CAPITOL HILL, FIRST HILL' },
		{ 'beat': 'G1', 'precinct': 'East Precinct', 'Neighbors': 'INTERNAIONAL DISTRICT, FIRST HILL, JUNDKINS PARK' },
		{ 'beat': 'G2', 'precinct': 'East Precinct', 'Neighbors': 'MADRONA/LESCHI, JUDKINS PARK' },
		{ 'beat': 'G3', 'precinct': 'East Precinct', 'Neighbors': 'JUDKINS PARK, NORTH BEACON/JEFFERSON, MT BAKER/NORTH RAINIER, MADRONA/LESCHI, MT BAKER/NORTH RAINIER' },
		{ 'beat': 'W1', 'precinct': 'Southwest Precinct', 'Neighbors': 'ALKI, NORTH ADMIRAL, COMMERCIAL HARBOR ISLAND, COMMERCIAL DUWAMISH' },
		{ 'beat': 'W2', 'precinct': 'Southwest Precinct', 'Neighbors': 'ALKI, ALASKA JUNCTION, NORTH DELRIDGE' },
		{ 'beat': 'W3', 'precinct': 'Southwest Precinct', 'Neighbors': 'MORGAN, FAUNTLEROY SW, ROXHILL/WESTWOOD/ARBOR' },
		{ 'beat': 'F1', 'precinct': 'Southwest Precinct', 'Neighbors': 'COMMERCIAL DUWAMISH, PIGEON POINT, HIGH POINT, NORTH DELRIDGE, SOUTH PARK' },
		{ 'beat': 'F2', 'precinct': 'Southwest Precinct', 'Neighbors': 'ROXHILL/WESTWOOD/ARBOR' },
		{ 'beat': 'F3', 'precinct': 'Southwest Precinct', 'Neighbors': 'HIGHLAND PARK' },
		{ 'beat': 'O1', 'precinct': 'South Precinct', 'Neighbors': 'SODO' },
		{ 'beat': 'O2', 'precinct': 'South Precinct', 'Neighbors': 'SODO, GEORGETOWN' },
		{ 'beat': 'O3', 'precinct': 'South Precinct', 'Neighbors': 'GEORGETOWN, SOUTH BEACON HILL' },
		{ 'beat': 'R1', 'precinct': 'South Precinct', 'Neighbors': 'NORTH BEACON HILL, MID BEACON HILL' },
		{ 'beat': 'R2', 'precinct': 'South Precinct', 'Neighbors': 'NORTH BEACON HILL, MOUNT BAKER, CLAREMONT/RAINIER VISTA' },
		{ 'beat': 'R3', 'precinct': 'South Precinct', 'Neighbors': 'LAKEWOOD/SEWARD PARK, GENESEE, COLUMBIA CITY, HILMAN CITY' },
		{ 'beat': 'S1', 'precinct': 'South Precinct', 'Neighbors': 'MID BEACON HILL, NEW HOLLY, SOUTH BEACON HILL' },
		{ 'beat': 'S2', 'precinct': 'South Precinct', 'Neighbors': 'BRIGHTON/DUNLAP, RAINIER BEACH' },
		{ 'beat': 'S3', 'precinct': 'South Precinct', 'Neighbors': 'RAINIER BEACH, RAINIER VIEW' },
	];
	function getNeighborhood(beat) {
		for (var i = 0; i < $scope.precinct.length; i++) {
			if ($scope.precinct[i].beat == beat) {
				return $scope.precinct[i].Neighbors;
			}
		}
		return '';
	}
}]);
myApp.controller('bewareCtrl', ['$scope', '$http', function($scope, $http){
	// year selection control
	$scope.earliesYear = 2009;
	$scope.latestYear = 2016;
	$scope.startYears = [];
	$scope.endYears = [];
	for (var i = $scope.earliesYear; i <= $scope.latestYear; i++) {   // initialization
		$scope.startYears.push(i);
		$scope.endYears.push(i);
		$scope.start_year = $scope.earliesYear;   // selected start date
		$scope.end_year = $scope.latestYear;   // selected end date
	}
	$scope.changeEndYear = function (start) {   // change the range of end year if start year is selected
		$scope.endYears = [];
		for (var i = start; i <= $scope.latestYear; i++) {   // initialization
			$scope.endYears.push(i);
		}
		$scope.start_year = start;
		//console.log('end year: ');
		//console.log($scope.endYears);
	};
	$scope.changeStartYear = function (end) {   // change the range of start year if end year is selected
		$scope.startYears = [];
		for (var i = $scope.earliesYear; i <= end; i++) {   // initialization
			$scope.startYears.push(i);
		}
		$scope.end_year = end;
		//console.log('start year: ');
		//console.log($scope.startYears);
	};

	// load data
	var URL = 'https://data.seattle.gov/resource/pu5n-trf4.json?';
	$scope.count = [];
	for (var year = $scope.start_year; year <= $scope.end_year; year++) {
		var url = URL + "$where=event_clearance_date between '" + year + "-01-01T00:00:00' and '" + year + "-12-31T23:59:59'";  // add time range
		url += "&$select=zone_beat, count(*)";
		url += "&$group=zone_beat";
		//console.log(url);
		$http.get(url).then(function (response) {
			var thisYear = response.config.url.substring(86, 90);
			//console.log(thisYear);
			for (var i = 0; i < response.data.length; i++) {
				$scope.count.push({ 'year': thisYear, 'data': response.data[i], 'neighbor': getNeighborhood(response.data[i].zone_beat) });
			}
			//console.log($scope.count);
		});
	}

	$scope.statOfYear = [];
	for (var year = $scope.start_year; year <= $scope.end_year; year++) {
		var url = URL + "$where=event_clearance_date between '" + year + "-01-01T00:00:00' and '" + year + "-12-31T23:59:59'";  // add time range
		url += "&$select=count(*)";
		//console.log(url);
		$http.get(url).then(function (response) {
			var thisYear = response.config.url.substring(86, 90);
			//console.log(thisYear);
			for (var i = 0; i < response.data.length; i++) {
				$scope.statOfYear.push({ 'year': thisYear, 'count': response.data[0].count });
			}
			//console.log($scope.statOfYear);
		});
	}

}]);

myApp.controller('commonCtrl', ['$scope', '$http', function($scope, $http){
	//refresh current location 
	$scope.curPos = [];
	//gets current location
	$scope.useAutoLoc = function() {
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPos);
		} else {
			return output.innerHTML = "<p> Unable to find current location </p>";
		}
		function showPos(position){
			console.log(navigator.geolocation);
			$scope.lat = position.coords.latitude;
			$scope.long = position.coords.longitude;
			console.log("got lat " + $scope.lat + " & long" +$scope.long);
		}	
		var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?$limit=5";
		$http.get(url).then(function(response) {
			console.log($scope.lat);
			console.log($scope.long);
			if(angular.isNumber($scope.lat) && angular.isNumber($scope.long)){
				console.log("went past gps check");
				$scope.foundGps = true;
				var data = response.data;
				var json = response.data.data;
				var arrInfo = [];
				var arrFreq = [{type:"ASSAULT", freq: 0}, {type:"HAZARDS", freq: 0}, {type:"BURGLARY", freq: 0}, {type:"THEFT", freq: 0}, {type:"SUSPICIOUS", freq: 0}, {type:"LIQUOR", freq: 0}, {type:"ROBBERY", freq: 0}, {type:"TRAFFIC", freq: 0}, {type:"NARCOTICS", freq: 0}, {type:"VEHICLE", freq: 0}/*, {{type:"RANDOM_CRIMES, freq: 0}*/];
				var crimeNear = false;
				for (var i = 0; i < json.length; i++) {
					console.log("entered for loop");
					var distance  = checkDist($scope.lat,$scope.long,json[i][21],json[i][20]);
					console.log(distance);
					if(distance < 5000){
						$scope.hasCrime = true;
						crimeNear = true;
						var crime = checkCrimes(json[i][12]);
						if(typeof crime != 'undefined'){
							arrInfo.push({
								offense: json[i][12],
								street: json[i][16],
								incident_time: new Date(json[i][15])
							});
							for(var j=0; j<arrFreq.length; j++){
								if(arrFreq[j].type === crime)
									arrFreq[j].freq = arrFreq[j].freq + 1;
							}
						}
					}
				}
				$scope.arrInfo = arrInfo;
				console.log("arrInfo :" + arrInfo);
				arrFreq.sort(function(a,b){
					return parseFloat(a.freq) - parseFloat(b.freq);
				})
				var topThree = arrFreq.slice(1).slice(-3);
				console.log(topThree);
				$scope.topThreeCrime = {};
				$scope.topThreeCrime.firstkey = topThree[2].type;
				$scope.topThreeCrime.secondkey = topThree[1].type;
				$scope.topThreeCrime.thirdkey = topThree[0].type;
				$scope.topThreeCrime.firstval = topThree[2].freq;
				$scope.topThreeCrime.secondval = topThree[1].freq;
				$scope.topThreeCrime.thirdval = topThree[0].freq;
				if(!crimeNear){
					$scope.hasCrime = false;
				}
			} else {
				$scope.foundGps = false;
				alert('Position Coordinate not found');
			}
		});
	}

	//find the distance between two location, result is in meters
	function checkDist (baseLat,baseLong,givenLat,givenLong){
		var earthRad = 6371e3; 
		var baseLatR = toRadians(baseLat);
		var givenLatR = toRadians(givenLat);
		var diffLatR = toRadians(givenLat-baseLat);
		var diffLongR = toRadians(givenLong-baseLong);

		var a = Math.sin(diffLatR/2) * Math.sin(diffLatR/2) +
				Math.cos(baseLatR) * Math.cos(givenLatR) *
				Math.sin(diffLongR/2) * Math.sin(diffLongR/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var distance = earthRad * c;
		return distance;
	}
	
	//convert degree into radians
	function toRadians(degree){
		return (degree * Math.PI / 180);
	}

	function checkCrimes(crimeName){
		if(crimeName.includes("ASSAULT"))
			return "ASSAULT";
		else if(crimeName.includes("HAZARDS"))
			return "HAZARDS";
		else if(crimeName.includes("BURGLARY"))
			return "BURGLARY";
		else if(crimeName.includes("THEFT"))
			return "THEFT";
		else if(crimeName.includes("SUSPICIOUS"))
			return "SUSPICIOUS";
		else if(crimeName.includes("LIQUOR"))
			return "LIQUOR";
		else if(crimeName.includes("ROBBERY"))
			return "ROBBERY";
		else if(crimeName.includes("TRAFFIC"))
			return "TRAFFIC";
		else if(crimeName.includes("NARCOTICS"))
			return "NARCOTICS";
		else if(crimeName.includes("VEHICLE"))
			return "VEHICLE";
		//else 
			//return "RANDOM_CRIMES";
	}

}]);

myApp.controller('myNav',['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return !(viewLocation === $location.path());
    };
}]);