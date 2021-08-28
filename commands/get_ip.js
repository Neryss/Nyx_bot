const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Gives you the MC server ip'),
	async execute(interaction) {
		await interaction.reply(`There you go: ${ip}`);
	},
};