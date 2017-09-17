 
 var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  // left: '50%' // Left position relative to parent
};
var target;

 	 var map;
      function initialize() {
		  var geocoder = new google.maps.Geocoder();
		  var address = $("#wrapper").attr('data-default-address');
		 
			if (geocoder){
				geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK)
					{
					//  map.setCenter(results[0].geometry.location);

						document.getElementById("nearAddress").value = results[0].formatted_address;
						document.getElementById("mapLocateLat").value = results[0].geometry.location.lat();
						document.getElementById("mapLocateLon").value = results[0].geometry.location.lng();

					}
			  });

			}

			
			var currentURLpath = window.location.pathname.split("/");

			if(currentURLpath[currentURLpath.length-1] == "search.php") {
				target = document.getElementById('spin_location');
			  	locateMe();
			}


			/* google map search nearAddress*/
			$("#nearAddress").blur(function(){
				searchAround(this, false);
				
			})
			
			/* google map search nearAddress*/
			$("#nearAddress").focusout(function(){
				searchAround(this, false);
				
			})


			/* google map find button with Locateme*/
			$('.btnLocateme').click(function(){
				var path_name = $(location).attr('pathname').split("/").pop();
				if(path_name == "results.php") {
						target = document.getElementById('spin_result');
						// console.log("result page");
				}
				else {
						target = document.getElementById('spin_location');
						// console.log("index page");
				}				
				locateMe();

			});	
			
			function handleNoGeolocation(errorFlag) {
				if (errorFlag) {
				  var content = 'Error: The Geolocation service failed.';
				} else {
				  var content = 'Error: Your browser doesn\'t support geolocation.';
				}
								
			}
       
      }


function locateMe() {

	var geocoder = new google.maps.Geocoder();
	var spinner0 = new Spinner(opts).spin(target);

	if(navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		geocoder.geocode({'latLng': pos}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
	 			 if (results[0]) {
				 	document.getElementById("nearAddress").value = results[0].formatted_address;
				 	document.getElementById("mapLocateLat").value = results[0].geometry.location.lat();
				 	document.getElementById("mapLocateLon").value = results[0].geometry.location.lng();
                                        geoLoaded = true;
                                        if ($("#searchTerm").val() != "")
                                          $(".affa-form-subscribe").attr('action','results.php');
				 }
			}
			
		});
		spinner0.stop();
		
	  }, function() {
                $(".affa-form-subscribe").attr('action','search.php');
	  });
	} else {
	  // Browser doesn't support Geolocation
	  spinner0.stop();
	}	
}

function searchAround(e, submitform) {


   if(submitform == "index") {
   		target = document.getElementById('spin_location');
   }
   else if(submitform == "store") {
   		target = document.getElementById('spin_result');
   }
	
    var spinner0 = new Spinner(opts).spin(target);

	var bgeocoder = new google.maps.Geocoder();
	var baddress = $(e).val();
		 
	if (bgeocoder && baddress!="" && baddress!=null){
		bgeocoder.geocode( { 'address': baddress}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
			{
				
				   if (results[0]) {
					   document.getElementById("nearAddress").value = results[0].formatted_address;								   
					   document.getElementById("mapLocateLat").value = results[0].geometry.location.lat();
				 	   document.getElementById("mapLocateLon").value = results[0].geometry.location.lng();

				 	   spinner0.stop();

				 	   if(submitform == "index") {
				 	   		$("#index_form").submit();
				 	   }
				 	   else if(submitform == "store") {
				 	   		$('#findstore_form').attr('action', "").submit();
				 	   }
					 }
				
			}
	  });
	}
	spinner0.stop();

}
