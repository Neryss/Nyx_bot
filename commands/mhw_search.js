const fetch = require("node-fetch");
const fs = require("fs");
const { formatWithOptions } = require("util");
const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
generate = false;
let embed;

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

function	match_found(found, data, i)
{
	return new Promise (resolve => {
		found++;
		weakness = new MessageEmbed()
		.setColor("#ff0080")
		.setTitle(data[i].name)
		.addField("Inflicts : ", "(ailments inflicted by the monster)");
		if (data[i].icon)
		{
			try {
				weakness.setThumbnail("http://neryss.pw/icons/mhw-" + data[i].name.toLowerCase() + "_icon.png");
			}
			catch (err) {
				console.log("no thumbnail found for -" + data[i].name.toLowerCase() + "-!");
			}
		}
		e_inflicts = data[i].ailments;
		for (var j = 0; j < e_inflicts.length; j++)
			weakness.addField(e_inflicts[j].name, "<:skull:880625774091178085>", true);
		weakness.addField("\u200b", "----------------------------------------------------------")
			.addField("Resist to : ", "(resistances or immunities of the monster)")
		e_resist = data[i].resistances;
		for (var j = 0; j < e_resist.length; j++)
			weakness.addField(e_resist[j].element, "<:shield:883134123898732554>", true);
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
		embed = weakness;
	});
}

async function	treat_data(data, name, interaction, iceborne)
{
	return new Promise (resolve => {
		var found = 0;
		for (var i = 0; i < data.length; i++)
		{
			if (data[i].name.toLowerCase() == name)
			{
				match_found(found, data, i);
				break;
			}
		}
		if (!iceborne)
		{
				// console.log(JSON.stringify(data, null, 4));
				fs.writeFileSync("./db/monster_db.json", JSON.stringify(data, null, 4), function(ferr) {
					if (ferr)
						resolve(console.log("oopsi : " + err));
				});
		}
		if (!found)
			resolve(1);
		console.log("Search all returns 1");
		resolve(0);
	})
}

async function	iceborne_search(name, data, interaction)
{
	return new Promise(resolve => {
		console.log("Couldn't find any occurence in mhw db, searching through Iceborne...");
		fs.readFile("./db/iceborne_db.json", async function (err, data) {
			try
			{
				data = JSON.parse(data);
				// console.log(JSON.stringify(data, null, 4));
				resolve(await treat_data(data, name, interaction, 1));
			}
			catch (e)
			{
				console.log("Error during iceborne parsing/searching :" + err);
			}
		})
	})
}

function	rise_search(data, name, interaction)
{
	return new Promise(resolve => {
		console.log("Now searching through Rise...")
		fs.readFile("./db/rise_monster_db.json", async function (err, data) {
			try
			{
				data = JSON.parse(data);
				resolve(await treat_data(data, name, interaction, 1));
			}
			catch(e)
			{
				console.log(e);
			}
		})
	})
}

function	generate_ailments_db()
{
	return new Promise(resolve => {
		fetch("http://neryss.pw/ailments_db.json")
		.then(function (response) {
			return (response.json());
		}).then (function (data) {
			fs.writeFileSync("./db/ailments_db.json", JSON.stringify(data, null, 4), function (ferr) {
				if (ferr)
					resolve(console.log("Error : " + ferr));
			})
		}).catch(function (err) {
			console.warn("Something went wrong : " + err);
		})
	})
}

async function	generate_and_search(name, interaction)
{
	return new Promise(resolve => {
		console.log("FILE DOESN'T EXIST");
		fetch("http://neryss.pw/monster_db.json")
		.then(async function (response) {
			return (await response.json());
		}).then(async function (data) {
			if (await treat_data(data, name, interaction, 0) == 1)
				await iceborne_search(name, data, interaction);
			else
				await(rise_search(data, name, interaction));
			resolve()
		}).catch(function (err) {
			console.warn("Something went wrong : ", err);
		});
	})
}

async function search_all(name, interaction)
{
	return new Promise(resolve=>{
		console.log("FILE EXISTS");
		fs.readFile("./db/monster_db.json", async function (err, data) {
			try
			{
				data = JSON.parse(data);
				console.log("Treat existing data");
				if (await treat_data(data, name, interaction, 0) == 1)
					await iceborne_search(name, data, interaction);
				resolve()
			}
			catch (e)
			{
				console.log(err);
			}
		})
	})
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName("search")
		.setDescription("Search for a MHW monster stats")
		.addStringOption(option =>
			option.setName('name')
				.setDescription('monster to search for')
				.setRequired(true)),
	/**
	 *  @param  {Discord.CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const name = interaction.options.getString('name');
		console.log(name);
		for (var i = 0; i < name.length; i++)
			name[i].toLowerCase();
		console.log("called search");
		if (!fs.existsSync("./db/monster_db.json"))
			await generate_and_search(name, interaction);
		else
		{
			console.log("je suis dans le else");
			await search_all(name, interaction);
		}
		if (generate)
			await generate_ailments_db()
		// console.log(`----------\n${JSON.stringify(embed, null, 4)}\n----------`);
		if (embed)
			await interaction.editReply({embeds: [embed]});
		else
			await interaction.editReply("Monster not found in the db..");
	}
}