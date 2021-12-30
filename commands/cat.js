const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Get the meow meow'),
	async execute(interaction) {
		let response = await axios.get("https://api.thecatapi.com/v1/images/search")
		console.log(response.data[0].url);
		await interaction.reply(response.data[0].url);
	},
};