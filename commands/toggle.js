module.exports = function toggle()
{
	global.toggle = !global.toggle;
	console.log(global.toggle);
}