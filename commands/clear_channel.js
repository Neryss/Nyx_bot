const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const { client } = require("../index.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clearchannel")
		.setDescription("Clears the channel (can't be reversed!)")
		.addIntegerOption(option => option.setName('limit').setDescription('limit of messages to delete')),
	async execute(interaction) {
		if (!(limit = interaction.options.getInteger('limit')))
			limit = 99;
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			await interaction.reply("Sorry you don't have the permission to execute this command!");
			return ;
		}
		const fetched = await interaction.channel.messages.fetch({limit: limit});
		interaction.channel.bulkDelete(fetched);
		await interaction.reply("Done!");
	}
}