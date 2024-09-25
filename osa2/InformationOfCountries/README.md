# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---------------------------------------------------------------------------------------------------------------------------

At https://studies.cs.helsinki.fi/restcountries/ you can find a service that offers a lot of information related to different countries in a so-called machine-readable format via the REST API. I made an application that allows you to view information from different countries.

The user interface is very simple. The country to be shown is found by typing a search query into the search field.

---------------------------------------------------------------------------------------------------------------------------

So basically here is what happends:

USER INPUT - The user enters a search term (a country name) in a search field. 

REQUEST SENT - The app sends an HTTP GET request to the REST API with the search term. 

API PROCESSES - The API receives the request, looks up the relevant country data and sends back a response in JSON format. 

DATA RECEIVED - The app receives the JSON response and processes the data.

DISPLAY THE DATA - Finally, the app displays the country details, like population, capital, flag and weather in the user interface. 