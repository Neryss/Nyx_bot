const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

weakness = new Discord.MessageEmbed()
	.setColor("#ff0080");
module.exports = function	mhw_search(msg, name)
{
	fetch("https://mhw-db.com/monsters")
	.then(function (response) {
		return (response.json());
	}).then(function (data) {
		for (var i = 0; i < data.length; i++)
		{
			console.log("name : " + name[1].toLowerCase());
			if (data[i].name.toLowerCase() == name[1].toLowerCase())
			{
				console.log(data[i].weaknesses);
				e_weak = data[i].weaknesses;
				for (var j = 0; j < e_weak.length; i++)
					weakness.addField(e_weak[j].element);
				// test = JSON.stringify(data[i].weaknesses, null, 4);
				console.log("JE SUIS LA");
				msg.channel.send(weakness);
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