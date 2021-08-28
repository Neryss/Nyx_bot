const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("issue")
		.setDescription("reports an issue")
		.addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute (interaction) {
		const issue = interaction.options.getString('input');
		console.log(issue);
		client.users.cache.get(process.env.MY_ID).send("<@" + interaction.user.tag + "> has reported an issue!\n\"" + issue + "\"");
	}
}