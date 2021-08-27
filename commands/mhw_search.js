const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
generate = false;

function	put_star(nb)
{
	return (Array(nb + 1).join("<:star:880281496315899955>"));
}

function check_ailments(weak)
{
	if (weak.element == "poison" || weak.element == "sleep"
	|| weak.element == "paralysis" || weak.element == "blast"
	|| weak.element == "stun")
	return (true);
	return (false);
}

function	treat_data(data, name, msg, iceborne)
{
	var found = 0;
	for (var i = 0; i < data.length; i++)
	{
		console.log("i is ; " + i);
		if (data[i].name.toLowerCase() == name.join(' '))
		{
			found++;
			weakness = new Discord.MessageEmbed()
			.setColor("#ff0080")
			.setTitle(data[i].name)
			.addField("Inflicts : ", "(ailments inflicted by the monster)");
			console.log("found " + data[i].name + " weaknesses : " + JSON.stringify(data[i].weaknesses, null, 4));
			e_inflicts = data[i].ailments;
			for (var j = 0; j < e_inflicts.length; j++)
				weakness.addField(e_inflicts[j].name, "<:skull:880625774091178085>", true);
			weakness.addField("\u200b", "----------------------------------------------------------");
			e_weak = data[i].weaknesses;
			weakness.addField("Weaknesses :", "(absent elements = resist/no effects)");
			for (var j = 0; j < e_weak.length; j++)
				if (e_weak[j].stars > 1 && !check_ailments(e_weak[j]))
					weakness.addField(e_weak[j].element + " : ", put_star(e_weak[j].stars), true);
			weakness.addField('\u200b', '----------------------------------------------------------')
			.addField("Ailments :", "(absent elements = resist/no effects)");
			for (j = 0; j < e_weak.length; j++)
				if (e_weak[j].stars > 1 && check_ailments(e_weak[j]))
					weakness.addField(e_weak[j].element + " : ", put_star(e_weak[j].stars), true);
			weakness.setFooter(
				"Nyx",
				"https://cdn.discordapp.com/attachments/840208014722990080/845232845912145950/takane_enomoto_10229.jpeg",
				);
				msg.channel.send(weakness);
				break;
			}
		}
		if (!iceborne)
		{
			fs.writeFile("./monster_db.json", JSON.stringify(data, null, 4), function(ferr) {
				if (ferr)
					return (console.log("oopsi : " + err));
			});
		}
		if (!found)
			return (1);
		return (0);
}

function	iceborne_search(name, data, msg)
{
	console.log("Couldn't find any occurence in mhw db, searching through Iceborne...");
	fs.readFile("./iceborne_db.json", function (err, data) {
		try
		{
			data = JSON.parse(data);
			console.log(JSON.stringify(data, null, 4));
			treat_data(data, name, msg, 1);
		}
		catch (e)
		{
			console.log("Error during iceborne parsing/searching :" + err);
		}
	})
}

function	generate_ailments_db()
{
	fetch("https://mhw-db.com/ailments")
	.then(function (response) {
		return (response.json());
	}).then (function (data) {
		fs.writeFile("./ailments_db.json", JSON.stringify(data, null, 4), function (ferr) {
			if (ferr)
				return (console.log("Error : " + ferr));
		})
	}).catch(function (err) {
		console.warn("Something went wrong : " + err);
	})
}

function	generate_and_search(name, msg)
{
	console.log("FILE DOESN'T EXIST");
	fetch("https://mhw-db.com/monsters")
	.then(function (response) {
		return (response.json());
	}).then(function (data) {
		if (treat_data(data, name, msg, 0) == 1)
			iceborne_search(name, data, msg);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}

function search_all(name, msg)
{
	console.log("FILE EXISTS");
	fs.readFile("./monster_db.json", function (err, data) {
		try
		{
			data = JSON.parse(data);
			console.log("Treat existing data");
			if (treat_data(data, name, msg, 0) == 1)
				iceborne_search(name, data, msg);
		}
		catch (e)
		{
			console.log(err);
		}
	})
}

module.exports = function	mhw_search(msg, name)
{
	name.shift();
	for (var i = 0; i < name.length; i++)
	name[i].toLowerCase();
	console.log("called search");
	if (!fs.existsSync("./monster_db.json"))
		generate_and_search(name, msg);
	else
		search_all(name, msg);
	if (generate)
		generate_ailments_db();
}