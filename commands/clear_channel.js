const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

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
		else if (limit > 100 || limit <= 0) {
			await interaction.reply("limits[1-100]");
			return ;
		}
		const fetched = await interaction.channel.messages.fetch({limit: limit});
		interaction.channel.bulkDelete(fetched, true);
		await interaction.reply({content: "Done!", ephemeral: true});
	}
}