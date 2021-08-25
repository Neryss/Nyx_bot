const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");

module.exports = function	mhw_search(msg, name)
{
	msg.channel.send(name[1]);
	fetch("https://monsterhunterworld.wiki.fextralife.com/" + name[1])
	.then(function (response) {
		return (response.text());
	}).then(function (html) {
		fs.writeFile("./test.txt", html, function(ferr) {
			if (ferr)
				return (console.log("oopsi : " + err));
		});
		console.log(html);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}