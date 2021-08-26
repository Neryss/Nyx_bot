const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

module.exports = function	mhw_search(msg, name)
{
	console.log("called search");
	fetch("https://mhw-db.com/monsters")
	.then(function (response) {
		console.log("Fetch done");
		return (response.json());
	}).then(function (data) {
		for (var i = 0; i < data.length; i++)
		{
			console.log("i is ; " + i);
			if (data[i].name.toLowerCase() == name[1].toLowerCase())
			{
				weakness = new Discord.MessageEmbed()
					.setColor("#ff0080")
					.setTitle(JSON.stringify(data[i].name));
				console.log("found " + data[i].name + " weaknesses : " + JSON.stringify(data[i].weaknesses, null, 4));
				e_weak = data[i].weaknesses;
				for (var j = 0; j < e_weak.length; j++)
				{
					weakness.addField(JSON.stringify(e_weak[j].element) + " : " + JSON.stringify(e_weak[j].stars));
					console.log(j);
				}
				// test = JSON.stringify(data[i].weaknesses, null, 4);
				console.log("JE SUIS LA");
				msg.channel.send(weakness);
				console.log("HERE IT IS : " + test);
				break;
			}
		}
		fs.writeFile("./test.txt", JSON.stringify(e_weak, null, 4), function(ferr) {
			if (ferr)
				return (console.log("oopsi : " + err));
		});
		console.log(test);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}