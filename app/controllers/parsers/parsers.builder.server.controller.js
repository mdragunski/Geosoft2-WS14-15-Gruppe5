/*
	Contains functionality for manipulation of an incoming url
	to retrieve metadata.
	@author Boris Stöcker
*/



//dependencies
var url = require("url");

//takes an url and returns it without its parameters
function buildURL(_url){
	var protocol = url.parse(_url).protocol;
	var pathname = url.parse(_url).pathname;
	var host = url.parse(_url).host;
	var noParams = protocol + "//" + host + pathname;
	return noParams;
}

//takes an url and returns a GetCapabilities-Request for WMS
function buildWMS(_url) {
	var result = buildURL(_url) + "?REQUEST=GetCapabilities&SERVICE=WMS";
	console.log("Finished changing url for GetCapabilities request: \n" + result);
	return result;
};

//takes an url and returns a GetCapabilities-Request for WCS
function buildWCS(_url) {
	var result = buildURL(_url) + "?Request=getCapabilities&Service=WCS";
	console.log("Finished changing url for GetCapabilities request: \n" + result);
	return result;
};

//takes an url and returns a GetCapabilities-Request for WFS
function buildWFS(_url) {
	var result = buildURL(_url) + "?Service=WFS&Request=getCapabilities";
	console.log("Finished changing url for GetCapabilities request: \n" + result);
	return result;
};

//takes an url and returns a GetCapabilities-Request for CSW
function buildCSW(_url) {
	var result = buildURL(_url) + "?Service=CSW&Request=getCapabilities";
	console.log("Finished changing url for GetCapabilities request: \n" + result);
	return result;
};

//takes an url and returns a GetCapabilities-Request for SOS
function buildSOS(_url) {
	var result = buildURL(_url) + "?Service=SOS&Request=getCapabilities";
	console.log("Finished changing url for GetCapabilities request: \n" + result);
	return result;
};


//exports
exports.buildWMS = buildWMS;
exports.buildWCS = buildWCS;
exports.buildWFS = buildWFS;
exports.buildCSW = buildCSW;
exports.buildSOS = buildSOS;