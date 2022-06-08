const CryptoJS = require("crypto-js");

const SECRET_KEY = "I know I should put it in dotenv file but I'm too lazy for that :)";

function encrypto(path) {
	var b64 = CryptoJS.AES.encrypt(path, SECRET_KEY).toString();
	var e64 = CryptoJS.enc.Base64.parse(b64);
	var eHex = e64.toString(CryptoJS.enc.Hex);
	return eHex;
}

function decrypto(path) {
	var reb64 = CryptoJS.enc.Hex.parse(path);
	var bytes = reb64.toString(CryptoJS.enc.Base64);
	var decrypt = CryptoJS.AES.decrypt(bytes, SECRET_KEY);
	var plain = decrypt.toString(CryptoJS.enc.Utf8);
	return plain;
}

module.exports = {
	encrypto,
	decrypto,
};
