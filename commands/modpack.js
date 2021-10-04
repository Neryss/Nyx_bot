const { SlashCommandBuilder } = require('@discordjs/builders');
const Index = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modpack")
		.setDescription("Link to the currently used modpack!"),
	async execute(interaction) {
		await interaction.deferReply();
		console.log("CECI EST UN INDEX");
		console.log(global.e_status);
		await interaction.editReply({embeds: [global.e_status]})
	}
}