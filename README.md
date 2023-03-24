# Firebase Element 🔥

Users are prompted to create an account using their email and password.

From there, users can login, update their username and password, and send a reset email if they forgot their password.

Data for each user is stored in the Realtime Database and renders when the user is logged in

Every contestant has a uid that is pushed and stored on the Realtime database upon selection

# Queen of Cards 🏁

## Racers! Start your engines, and may the best developer WIN!

The code takes all of the uids in the Realtime database and compares them to an object in the code files
It find the matching contestant object and renders their data into a card

The object containing all of the contestant information was generated via a webscraper I developed

Users can see the contestant's season, placements, and number of wins to help them pick their favorites

There is a maximum of 5 contestants per user, a pop up alerts the user when they need to remove a contestant before they add another

If users want to learn more about their favorite queens links to their Fandom pages are provided on their card.

### Don't see your favorite season 15 contenstant?

Don't worry! They will be added after the end of the season.
