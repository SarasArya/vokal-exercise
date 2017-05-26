(() => {
    angular.module('vokalApp').controller('LocationCntrl', LocationCntrl);

    LocationCntrl.$inject = ['$scope', 'toaster', 'Location'];

    function LocationCntrl($scope, toaster, Location) {
        $scope.details = {
            searchName: "",
            places: []
        };
        $scope.initializeLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const LatLng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $scope.initializeMap(LatLng);
                }, error => {
                    if (error.code === 1) {
                        toaster.pop("error", error.message);
                    } else if (error.code === 2) {
                        toaster.pop("error", "Failed to fetch current Position via your Browser. Coming back to a default position");
                    }
                    const LatLng = {
                        lat: 13.0415886,
                        lng: 77.6135156
                    };
                    $scope.initializeMap(LatLng);
                }, {
                    timeout: 5000
                });
            } else {
                toaster.pop("error", "Your browser does not support location");
            }
        };

        $scope.initializeMap = (LatLng) => {
            let mapCanvas = document.getElementById('map');
            let mapOptions = {
                center: LatLng,
                zoom: 16,
            };
            map = new google.maps.Map(mapCanvas, mapOptions);
            marker = new google.maps.Marker({
                position: LatLng,
                map: map,
                title: 'Hello World!',
            });
            infowindow = new google.maps.InfoWindow({
                content: "You are here!!!"
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            $scope.intializeAutoComplete(map);
        };

        function createMarker(place, map) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            $scope.details.places.push({
                name: place.name,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }

        $scope.intializeAutoComplete = (map) => {
            const input = document.getElementById('placeSearch');
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            let marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            });
            autocomplete.addListener('place_changed', function() {
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(16); // Why 16? Because it looks good.
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                $scope.details.searchName = place.formatted_address;
                var address = '';
                // console.log(place.geometry.location);
                var request = {
                    location: place.geometry.location,
                    radius: '1000',
                    types: ['restaurant']
                };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);

                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            createMarker(results[i], map);
                        }
                    }
                }

                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }
                // infowindow.open(map, marker);
            });
        };

        $scope.save = () => {
            console.log("Saras");
            if ($scope.details.searchName === "" && $scope.details.places.length === 0) {
                toaster.pop("error", "can't save without searching");
            } else {
                console.log($scope.details);
                Location.save($scope.details)
                    .then(response => {
                        console.log(response);
                        toaster.pop("success", "Saved the location in database");
                        $scope.fetch();
                    }, error => {
                        toaster.pop("error", `Failed to load due to ${error.message}`);
                    });
            }
        };

        $scope.fetch = () => {
            Location.fetch()
                .then(response => {
                    console.log(response);
                    for(let i=0;i<response.length;i++){
                        response[i].placeNames = [];
                        for(let j=0;j<response[i].locations.length;j++){
                            response[i].placeNames.push(response[i].locations[j].name);
                        }
                    }
                    $scope.locations = response;
                }, error => {
                    toaster.pop("error", `Failed because ${error.message}`);
                });
        };

        $scope.fetch();

        $scope.initializeLocation();
    }
})();
