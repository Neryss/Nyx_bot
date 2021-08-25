const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");

module.exports = function	mhw_search(msg, name)
{
	fetch("https://mhw-db.com/ailments")
	.then(function (response) {
		return (response.json());
	}).then(function (data) {
		const test = JSON.stringify(data, null, 4);
		fs.writeFile("./test.txt", test, function(ferr) {
			if (ferr)
				return (console.log("oopsi : " + err));
		});
		console.log(test);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}