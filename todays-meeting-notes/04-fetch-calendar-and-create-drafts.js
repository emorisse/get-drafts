// script to get all events for
// all calendars for the next 
// day, and add to a new draft
// by tf2

// get all calendars
let cals = Calendar.getAllCalendars();

// set a header string to hold
// the result 
aDate = new Date();

aStr = aDate.getFullYear()+'-' + (pad2(aDate.getMonth()+1)) + '-'+ pad2(aDate.getDate());
//result = "# Today's Agenda for ";
//result += aStr + "\n\n";
result = ""

filters = []

// cycle thru calendars
for (let cal of cals) {
  if (cal) {
    // set today & tomorrow
    let today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    today = new Date(today);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // get all events
    let events = cal.events(today, tomorrow);
    // cycle thru each event
    for (let event of events) {
    	let filters = []
      // get start date
      let start = event.startDate;
      // get hour, minutes
      let st_hour = start.getHours();
      let st_min = pad2(start.getMinutes());
      let attendees = event.attendees
      if ( attendees.length < 2 ) {
        continue;
      }
      let people = "## attendees\n";
      var imattending = false;
      for (let person of attendees) {
        if (person.name == me && person.status == "accepted") {
          imattending = true;
        }
        if ( person.name.match(internal) ) {
          people += "- " + person.name + " " + person.status + "\n"
        } else {
          people += "- **" + person.name + "** " + person.status + "\n"
        }
        clean = email_clean(person.name)
        if (clean !== "") {
				filters.push(clean)
			}
      }
      if (imattending == false) {
        continue;
      }
      // add to result
      if (st_hour != "00" || st_min != "00") {
        result += st_hour+":"+st_min+" — ";
        result += "\n# " + event.title;
        result += "\n";
        result += people;
        result += "\n\n";
        result += "## agenda\n" + event.notes + "\n\n"
        result += 	"## tabled items (follow up?)\n" +
							"[ ]\n\n" +
							"## action item / owner / due date\n" +
							"[ ] @waiting_on\n\n" +
							"## notes\n\n" +
							"# open todo items from attendees"
        for (const filter of filters) {
        		if (filter != me) {
	        		result += f(filter)
	        	}
        	}
      }
      let d = new Draft();
      d.content = result;
      d.addTag("agenda");
      d.update();
      result = ""
    }
  }
}


// function to ensure minutes 
// are two digits; from
// https://electrictoolbox.com/pad-number-two-digits-javascript/
function pad2(number) {
  return (number < 10 ? '0' : '') + number
}