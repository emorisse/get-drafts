// created by @FlohGro
// Todoist import todoist filter

const epoch = new Date('01 Jan 1970 00:00:00 GMT')

let f = (filter) => {
  // create Todoist object and load projects
  let todoist = Todoist.create();
  let tasks = todoist.getTasks({
    "filter": filter    })


    if (todoist.lastError) {
      alert(todoist.lastError)
      return false
    }

    //  console.log(JSON.stringify(tasks[0]));

    let sorted_tasks = tasks.sort(function compare(a, b) {
      var dateA = epoch
      var dateB = epoch
      if (typeof(a.due) !== "undefined") {
        dataA = new Date(a.due.date);
      }
      if (typeof(b.due) !== "undefined") {
        dateB = new Date(b.due.date);
      }
      return dateA - dateB;
    });

    let content = [];
    let date_section = "No Date";
    content.push("# " + filter)

    for (let task of sorted_tasks) {
      let s = "";
      if (task.due && task.due.date) {
        if (!(date_section === task.due.date)) {
          date_section = task.due.date;
          content.push("\n## " + date_section + "\n");

        }
      }
      s = s + "- [ ] " + task.content;
      content.push(s);


    }
    d.content = d.content + "\n" + content.join("\n"); // + filters.join("\n")
    d.update();
    return true;
  }

for (let filter of filters) {
	if (!f(filter)) {
  		context.fail();
	}
}
