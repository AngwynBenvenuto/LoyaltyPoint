#!/usr/bin/env node

// ## Automatically sign and align apk built in Ionic v3 ##
//
// 1. Just add this script into the folder `/hooks/after_build` on the project's root.
// 2. Change the string values to the locations of each file in your system
// 3. Build your android project
//
// Optional: If you wish your add version number to the output's filename make sure you've node installed 'fs' and 'xml2js'.
// You can also use my gist [increment_version.js](https://gist.github.com/RaschidGithub/636aac1841fdc2dbc2407cfc9d57df4c)
// to increment automatically version number on each build.

//Change Folder
const ABSOLUTE_PATH = 'C:/Users/ITTRON15' //change with your
const PATH_ANDROID = '/AppData/Local'
const FOLDER = '/vendorapp'
const VERSION = 'release'

// ===================================
// Change these values to your system's
// ===================================
const KEYSTORE_PATH = 'vendorapp.jks'	// Relative to project's root (or the folder where this script is being executed from)
const ZIPALIGN_PATH = ABSOLUTE_PATH + PATH_ANDROID + '/Android/android-sdk/build-tools/28.0.2/zipalign'
const APK_PATH = ABSOLUTE_PATH + FOLDER + '/platforms/android/build/outputs/apk/' + VERSION + '/android-release-unsigned.apk'
const ALIAS = 'vendorapp'
const PWD = 'ittronoke'
const OUTPUT_PATH = ABSOLUTE_PATH + FOLDER + '/platforms/android/build/outputs/apk/' + VERSION + '/android-release-unsigned.apk'
// ===================================

startJob();

function signAndAlignApk(output) {
	const { spawn } = require('child_process');

	let command = 'jarsigner';
	let args = ['-verbose', '-sigalg', 'SHA1withRSA', '-digestalg', 'SHA1', '-keystore', KEYSTORE_PATH, APK_PATH, ALIAS];

	console.log('Sign apk: %s', 'jarsigner ' + args.join(' '));
	let child = spawn(command, args);

	// Enter password
	child.stdin.setEncoding('utf-8');
	child.stdin.write(PWD + "\n");
	child.stdin.end();

	child.stdout.on('data', (data) => {
		console.log(`SignApk stdout: ${data}`);
	});

	child.stderr.on('data', (data) => {
		console.log(`SignApk stderr: ${data}`);
	});

	child.on('close', (code) => {
		console.log(`Apk Signed`);
		alignApk(output);
	});
}

function alignApk(output) {
	const { exec } = require('child_process');
	let command = '"' + ZIPALIGN_PATH + '" -v 4 "' + APK_PATH + '" "' + output + '"';
	console.log("Align apk: %s", command);

	exec(command,
		(err, stdout, stderr) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("stdout");
			console.log("Apk signed and aligned!");

		});
}

function getVersion(callback) {
	console.log('Get version:');

	try {
		var fs = require('fs');
		var xml2js = require('xml2js');

		// Read config.xml
		fs.readFile('config.xml', 'utf8', function (err, data) {
			if (err) {
				console.log(err);
				callback(null);
				return;
			}

			// Get XML
			var xml = data;

			// Parse XML to JS Obj
			xml2js.parseString(xml, function (err, result) {
				if (err) {
					console.log(err);
					callback(null);
					return;
				}

				// Get version inside widget attributes or create it
				var obj = result;
				var version = obj['widget']['$']['version'];
				console.log(version);
				callback(version);
				return;
			})
		})
	}catch (e){
		console.warn("Couldn't read version from config.xml file. Make sure you've node installed 'fs' and 'xml2js' if you wish to also add version number to your ouput filename ");
		callback(null);
	}
}

function startJob() {
	getVersion(v => {
		let output = OUTPUT_PATH;
		//if (v) output = output.replace('.apk', '') + '_r' + v + '.apk';
		signAndAlignApk(output);
	});
}