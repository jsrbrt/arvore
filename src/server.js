const fs = require('fs');
const http = require("http");
const path = require("path");

// Função para servir o arquivo HTML ou outros arquivos
function serveFile(res, filePath, contentType) {
	fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(500);
			res.end("Erro ao carregar a página.");
		} else {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(content, "utf-8");
		}
	});
}

// Cria o servidor HTTP
http.createServer((req, res) => {
	if (req.url === "/") {
		// Serve a página HTML
		serveFile(res, path.join(__dirname, "Arvore.html"), "text/html");
	} else if (req.url === "/script.js") {
		serveFile(res, path.join(__dirname, "script.js"), "text/javascript");
	} else if (req.url === "/vis.js") {
		serveFile(res, path.join(__dirname, "vis.js"), "text/javascript");
    } else if (req.url === "/css.css") {
		serveFile(res, path.join(__dirname, "css.css"), "text/css");
	} else if (req.url === "/ba.png") {
		serveFile(res, path.join(__dirname, "ba.png"), "image/png");
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Página não encontrada.");
	}
}).listen(3000, () => {
	console.log("Servidor rodando em http://localhost:3000");
});
