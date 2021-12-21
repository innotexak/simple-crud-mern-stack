import { gapi, CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './../component/Calendar';
export const addCalendarEvent = (startTime, address, clientName) => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });

    gapi.client.load('calendar', 'v3');
    //time zone list:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    let timeZone = 'Africa/Lagos';
    let duration = '00:30:00'; //duration of each event, here 30 minuts

    //event start time - im passing datepicker time, and making it match      //with the duration time, you can just put iso strings:
    //2020-06-28T09:00:00-07:00'

    let startDate = new Date();
    console.log(startDate);
    let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60 + Number(duration.split(':')[2])) * 1000;
    let endDate = new Date(startDate.getTime() + msDuration);
    let isoStartDate = new Date(startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0];
    let isoEndDate = new Date(endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0];

    //sign in with pop up window
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        let event = {
          summary: 'Repair booking', // or event name
          location: 'Abuja', //where it would happen
          start: {
            dateTime: isoStartDate,
            timeZone: timeZone,
          },
          end: {
            dateTime: isoEndDate,
            timeZone: timeZone,
          },
          recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
          reminders: {
            useDefault: false,
            overrides: [{ method: 'popup', minutes: 20 }],
          },
        };

        //if you need to list your events than keep it
        gapi.client.calendar.events
          .list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
          })
          .then((response) => {
            const events = response.result.items;
            console.log('EVENTS: ', events);
          });

        //end of event listing

        let request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });

        request.execute((event) => {
          console.log(event);
          window.open(event.htmlLink);
        });
      });
  });
};

// Adding event

// function addEvents(auth) {
//   var event = {
//     summary: 'Google I/O 2015',
//     location: '800 Howard St., San Francisco, CA 94103',
//     description: "A chance to hear more about Google's developer products.",
//     start: {
//       dateTime: '2015-05-28T09:00:00-07:00',
//       timeZone: 'America/Los_Angeles',
//     },
//     end: {
//       dateTime: '2015-05-28T17:00:00-07:00',
//       timeZone: 'America/Los_Angeles',
//     },
//     recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: 'email', minutes: 24 * 60 },
//         { method: 'popup', minutes: 10 },
//       ],
//     },
//   };

//   //console.log(event)

//   var calendar = google.calendar('v3');

//   calendar.events.insert(
//     {
//       auth: auth,
//       calendarId: 'primary',
//       resource: event,
//     },
//     function (err, event) {
//       if (err) {
//         console.log('There was an error contacting the Calendar service: ' + err);
//         return;
//       }
//       console.log('Event created: %s', event.htmlLink);
//     }
//   );
// }
// Listing event
// function listEvents(auth) {
// var calendar = google.calendar('v3');
// calendar.events.list({
//     auth: auth,
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime'
//     },
//     function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var events = response.items;
//     if (events.length == 0) {
//       console.log('No upcoming events found.');
//     }
//     else {
//       console.log('Upcoming 10 events:');
//       for (var i = 0; i < events.length; i++) {
//         var event = events[i];
//         var start = event.start.dateTime || event.start.date;
//         console.log('%s - %s', start, event.summary);
//     }
//     }
//   });
// }
