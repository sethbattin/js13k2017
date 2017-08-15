var fs = require( "fs" );
var path = require( "path" );
var filePath = path.resolve(__dirname, "..", "js13k.zip");
var stat = fs.statSync(filePath);

var LIMIT = 13000;
var humanReadable = (stat.size / 1000).toFixed(1) + "kb"; 
if (stat.size > LIMIT) {
  console.warn("Zip size (" + stat.size + ") limit exceeded.");
} else { 
  console.log("Current size: " + humanReadable);
}

