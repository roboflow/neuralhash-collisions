var fs = require("fs");
var _ = require("lodash");
var async = require("async");
var md5 = require("md5-file");

var handChecked = fs.readFileSync("verified.txt", "utf-8").split("\n");

var lines = fs.readFileSync("hashes.txt", "utf-8").split("\n");

lines = _.map(lines, function(line) {
	var parts = line.split(" ");
	if(parts.length != 2) return;
	return {
		file: parts[0],
		hash: parts[1]
	};
});

lines = _.filter(lines);

lines = _.sortBy(lines, "hash");

var duplicates = {};
var cur, matchesPrev, matchesNext;
for(var i=0; i<lines.length; i++) {
	cur = lines[i];
	matchesPrev = lines[i-1] && lines[i-1].hash == cur.hash;
	matchesNext = lines[i+1] && lines[i+1].hash == cur.hash;

	if(matchesPrev || matchesNext) {
		if(!duplicates[cur.hash]) duplicates[cur.hash] = [];
		duplicates[cur.hash].push(cur.file);
	}
}

var html = "<html><head><title>ImageNet NeuralHash Collisions</title><body>";
html += "<h1>Images Checked: " + lines.length + "</h1>";
html += "<h3>Total Duplicates: " + _.size(duplicates) + "</h3>";
html += "<h3>Hand Verified as Same: " + _.size(handChecked) + "</h3>";
async.eachOfLimit(duplicates, 5, function(files, hash, cb) {
	// resizes, re-encodings, crops (human verified to not be real collisions)
	if(handChecked.includes(hash)) {
		// console.log([hash, files.join(", ")].join(", "));
		return cb(null);
	}

	async.map(files, function(file, cb) {
		md5(file).then(function(hash) {
			cb(null, hash);
		}).catch(function() {
			cb(null);
		});
	}, function(error, hashes) {
		if(_.uniq(_.filter(hashes)).length > 1) {
			//console.log("DUPLICATES FOUND FOR HASH", hash);
			//console.log("files", files);
			//console.log("md5s", hashes);
			//console.log("");

			html += hash + "<br />";
			html += _.map(files, function(file) {
				return "<img src='/" + file + "' style='height:200px;' /> ";
			}).join("") + "<br /><br /><br />";
		} else {
			console.log([hash, hashes && hashes[0] || "md5 error", files.join(", ")].join(", "));
		}
		cb(null);
	});
}, function() {
	html += "</body></html>";
	fs.writeFileSync("collisions.html", html);
	//console.log("Done!");
});
