
<h1 align="center">Travel Finder</h1>


<p align="center">This app provides all flight details for your trip.<br> 
</p>

## 🧐 About

This a Desktop App made using a JavaScript framework Electron JS. The Travel finder app helps you find different flight details between to airports on a desired date range.

This app takes in departure and arrival details (airports and dates) and shows you the results of all the flights available with price details.

API key need to be provided in the environmental variables.

```
API_KEY = P-Pl4CowZJRPRUHu......j1zaMEC [YOUR_API_KEY_HERE]
```

## 💭 How it works

As soon as the user types a airport or city name dropdown with all the suggestions are shown which is achieved by using an API [airport-autocomplete-js](https://www.npmjs.com/package/airport-autocomplete-js) .

[Tequila Search API](https://kiwicom.github.io/margarita/docs/tequila-api) is used to get all the airport details, and display as output.

If user inputs invalid details, we get an error message instead output.

```
      " Bad Input. Please try again... "
```

## ⛏️ Built Using 

- [Electron.js](https://www.electronjs.org/) - ElectronJS allows the development of desktop GUI applications using web technologies
- [moment](https://www.npmjs.com/package/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates. 
- [node-fetch](https://www.npmjs.com/package/node-fetch) - node-fetch is a light-weight module that brings window.fetch to Node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv loads environment variables from a .env file into process.env
- [airport-autocomplete-js](https://www.npmjs.com/package/airport-autocomplete-js) - Airport searching/autocompletion for IATA codes
- [Tequila Search API](https://kiwicom.github.io/margarita/docs/tequila-api) - This API allows you to search for one-way or return type of itineraries.
