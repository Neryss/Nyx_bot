const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("issue")
		.setDescription("reports an issue")
		.addStringOption(option => option.setName('input').setDescription('Issue to report')),
	async execute (interaction) {
		const issue = interaction.options.getString('input');
		console.log(issue);
		client.users.cache.get(process.env.MY_ID).send("<@" + interaction.user.id + "> has reported an issue!\n\"" + issue + "\"");
		await interaction.reply({content: "Issue sent !", ephemeral: true});
	}
}