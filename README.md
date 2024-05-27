# LRC DigiSign for Web

Initially build for Apple tvOS, this rebuild for web enables the LRC to run the application on different devices tailored for a kiosk environment. 
This application leverages the LRC-server to server current information to incoming students walking into the LRC's physical location. The main features available to admins via this applicaton are
- Schedules
  - Both Scheduled and Calendar sessions (in-person) within an hour will be displayed automatically by this application.
  - Sessions with cancellatiosns, temporary updates, and altered location information (in that order) will display additional information to aid students in locating their session.
- Announcements
  - Minimized Announcements are displayed over-top of the main view, allowing admins to constantly run small announcements wwith minimal, digestable, information.
  - Maxmimized Announcements provide the entire screen realestate to announcements. Either pre-designed (requiring only an image), or requiring a background image and additional text to build an announceent on the fly. The interval at which these announcements take over the screen, along with the builder for both max and min announcements, can be accessed via the LRC Admin Console.
- Center hours
  - Configurable to display which of the included Learning Hub centers are open at present. Also editable in two different configurations (consistent or dynamic) via the admin console.
