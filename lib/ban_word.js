function detect_string(string, find) {
	const known = new Array();
	var j = 0
	for (i = 0; i < string.length; i++) {
		if ((string[i].toLowerCase() == find[j])) {
			console.log(`found ${string[i]}`)
			known.push([string[i].toLowerCase(), i]);
			j++;
		}
		else if (string[i] == ' ')
			known.push([' ', i]);
	}
	console.log(known)
	if (j == find.length)
		return (known);
	else
		return (-1)
}

String.prototype.replaceAt = function (index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function treat_output(array, size) {
	console.log(size);
	var tab = new Array(size + 1).join("*");
	for (i = 0; i < array.length; i++) {
		console.log(array[i][0])
		console.log(array[i][1])
		tab = tab.replaceAt(array[i][1], array[i][0]);
	}
	console.log(`tab: ${tab}`);
	return (tab);
}


module.exports = {
	getValue: (msg) => {
		var res = detect_string(msg, "connard")
		if (res == -1)
			return (-1);
		else
		{
			var aled = treat_output(res, msg.length);
			return aled
		}
	}
}
