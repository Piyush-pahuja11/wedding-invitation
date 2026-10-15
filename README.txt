WEDDING INVITATION WEBSITE — HTML, CSS & JAVASCRIPT

FILES
- index.html : page structure/content
- style.css  : colours, layout, responsive styling and animations
- script.js  : couple names, date/countdown, venue, map link and optional music

HOW TO RUN
1. Keep all three files in the same folder.
2. Double-click index.html to open it in a modern browser.
3. Edit the `wedding` object near the top of script.js to personalise names/date/venue.

IMPORTANT EDITS (script.js)
- bride / groom: names shown on the cover and footer
- date: wedding date and time in ISO format, with local UTC offset
- dateLabel: date text shown on the cover
- city: city/region shown on the cover
- venue / address: venue details
- mapUrl: Google Maps URL for the venue
- musicUrl: optional direct URL to an MP3 you have permission to use

PHOTOS
Replace the image URLs in index.html and the CSS background URLs in style.css with your own photo paths, for example images/couple-1.jpg. Create an `images` folder alongside the HTML file if you use local photos.

NOTES
- The layout is an original, editable template inspired by elegant Indian wedding invitation websites, not the original private source code of Shubh Lagnam.
- Google Fonts and sample Unsplash photos require an internet connection. Replace sample photos with your own licensed images for publishing.
- A static HTML page does not store RSVP submissions. A backend or form service is needed for that.
