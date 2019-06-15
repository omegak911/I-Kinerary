# I-Kinerary
  MVP app designed to simplify collaboration for planning trips

## Getting Started

### Clone
  ```
    $ git clone https://github.com/omegak911/I-Kinerary.git
    $ cd I-Kinerary
  ```

### Setup

#### client

  Inside of client/dist/, copy example.html and paste + rename to index.html
  In client/dist/index.html, uncomment line 14 and replace the key with your own API key from Google API

  Install required dependencies and start webpack
  ```
    $ cd client
    $ yarn
    $ yarn build
  ```

#### server
  Start mongodb and mysql
  Create database in mysql@5.7 called ikinerary
  Copy example.env and paste in same directory renamed .env, replace the username and password
  Copy example.config.js and paste in same directory renamed config.js, replace with your Google API key

  Install required dependencies 
  ```
    $ cd server
    $ yarn
  ```

  To ensure that everything is working properly, run Jest
  ```
    $ yarn test
  ```

  If all tests pass, should be okay to start seeding the databases
  ```
    $ yarn create:mysql
    $ yarn seed:mysql
    $ yarn create:mongo
    $ mongoimport --type tsv --headerline -d ikinerary --collection routes \
       --file database/mongoDB/mock-data/tsv/routes.tsv
    $ yarn seed:mongo
  ```

### Try it out!

  Try logging it with username 'Omegak911' and password 'ikinerary'.  Thanks for visiting!