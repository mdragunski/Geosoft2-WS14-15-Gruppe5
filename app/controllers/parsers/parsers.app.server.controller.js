/*
	Contains functionality to route an incoming url 
	to the right parser.
	@author Boris Stöcker
*/

//dependencies
var URL = require("url");
var fs = require('fs');
var builder = require("./parsers.builder.server.controller");
var parser = require("./parsers.parser.server.controller");
var _ = require('lodash');
var mongoose = require('mongoose');
var Parser = mongoose.model("Parser");
//example initializations

//WMS working 1.1.0
//parseRouter("http://www.wms.nrw.de/geobasis/wms_nw_dgk5?service=WMS");
//WCS working 2.0
//parseRouter("http://acdisc.sci.gsfc.nasa.gov/daac-bin/wcsAIRSL3?SERVICe=WCS&Version=1.0.0&Request=getCapabilities");
//parseRouter("http://ogi.state.ok.us/geoserver/wcs?REQUEST=GetCapabilities&SERVICE=WCS");
//WFS working 1.1.0 - 2.0
//parseRouter("http://giswebservices.massgis.state.ma.us/geoserver/wfs?SERVICE=wfs&VERSION=1.0.0&REQUEST=GetCapabilities");
//parseRouter("http://www.pegelonline.wsv.de:80/webservices/gis/aktuell/wfs?Service=WFS");
//CSW working (metadata missing)
//parseRouter("http://www.ogcnetwork.net/system/files/csw-capabilities.xml.txt?service=CSW");
//SOS working 1.0.0
//parseRouter("http://weatherstation.cti.ac.at:8080/52nSOSv3_CUAS/sos?Service=SOS");
//parseRouter("http://sensorweb.demo.52north.org/PegelOnlineSOSv2.1/sos?service=SOS");
//KML working
//parseRouter("https://developers.google.com/kml/documentation/KML_Samples.kml");
//GML working 2.1.2
//parseRouter("http://mamo-net.de/feature/boris/complexPoly.xml");
//microformats working
//parseRouter("http://microformatshiv.com/h-geo.html");

//takes a service string and routes it to the right parser
exports.parseRouter = function (_url, res) {
	//get the detected service and route the url to the right parser
	//var URL = new Parser(_url.body.url);
	var uri = _url.body.url;
	//console.log(typeof URL.url);
	switch (detect(uri)) {

		case "WMS":
			console.log("WMS router started");
			var getCbs = builder.buildWMS(uri);
			parser.parseWMS(getCbs, res);
			break;
		case "WCS":
			console.log("WCS router started");
			var getCbs = builder.buildWCS(uri);
			parser.parseWCS(getCbs, res);
			break;
		case "WFS":
			console.log("WFS router started");
			var getCbs = builder.buildWFS(uri);
			parser.parseWFS(getCbs, res);
			break;
		case "CSW":
			console.log("CSW router started");
			var getCbs = builder.buildCSW(uri);
			parser.parseCSW(getCbs, res);
			break;
		case "SOS":
			console.log("SOS router started");
			var getCbs = builder.buildSOS(uri);
			parser.parseSOS(getCbs, res);
			break;
		case "KML":
			console.log("KML router started");
			parser.parseKML(uri);
			break;
		case "GML":
			console.log("GML router started");
			parser.parseGML(uri);
			break;
		case "MICRO":
			console.log("microformats router started");
			parser.parseMicro(uri);
			break;
	}


}

//takes an url and returns the string of the service to parse
function detect(_url) {
	
	var wms = "SERVICE=WMS",
		wcs = "SERVICE=WCS",
		wfs = "SERVICE=WFS",
		csw = "SERVICE=CSW",
		sos = "SERVICE=SOS",
		kml = "KML",
		gml = "XML";
	//extract query from url
	var query = URL.parse(_url).query;
	//check if there is a query part, if yes use it for check
	if (query !== null){
		query = query.replace("?", "").split("&");
	}
	//if not use the path instead
	else {
		query = URL.parse(_url).path.split(".");
	}
	//check query/path for keywords
	if (contains(query, wms)){
		return "WMS";
	};
	if (contains(query, wcs)){
		return "WCS";
	};
	if (contains(query, wfs)){
		return "WFS";
	};
	if (contains(query, csw)){
		return "CSW";
	};
	if (contains(query, sos)){
		return "SOS";
	};
	if (contains(query, kml)){
		return "KML";
	}
	if (contains(query, gml)){
		return "GML";
	}
	return "MICRO";

};

//returns true if the string-array "a" contains "obj"
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].toUpperCase() === obj) {
            return true;
        }
    }
    return false;
};