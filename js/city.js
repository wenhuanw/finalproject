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

		////console.log("Map Drawn");
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

myApp.controller('AlertCtrl', ['$scope', '$http', function ($scope, $http) {
	var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?";

	// get the hour data of the happened incident 
	$scope.getHour = function (s) {
		////console.log("time is: " +s);
		var sHour = s.slice(s.length - 8, s.length - 6);
		////console.log("sHour is: " +sHour);
		var incidentHour = parseInt(sHour);
		return incidentHour;

	}

	// get the date data of the happened incident 
	$scope.getDay = function (s) {
		////console.log("time is: "+s);
		var sDay = s.slice(s.length - 11, s.length - 9);
		////console.log("day is: " + sDay);
		var incidentDay = parseInt(sDay);
		return incidentDay;
	}


	// create crime map within one hour before
	$scope.loadRecent = function () {
		//$scope.lcontrol = {};
		//console.log($scope.map.removeLayer($scope.lcontrol));
		$scope.map.removeLayer($scope.lcontrol);

		// bug 
		$scope.map.eachLayer(function (layer) {
			$scope.map.removeLayer(layer);
		});

		var d = new Date();
		var hour = d.getHours();
		var day = d.getDate();
		// get user's location and add the marker
		var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
		layer.addTo($scope.map);
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(success);
		}
		function success(pos) {
			L.marker([pos.coords.latitude, pos.coords.longitude]).addTo($scope.map);
		}

		// get the API data and store in arr variable
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
			// function used to add markers of each crime, by creating a layergroup for each typee of markers(crimes)
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
					var hourHappen = $scope.getHour(time);
					var dayHappen = $scope.getDay(time);
					// filter out the crime happened earlier
					if (dayHappen == day && (hour - hourHappen == -23 || (hour - hourHappen >= 0 && hour - hourHappen <= 1))) {
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
				}

				for (var i = 0; i < $scope.allLayers.length; i++) {
					$scope.map.addLayer($scope.allLayers[i]);
				}
				////console.log('$scope.lcontrol:');
				////console.log($scope.lcontrol);
				//$scope.lcontrol.addTo($scope.map);
			}

		});

    };



	// The original crime map with focus on user's location
	$scope.loadRaw = function () {
		$scope.map = drawmap();
		$scope.raw = true;
		$scope.recent = false;

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
			L.marker(e.latlng).addTo($scope.map);
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

				$scope.lcontrol = L.control.layers(null, {
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
				$scope.lcontrol.addTo($scope.map);
			}
		});
	};

}]);


myApp.controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
	// URL of our API
    var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?$limit=5";
    //console.log(url);
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