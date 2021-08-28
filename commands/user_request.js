const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("returns your infos"),
	async execute(interaction) {
		await interaction.reply(`Tag: ${interaction.user.tag}\nId: ${interaction.user.id}`);
	}
}