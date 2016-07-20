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

    $urlRouterProvider.otherwise('/home');
}]);

myApp.controller('mapCtrl', ['$scope', '$http', function ($scope, $http) {
    
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
	                var currColor;
	                if (offense.includes("ASSAULT")) {
	                    currColor = "blue";
	                } else if (offense.includes("HAZARDS")) {
	                    currColor = "red";
	                } else if (offense.includes("BURGLARY")) {
	                    currColor = "yellow";
	                } else if (offense.includes("NOISE")) {
	                    currColor = "grey";
	                } else if (offense.includes("THEFT")) {
	                    currColor = "lightblue";
	                } else if (offense.includes("SUSPICIOUS")) {
	                    currColor = "darkred";
	                } else if (offense.includes("LIQUOR")) {
	                    currColor = "lightred";
	                } else if (offense.includes("ROBBERY")) {
	                    currColor = "pink";
	                } else if (offense.includes("TRAFFIC")) {
	                    currColor = "cyan"
	                } else {
	                    currColor = "black";
	                }	               

	                var circle = new L.circleMarker([lat, lng], {
	                    color: currColor
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
	                circle.addTo(map).bindPopup(offense + " at " + street + " at " + time).openPopup();

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
		//console.log("time is: " +s);
		var sHour = s.slice(s.length - 8, s.length - 6);
		//console.log("sHour is: " +sHour);
		var incidentHour = parseInt(sHour);
		return incidentHour;

	}

	// get the date data of the happened incident 
	$scope.getDay = function (s) {
		//console.log("time is: "+s);
		var sDay = s.slice(s.length - 11, s.length - 9);
		//console.log("day is: " + sDay);
		var incidentDay = parseInt(sDay);
		return incidentDay;
	}


	// create crime map within one hour before
	$scope.loadRecent = function () {
		//$scope.lcontrol = {};
		console.log($scope.map.removeLayer($scope.lcontrol));
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
				//console.log('$scope.lcontrol:');
				//console.log($scope.lcontrol);
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


myApp.controller('ListCtrl', ['$scope', '$http',function ($scope, $http) {
	$scope.ordering = "incident_time";
	// URL of our API
    var url = "https://data.seattle.gov/api/views/aym8-bxek/rows.json?$limit=5";
    console.log(url);
	// load data
	$http.get(url).then(function(response) {
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
	        console.log('list.html data:');
			$scope.data = arr;
			console.log($scope.data);
	});
}]);

myApp.controller('TypeCtrl', ['$scope', function($scope) {
	$scope.crimeTypes = [
		{'type':'assult', 'value':false},
		{'type':'hazard', 'value':false},
		{'type':'burglary', 'value':false},
		{'type':'noise', 'value':false},
		{'type':'theft', 'value':false},
		{'type':'robbery', 'value':false},
		{'type':'traffic', 'value':false}];
		
	$scope.toggle = function(index) {
		console.log(index);
		$scope.crimeTypes[index].value = !$scope.crimeTypes[index].value;
		console.log($scope.crimeTypes);
	}
}]);




/* commenting out until i have it working
myApp.controller('bewareCtrl', ['$scope', '$http', $, function($scope, $http){
	//refresh current location 
	function getGeo() {
		//gets current location
		if(navigator.geolocation){
			$scope.hasGeo = true;
			$scope.lat = position.coords.latitude;
			$scope.long = position.coords.longitude;
		} else {
			$scope.hasGeo = false;
			return output.innerHTML = "<p> Unable to find current location </p>";
		}
	}
	var pos = document.get
	$http.get(url).then(function(response) {
	        var data = response.data;
	        var json = response.data.data;
			var arr = [];
	        for (var i = 0; i < json.length; i++) {
				if(checkDist())
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
	});

	checkDist function(baseLat,baseLong,givenLat,givenLong){
		var earthRad = 6371e3; 
		var baseLatR = baseLat.toRadians();
		var givenLatR = givenLat.toRadians();
		var diffLatR = (givenLat-baseLat).toRadians();
		var diffLongR = (givenLong-baseLong).toRadians();

		var a = Math.sin(diffLatR/2) * Math.sin(diffLatR/2) +
				Math.cos(baseLatR) * Math.cos(givenLatR) *
				Math.sin(diffLongR/2) * Math.sin(diffLongR/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;
	}
}]);*/

