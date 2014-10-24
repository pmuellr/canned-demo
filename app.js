fs     = require("fs")
http   = require("http")
path   = require("path")

cfenv  = require("cfenv")
canned = require("canned")

appEnv = cfenv.getAppEnv()
logger = process.stdout

cannedDir = path.join("node_modules", "canned", "example", "comment")

try {
  stats = fs.statSync(cannedDir)
  if (!stats.isDirectory()) {
    console.log("error: canned dir is not a directory: " + cannedDir)
  }
}
catch (e) {
  console.log("error: canned dir is not valid: " + cannedDir)
}

console.log("serving canned responses from: ", cannedDir)

cannedOpts = {
  logger: logger,
  cors:   true,
}

cannedHandler = canned(cannedDir, cannedOpts)

server = http.createServer(cannedHandler)

server.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url)
})
