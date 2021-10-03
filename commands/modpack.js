const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modpack")
		.setDescription("Link to the currently used modpack!"),
	async execute(interaction) {
		await interaction.reply({embed: [e_status]})
	}
}