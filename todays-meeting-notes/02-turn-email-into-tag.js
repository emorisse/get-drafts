// turn email address into todoist searchable label
function email_clean(l) {
  if (l.match(/.@/)) {
    let t = 0
    l = l.replace(/(.)@/g, "$1_")
    if(! l.match(/^@/)) {
      l = "@" + l
    }
  }
  l.replace(/\*/g,"")
  return(l)
}