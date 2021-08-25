const fetch = require("node-fetch")

module.exports = function	mhw_search(msg)
{
	fetch("https://monsterhunterworld.wiki.fextralife.com/Monster+Hunter+World+Wiki")
	.then(function (response) {
		
		return (response.text());
	}).then(function (html) {
		console.log(html);
	}).catch(function (err) {
		console.warn("Something went wrong : ", err);
	});
}