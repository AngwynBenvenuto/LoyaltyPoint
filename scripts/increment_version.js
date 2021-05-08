#!/usr/bin/env node
// This script increments patch number (mayor.minor.patch) but you can
// choose to increment any other segment by modifying lines `45` to `53`.
//
// 1. Make sure you've installed *xml2js*: `$ npm install xml2js -D`
// 2. Save this file under `project_root/hooks/before_prepare/`
// 3. Done!

var fs = require('fs');
var xml2js = require('xml2js');

// Read config.xml
fs.readFile('config.xml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Get XML
  var xml = data;

  // Parse XML to JS Obj
  xml2js.parseString(xml, function (err, result) {
    if (err) {
      return console.log(err);
    }

    // Get version inside widget attributes or create it
    var obj = result;
    var version = obj['widget']['$']['version'];
    if (!version) version = "0.1";
     
    var mayor = version.split('.')[0];
    var minor = version.split('.')[1];
    var patch = version.split('.')[2];

    mayor = mayor ? mayor : '0';
    minor = minor ? minor : '0';
    patch = patch ? patch : '0';
    // ----------------------------------------------------
    // Increment patch: you can change it to incremente
    // the segment you prefer: mayor, minor or patch
    // ----------------------------------------------------
    
    // To increment patch
    patchNum = parseInt(patch);
    patchNum++;
    patch = String('000' + patchNum.toString()).slice(-3);
  
    // Uncomment to increment minor + mayor
    // if(patch > 10) { 
    //   minorNum = parseInt(minor);
    //   minorNum++;
    //   minor = minorNum.toString();

    //   if(minor > 10) {
    //     mayorNum = parseInt(mayor);
    //     mayorNum++;
    //     mayor = mayorNum.toString();
    //   }
    // }

    // Join segments into string
    version = [mayor, minor, patch].join('.');

    //ios-CFBundleVersion doesn't exist
    if(typeof obj['widget']['$']['ios-CFBundleVersion'] === 'undefined') {
      obj['widget']['$']['ios-CFBundleVersion'] = 0;
    }
    // android-versionCode doen't exist in config.xml
    if(typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['android-versionCode'] = 0;
    }

    obj['widget']['$']['ios-CFBundleVersion'] = (mayor + minor + String('000' + (patchNum)).slice(-3));
    obj['widget']['$']['android-versionCode'] = (mayor + minor + String('000' + (patchNum)).slice(-3));
    obj['widget']['$']['version'] = version;

    // Build XML from JS Obj
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);

    // Write config.xml
    fs.writeFile('config.xml', xml, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('Version incremented to %s', version);
    });

  });
});