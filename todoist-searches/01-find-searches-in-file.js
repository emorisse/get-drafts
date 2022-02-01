let d = draft
let t = 0
var filters = []

var lines = d.content.split("\n")
for (let l of lines) {
	if (l.match(/^-\s*[\@A-Za-z0-9]/)) {
		l = l.replace(/^-\s*/,"").replace(/ .*/,"")
		if (l.match(/.@/)) {
			let t = 0
			l = l.replace(/(.)@/g, "$1_")
			if(! l.match(/^@/)) {
				l = "@" + l
			}
		}
		filters.push(l)
	}
}