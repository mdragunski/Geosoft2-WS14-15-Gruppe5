/*
	Contains functionality for retrieving metadata out of an 
	incoming JSON object.
	@author Boris Stöcker
*/


//takes wfs json object and returns a bbox as a polygon feature
function getMetaWMS(json) {

	try{
	var minx = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].westBoundLongitude[0]);
	var maxx = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].eastBoundLongitude[0]);
	var miny = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].southBoundLatitude[0]);
	var maxy = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].northBoundLatitude[0]);

	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch(err){
		throw "No supported WMS version or broken url!";
	}
}
//takes wfs json object and returns a bbox as a polygon feature
function getMetaWCS(json) {

	try{
	console.log("getMetaWCS started");
	var minx = (json['wcs:Capabilities']['wcs:Contents'][0]['wcs:CoverageSummary'][0]["ows:WGS84BoundingBox"][0]["ows:LowerCorner"])
	.toString().split(" ")[0];
	var maxx = (json['wcs:Capabilities']['wcs:Contents'][0]['wcs:CoverageSummary'][0]["ows:WGS84BoundingBox"][0]["ows:UpperCorner"])
	.toString().split(" ")[0];
	var miny = (json['wcs:Capabilities']['wcs:Contents'][0]['wcs:CoverageSummary'][0]["ows:WGS84BoundingBox"][0]["ows:LowerCorner"])
	.toString().split(" ")[1];
	var maxy = (json['wcs:Capabilities']['wcs:Contents'][0]['wcs:CoverageSummary'][0]["ows:WGS84BoundingBox"][0]["ows:UpperCorner"])
	.toString().split(" ")[1];
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch(err){
		throw "No supported WCS version or broken url!";
	}
}

//takes wfs json object and returns a bbox as a polygon feature
function getMetaWFS(json) {
	try{
	console.log("getMetaWFS started");
	var minx = (json['wfs:WFS_Capabilities'].FeatureTypeList[0].FeatureType[0]["ows:WGS84BoundingBox"][0]["ows:LowerCorner"])
	.toString().split(" ")[0];
	var maxx = (json['wfs:WFS_Capabilities'].FeatureTypeList[0].FeatureType[0]["ows:WGS84BoundingBox"][0]["ows:UpperCorner"])
	.toString().split(" ")[0];
	var miny = (json['wfs:WFS_Capabilities'].FeatureTypeList[0].FeatureType[0]["ows:WGS84BoundingBox"][0]["ows:LowerCorner"])
	.toString().split(" ")[1];
	var maxy = (json['wfs:WFS_Capabilities'].FeatureTypeList[0].FeatureType[0]["ows:WGS84BoundingBox"][0]["ows:UpperCorner"])
	.toString().split(" ")[1];
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };
	
	return bbox;
	}
	catch(err){
		throw "No supported WFS version or broken url!";
	}
}

//takes csw json object and returns metadata
function getMetaCSW(json) {
	var bbox = {};
	return bbox;
}

//takes sos json object and returns a bbox as a polygon feature
function getMetaSOS(json) {

	try{
	console.log("getMetaSOS started");
	var minx = (json['sos:Capabilities']['sos:Contents'][0]['sos:ObservationOfferingList'][0]
				["sos:ObservationOffering"][0]["gml:boundedBy"][0]["gml:Envelope"][0]["gml:lowerCorner"])
				.toString().split(" ")[0];
	var maxx = (json['sos:Capabilities']['sos:Contents'][0]['sos:ObservationOfferingList'][0]
				["sos:ObservationOffering"][0]["gml:boundedBy"][0]["gml:Envelope"][0]["gml:upperCorner"])
				.toString().split(" ")[0];
	var miny = (json['sos:Capabilities']['sos:Contents'][0]['sos:ObservationOfferingList'][0]
				["sos:ObservationOffering"][0]["gml:boundedBy"][0]["gml:Envelope"][0]["gml:lowerCorner"])
				.toString().split(" ")[1];
	var maxy = (json['sos:Capabilities']['sos:Contents'][0]['sos:ObservationOfferingList'][0]
				["sos:ObservationOffering"][0]["gml:boundedBy"][0]["gml:Envelope"][0]["gml:upperCorner"])
				.toString().split(" ")[1];
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch(err){
		throw "No supported SOS version or broken url!";
	}
}

//takes gml json object and returns a bbox as a polygon feature
function getMetaGML(json) {

	try{
	var minx = (json.Features["gml:boundedBy"][0]["gml:Box"][0]["gml:coord"][0]["gml:X"])
				.toString();
	var maxx = (json.Features["gml:boundedBy"][0]["gml:Box"][0]["gml:coord"][1]["gml:X"])
				.toString();
	var miny = (json.Features["gml:boundedBy"][0]["gml:Box"][0]["gml:coord"][0]["gml:Y"])
				.toString();
	var maxy = (json.Features["gml:boundedBy"][0]["gml:Box"][0]["gml:coord"][1]["gml:Y"])
				.toString();
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch(err){
		throw "No supported GML version or broken url!";
	}
}

//takes kml json object and returns a bbox as a polygon feature
function getMetaKML(json) {

	try{
	var minx = (json.value.abstractFeatureGroup.value.abstractFeatureGroup[2].value.abstractFeatureGroup[0].value.latLonBox.west);
	var maxx = (json.value.abstractFeatureGroup.value.abstractFeatureGroup[2].value.abstractFeatureGroup[0].value.latLonBox.east);
	var miny = (json.value.abstractFeatureGroup.value.abstractFeatureGroup[2].value.abstractFeatureGroup[0].value.latLonBox.south);
	var maxy = (json.value.abstractFeatureGroup.value.abstractFeatureGroup[2].value.abstractFeatureGroup[0].value.latLonBox.north);
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch(err){
		throw "No supported KML version or broken url!";
	}
}

//takes microformat json object and returns a bbox as a polygon feature
function getMetaMicro(json, response) {

	try {
	var x = (json.items[0].properties.longitude[0]);
	var y = (json.items[0].properties.latitude[0]);
	var minx = x - 2;
	var maxx = x + 2;
	var miny = y - 2;
	var maxy = y + 2;
	
	var bbox = { "type" : "Feature",
				 "geometry" : {
				 	"type" : "Polygon",
					"coordinates": [
						  [
							[minx, miny], 
							[maxx, miny], 
							[maxx, maxy], 
							[minx, maxy], 
							[minx, miny]
						  ]
					  ]
				   }
			   };

	return bbox;
	}
	catch (err) {
		console.log("No supported data format or broken url!");
		response.jsonp({});
	}
}




//exports
exports.getMetaWMS = getMetaWMS;
exports.getMetaMicro = getMetaMicro;
exports.getMetaKML = getMetaKML;
exports.getMetaGML = getMetaGML;
exports.getMetaSOS = getMetaSOS;
exports.getMetaCSW = getMetaCSW;
exports.getMetaWFS = getMetaWFS;
exports.getMetaWCS = getMetaWCS;