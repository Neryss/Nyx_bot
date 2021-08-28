require("dotenv").config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
const guildID = process.env.TS_GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const client_id = process.env.CLIENT_ID;

const commands = [
	new SlashCommandBuilder().setName("ping").setDescription("You guessed it"),
	new SlashCommandBuilder().setName("test").setDescription("echoes test"),
	new SlashCommandBuilder().setName("user").setDescription("send user infos"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
console.log("token " + process.env.DISCORD_TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(client_id, guildID),
			{body: commands},
		);
		console.log("Commands registered");
	} catch (err) {
		console.log(err);
	}
})();
