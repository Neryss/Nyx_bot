const { SlashCommandBuilder } = require('@discordjs/builders');
const mh = require('./mhw_search');

function	rise_search(name, interaction)
{
	return new Promise(resolve => {
		console.log("Now searching through Rise...")
		fs.readFile("./db/rise_monster_db.json", async function (err, data) {
			try
			{
				data = JSON.parse(data);
				resolve(await mh.treat_data(data, name, interaction, 1));
			}
			catch(e)
			{
				console.log(e);
			}
		})
	})
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rise")
		.setDescription("Search for a MH Rise monster stats")
		.addStringOption(option =>
			option.setName('name')
			.setDescription("monster to search for")
			.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const name = interaction.options.getString('name');
		for (var i = 0; i < name.length; i++)
			name[i].toLowerCase();
		await rise_search(name, interaction);
	}
}