const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");

module.exports = function	mhw_search(msg)
{
	fetch("https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki")
	.then(function (response) {
		return (response.text());
	}).then(function (html) {
		fs.writeFile("./test.txt", html, function(ferr) {
			if (err)
				return (console.log("oopsi : " + err));
		});
		console.log(html);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}