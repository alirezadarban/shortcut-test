## Pre-Install
If you are using Postgres on docker, please run:
```bash
doker-compose up -d
```
to set up the database. Otherwise, please enter your database credential in `app.module.ts` lines 12 to 17.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Using the app
Please download and export `Shortcut.postman_collection.json` to Postman.

- **register**: set your email as username and password in the body and hit send.
- **login**: set your email as username and password in the body and hit send. Copy the generated access token.
- **generateUrl**: Before generating tiny urls, you must be authorized. In the collections list on the left, right-click on *Shortcut* and select edit. Click on Authorization tab. Select *Bearer Token* as type and paste the access token copied before. Press *Ctrl + S*. Now you can generate tiny urls.
- **tinyUrl**: Paste your generated url. The url should be like:
```bash
http://localhost:3000/tinyUrl/{generatedUrl}
```
- **profile**: Send your email as username to see your generated urls.

## Test

```bash
# unit tests
$ npm run test
```

## Technical choices and architecture
- I've used JWT to generate access token. The user enters his/her username and password in the app. If both correct, JWT generates a hash as access token from user's credentials.
- The generated url is made from a number. In fact, when the user enters a url, it is stored in the databse and the id of the url in the database is converted to a tiny url.
- To encrypt and decrypt the id, there are two functions in `url-gen.service.ts` named `shortURLtoID` and `shortURLtoID`. There is a bunch of comments in the function to figure out how this works.

## Skipped parts
Most functions of this app are related to database. Mocking and testing this kind of fuctions is somehow tricky and complex. If I had more time, I would write more accurate tests.