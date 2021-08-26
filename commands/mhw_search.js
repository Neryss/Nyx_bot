const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");

function	put_star(nb)
{
	return (Array(nb).join("<:star:880281496315899955>"));
}

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
					.setTitle(data[i].name)
					.addField("Weaknesses :", "\u200b");
				console.log("found " + data[i].name + " weaknesses : " + JSON.stringify(data[i].weaknesses, null, 4));
				e_weak = data[i].weaknesses;
				for (var j = 0; j < e_weak.length; j++)
				{
					if (e_weak[j].stars > 1)
						weakness.addField(e_weak[j].element + " : ", put_star(e_weak[j].stars), false);
					console.log(j);
				}
				weakness.setFooter(
					"Nyx",
					"https://cdn.discordapp.com/attachments/840208014722990080/845232845912145950/takane_enomoto_10229.jpeg",
				);
				msg.channel.send(weakness);
				break;
			}
		}
		fs.writeFile("./test.txt", JSON.stringify(e_weak, null, 4), function(ferr) {
			if (ferr)
				return (console.log("oopsi : " + err));
		});
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}