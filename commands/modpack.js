const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modpack")
		.setDescription("Link to the currently used modpack!"),
	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply({embeds: [global.e_status]})
	}
}