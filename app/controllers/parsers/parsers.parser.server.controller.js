/*
    Contains functionality for parsing various formatted xml documents
    to JSON.
    @author Boris Stöcker
*/

//dependencies
var Jsonix = require('jsonix').Jsonix;
var fs = require('fs');
var getMeta = require('./parsers.getMeta.server.controller');
var parseString = require('xml2js').parseString;
var http = require('http');
var url = require("url");
var microformats = require("microformat-node");

//jsonix schema dependencies
var XLink_1_0 = require('w3c-schemas').XLink_1_0;
var WMS_1_1_0 = require('ogc-schemas').WMS_1_1_0;
var KML_2_2_0 = require('ogc-schemas').KML_2_2_0;
var Atom_1_0 = require('ogc-schemas').Atom_1_0;
var xAL_2_0 = require('ogc-schemas').xAL_2_0;


//parses a WMS-GetCapabilities-Request from XML to JSON
function parseWMS(getCbs, response) {
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaWMS(result);
                console.log("parseWMS finished.");
                response.jsonp(bbox);
                
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

//parses a WCS-GetCapabilities-Request from XML to JSON
function parseWCS(getCbs, response) {
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaWCS(result);
                response.jsonp(bbox);
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

//parses a WFS-GetCapabilities-Request from XML to JSON
function parseWFS(getCbs, response) {
    console.log("parseWFS started...");
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaWFS(result);
                response.jsonp(bbox);
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};


//parses a CSW-GetCapabilities-Request from XML to JSON
function parseCSW(getCbs, response) {
    console.log("parseCSW started...");
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaCSW(result);
                response.jsonp(bbox);
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};


//parses an SOS-GetCapabilities-Request from XML to JSON
function parseSOS(getCbs, response) {
    console.log("parseSOS started...");
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaSOS(result);
                response.jsonp(bbox);
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

//parses KML from XML to JSON
function parseKML(_url, response) {
    console.log("parseKML is started...");
    var context = new Jsonix.Context([KML_2_2_0, XLink_1_0, Atom_1_0, xAL_2_0]);
    var unmarshaller = context.createUnmarshaller();
    unmarshaller.unmarshalURL(_url,
        function(result) {
            var bbox = getMeta.getMetaKML(result);
            response.jsonp(bbox);
        });
};

//parses GML from XML to JSON
function parseGML(getCbs, response) {
    console.log("parseGML started...");
    var request = http.request(getCbs, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            parseString(data, function (err,result){
                if (err)
                    throw err;
                var bbox = getMeta.getMetaGML(result);
                response.jsonp(bbox);
            })
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};


//parses h-geo microformat from XML to JSON
function parseMicro(_url, response) {
    console.log("parseMicro is starting...");
    var options = {};
    microformats.parseUrl(_url, options, function(err,data){
        if (err){
            console.log("No valid data format!")
            throw err;
        }
        var bbox = getMeta.getMetaMicro(data);
        response.jsonp(bbox);
    })
};


//exports
exports.parseWMS = parseWMS;
exports.parseWCS = parseWCS;
exports.parseWFS = parseWFS;
exports.parseCSW = parseCSW;
exports.parseSOS = parseSOS;
exports.parseKML = parseKML;
exports.parseGML = parseGML;
exports.parseMicro = parseMicro;



//template
/*
            fs.writeFile("wmsdata.txt", JSON.stringify(result), function(err){
                if (err)
                    throw err;
                console.log("data created");
        })
*/