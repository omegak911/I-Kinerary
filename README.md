# I-Kinerary
MVP app designed to simplify collaboration for planning trips







/*

yarn
set up index.html api key
start mongod
start mysql@5.7
create database in mysql@5.7 ikinerary
create .env file with mysql USERNAME and PASSWORD
yarn test to ensure everything is up and running, make sure server isnt on

yarn create:mysql
yarn seed:mysql
yarn create:mongo

from root directory, copy data into mongoDB
mongoimport --type tsv --headerline -d ikinerary --collection routes \
       --file database/mongoDB/mock-data/tsv/routes.tsv

run this to reformat data to the correct waypoint format
yarn seed:mongo
can use Omegak911 to try things out


*/