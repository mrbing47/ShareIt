const readFolder = require("./utils/readFolder");
const { encrypto, decrypto } = require("./utils/crypto");
const getIP = require("./utils/ip");
const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../ui/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ROOT = process.env.ROOT || "E:\\Torrent\\Code With Mosh - Mastering React";

app.get("/", async (req, res) => {
	try {
		res.render("index", { files: await readFolder(ROOT), path: encrypto("/") });
	} catch (err) {
		res.send(err);
	}
});

app.get("/:path/:isFile/:file/", async (req, res) => {
	const fileReq = path.join(decrypto(req.params.path), decrypto(req.params.file));
	const currPath = path.join(ROOT, fileReq);
	try {
		if (parseInt(req.params.isFile)) {
			res.download(currPath);
			return;
		}
		res.render("index", { files: await readFolder(currPath), path: encrypto(fileReq) });
	} catch (err) {
		res.send(err);
	}
});

// app.post("/download", (req, res) => {
// 	const reqPath = req.body.path;
// 	const files = req.body.files;
// 	const data = [];
// 	for (let i of files) {
// 		data.push({ path: path.join(reqPath, i), name: i });
// 	}

// 	res.zip(data);
// 	res.send("hello");
// });

app.listen(4769, async () => {
	console.log("Listening to PORT 4769");

	const IPs = getIP();
	console.log(`\nUse these IPs to connect over with PORT \x1b[32m4769\x1b[0m :`);
	for (let i in IPs) {
		console.log(i, "=>", IPs[i]);
	}
});
