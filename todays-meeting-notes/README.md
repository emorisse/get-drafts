# scripts
Scripts are numbered in the order they should be included in the action.

# This action relies on several interconnections.   

## Calendars:
1. It pulls events from **all** calendars your calendar app has enabled. If you're getting more drafts than you expect, check to see which calendars you have enabled.
2. You have to supply your email address in 01-configuration.js. The app uses this to make sure you've accepted a calendar event before creating a draft for you.
3. 01-configuration.js also includes a regex used to highlight external attendees 

## Todoist:
1. It relies on Todoist tags for people with the tag of email with the "@" replaced by "_". Eg. Items tagged for bob@alice.com are tagged as bob_alice.com.
2. Creates a list at the bottom with outstanding items for people who have them, eg there are any items for that email tag.

