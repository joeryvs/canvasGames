const { readFile, readlink } = require("fs");
const http = require("http");
const { pathToFileURL } = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const path = req.url;
  const path2 = pathToFileURL(req.url);
  console.log(req.url);
  console.log(req.headers.accept);
  console.log(req.method);
  switch (req.method) {
    case "GET":
      readFile(req.url.substring(1), { encoding: "utf8" }, (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 404;
          res.end();
          return;
        }

        // console.log(data);
        res.statusCode = 200;
        res.setHeader("Content-Type", req.headers.accept.substring(0,req.headers.accept.indexOf("/")));
        res.write(data);

        res.end();
        return data;
      });
      break;

    default:
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/index.html`);
});
