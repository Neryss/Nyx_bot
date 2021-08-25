const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");

module.exports = function	mhw_search(msg, name)
{
	fetch("https://mhw-db.com/monsters")
	.then(function (response) {
		return (response.json());
	}).then(function (data) {
		for (var i = 0; i < data.length; i++)
		{
			if (data[i].name == "Odogaron")
			{
				const test = JSON.stringify(data[i], null, 4);
				console.log("HERE IT IS : " + test);
				break;
			}
		}
		fs.writeFile("./test.txt", test, function(ferr) {
			if (ferr)
				return (console.log("oopsi : " + err));
		});
		console.log(test);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}