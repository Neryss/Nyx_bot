const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
ret = new MessageEmbed();
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

function	treat_data(data, name, interaction, iceborne)
{
	var found = 0;
	for (var i = 0; i < data.length; i++)
	{
		console.log("i is ; " + i);
		if (data[i].name.toLowerCase() == name)
		{
			found++;
			weakness = new MessageEmbed()
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
				console.log("PAIN");
				// interaction.channel.send({ embeds: [weakness]});
				return ({embeds: [weakness]});
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
			return (2);
		return (0);
}

function	iceborne_search(name, data, interaction)
{
	console.log("Couldn't find any occurence in mhw db, searching through Iceborne...");
	fs.readFile("./iceborne_db.json", function (err, data) {
		try
		{
			data = JSON.parse(data);
			console.log(JSON.stringify(data, null, 4));
			return (treat_data(data, name, interaction, 1));
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

function	generate_and_search(name, interaction)
{
	console.log("FILE DOESN'T EXIST");
	fetch("https://mhw-db.com/monsters")
	.then(function (response) {
		return (response.json());
	}).then(function (data) {
		embed = treat_data(data, name, interaction, 0);
		if (embed == 2)
			return (iceborne_search(name, data, interaction));
		else
			return ({embeds: [embed]});
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}

function search_all(name, interaction)
{
	console.log("FILE EXISTS");
	fs.readFile("./monster_db.json", function (err, data) {
		try
		{
			data = JSON.parse(data);
			console.log("Treat existing data");
			embed = treat_data(data, name, interaction, 0);
			console.log(embed);
			if (embed == 2)
				return (iceborne_search(name, data, interaction));
			else
				return (embed);
		}
		catch (e)
		{
			console.log(err);
		}
	})
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("search")
		.setDescription("Search for a MHW monster stats")
		.addStringOption(option => option.setName('name').setDescription('monster to search for')),
	async execute(interaction) {
		embed = new MessageEmbed();
		const name = interaction.options.getString('name');
		console.log(name);
		for (var i = 0; i < name.length; i++)
			name[i].toLowerCase();
		console.log("called search");
		if (generate)
			generate_ailments_db()
		if (!fs.existsSync("./monster_db.json"))
			embed = generate_and_search(name, interaction);
		else
			embed = search_all(name, interaction);
		console.log("RIGHT HERE" + embed);
		await interaction.channel.send({embeds: [embed]});
		// await interaction.reply(ret);
		// await interaction.deleteReply();
	}
}