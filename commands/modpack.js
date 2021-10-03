const { SlashCommandBuilder } = require('@discordjs/builders');
module.export = e_status = new MessageEmbed()
	.setColor('#ff0080')
	.setTitle('Modpack link')
	.setURL(process.env.MODPACK_URL)
	.addField('Modpack version', global.mc_server.version)
	.addField('Infos:', 'If the modpack is out of date or seems to not be accurate, tell <@227429963882692608>!')
	.setTimestamp()
	.setFooter(
		'Nyx',
		'https://cdn.discordapp.com/attachments/840208014722990080/845232845912145950/takane_enomoto_10229.jpeg',
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modpack")
		.setDescription("Link to the currently used modpack!"),
	async execute(interaction) {
		await interaction.reply({embed: [e_status]})
	}
}