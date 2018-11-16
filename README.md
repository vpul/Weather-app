# Weather-app
Command-line Weather app using OpenStreet Map and DarkSky.net API.

## Configuration
Before you start using this weather app, you have to create an external file `variables.env` with `darksky.net` API key stored in it. Here are the steps:
1. Create an external file `variables.env` **OR** just rename `variables.env.example` to `variables.env`.
2. Goto [https://darksky.net/dev](https://darksky.net/dev) and sign up for API key.
3. In `variables.env` file, insert the API key in the following format
  ```sh
  API_KEY="YOUR_API_KEY"
  ```
Substitute `YOUR_API_KEY` with the API key you received from the previous step.

## Usage
### View weather of an address
```sh
node app.js --address="YOUR_ADDRESS"
```

### Set default address
Set a default address so that you don't have to explicitly specify address on every app execution.
```sh
node app.js --setdefault="YOUR_DEFAULT_ADDRESS"
```
After setting the default address, you can simply run `node app.js` to view the weather of the default address. 

### Help
```sh
node app.js --help
```
