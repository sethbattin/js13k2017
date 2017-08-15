const ZipFile = require("yazl").ZipFile;
const { readFileSync, createWriteStream } = require("fs");
const { join } = require("path");

const js13k = new ZipFile();
js13k.addFile (join(__dirname, "..", "public", "app.min.js"), "app.js");
js13k.addFile (join(__dirname, "..", "public", "index.html"), "index.html");

const output = createWriteStream(join(__dirname, "..", "js13k.zip"));
js13k.outputStream.on('data', (data) => { output.write(data); });
js13k.outputStream.on('end', () => output.end() );
js13k.end();
