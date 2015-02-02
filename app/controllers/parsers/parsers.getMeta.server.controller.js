/*
	Contains functionality for retrieving metadata out of an 
	incoming JSON object.
	@author Boris Stöcker
*/


//takes wfs json object and returns a bbox as a polygon feature
function getMetaWMS(json) {

	var minx = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].westBoundLongitude);
	var maxx = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].eastBoundLongitude);
	var miny = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].southBoundLatitude);
	var maxy = (json.WMS_Capabilities.Capability[0].Layer[0].EX_GeographicBoundingBox[0].northBoundLatitude);

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
	
	console.log("bbox created");
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;
}

//takes wfs json object and returns a bbox as a polygon feature
function getMetaWCS(json) {
	
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
	
	console.log("bbox created: " + bbox.geometry.type);
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;

}

//takes wfs json object and returns a bbox as a polygon feature
function getMetaWFS(json) {

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
	
	console.log("bbox created");
	console.log(minx + " " + maxx + " " + miny + " " + maxy);			
	return bbox;
}

//takes csw json object and returns metadata
function getMetaCSW(json) {
	//TODO

		return ;
}

//takes sos json object and returns a bbox as a polygon feature
function getMetaSOS(json) {

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
	
	console.log("bbox created");;
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;
}

//takes gml json object and returns a bbox as a polygon feature
function getMetaGML(json) {

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
	
	console.log("bbox created");;
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;
}

//takes kml json object and returns a bbox as a polygon feature
function getMetaKML(json) {

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
	
	console.log("bbox created");
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;
}

//takes microformat json object and returns a bbox as a polygon feature
function getMetaMicro(json) {

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
	
	console.log("bbox created");
	console.log(minx + " " + maxx + " " + miny + " " + maxy);
	return bbox;
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