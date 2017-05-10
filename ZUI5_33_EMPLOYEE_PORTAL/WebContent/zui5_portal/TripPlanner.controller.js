sap.ui.controller("zui5_portal.TripPlanner", {

	// onInit: function() {
	//
	// },

	// onBeforeRendering: function() {
	//
	// },

	onAfterRendering: function() {
		var myOptions = {
		zoom: 13,
		center: new google.maps.LatLng(40.714623,-74.006605), // New York
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
		},



	calcRoute : function(from, to) { // Call gogle API
		var directionsDisplay;
		var directionsService = new google.maps.DirectionsService();
		var map;
		var oldDirections = [];
		var currentDirections = null;

		function initialize() { // init goole maps
			var myOptions = {
				zoom : 13,
				center : new google.maps.LatLng(40.714623,-74.006605),
				mapTypeId : google.maps.MapTypeId.ROADMAP
			};

			map = new google.maps.Map(document.getElementById("map_canvas"),
					myOptions);

			directionsDisplay = new google.maps.DirectionsRenderer({
				'map' : map,
				'preserveViewport' : true,
				'draggable' : true
			});
			directionsDisplay.setPanel(document
					.getElementById("directions_panel"));

			google.maps.event.addListener(directionsDisplay,
					'directions_changed', function() {
						if (currentDirections) {
							oldDirections.push(currentDirections);
						}
						currentDirections = directionsDisplay.getDirections();
					});
			calcRoute();
		}

		function calcRoute() { // calculate route
			var request = {
				origin : from,
				destination : to,
				travelMode : google.maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					document.getElementById("directions_panel").innerHTML = "";
					directionsDisplay.setDirections(response);
					var bounds = response.routes[0].bounds;
					map.fitBounds(bounds);
					addNotification("Route has been calculated", "I");
				} else {
					addNotification("Error while calculating", "E");
				}
			});
		}

		function addNotification(sText, sIcon) {
			var oMessageNotifier = sap.ui.getCore().byId("MessageNotifier");
			var oMessage = new sap.ui.core.Message({
				text : sText,
				timestamp : (new Date()).toUTCString()
			});
			switch (sIcon) {
			case "E":
				oMessage.setLevel(sap.ui.core.MessageType.Error);
				break;
			case "S":
				oMessage.setLevel(sap.ui.core.MessageType.Success);
				break;
			case "W":
				oMessage.setLevel(sap.ui.core.MessageType.Warning);
				break;
			case "I":
				oMessage.setLevel(sap.ui.core.MessageType.Information);
				break;
			default:
				oMessage.setLevel(sap.ui.core.MessageType.Information);
				break;
			}
			oMessageNotifier.addMessage(oMessage);
		}

		initialize();
	},

});