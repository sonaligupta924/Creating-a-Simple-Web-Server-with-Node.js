
const http = require("http");
const fs = require("fs");
const path = require("path");


const serverFile = (filePath, res, contentType,  statusCode = 200) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  let filePath;
switch (req.url) {
    case "/":
    case "/home":
    filePath = path.join(__dirname, "public", "home.html");
    serverFile(res, filePath, "text/html");
    break;
    case "/about":
     filePath = path.join(__dirname, "public", "about.html");
    serverFile(res, filePath, "text/html");
      break;
    case "/contact":
      filePath = path.join(__dirname, "public", "contact.html");
      serverFile(res, filePath, "text/html");
      break;
    case "/style.css":
      filePath = path.join(__dirname, "public", "style.css");
       serverFile(res, filePath, "text/css");
      break;
    default:
      filePath = path.join(__dirname, "public", "404.html");
       serverFile(res, filePath, "text/html", 404);
      break;
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});