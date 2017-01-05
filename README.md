# REST API demo

## Summary
A REST API implementation in NodeJS with a MongoDB back-end.

Technologies used:
- express
- mongoose

## API
The API is implemented under the route: `/api`.

Documents are structured as:
```
{
  "name": "A name",
  "data": {
    "dataKey": "dataValue",
    ...
  }
},
...
```

The supported HTTP requests are:
- GET `Retrieve the entire collection`
- POST `Creates a new document`
```
sample POST data: {
  "name": "A name"
  "data": {
    "dataKey": "dataValue",
    ...
  }
}
```
- PUT `Replace the entire collection with a new one`
```
sample PUT data: [
{
  "name": "A name"
  "data": {
    "dataKey": "dataValue",
    ...
  }
},
...
]
```
- DELETE `Remove the entire collection`

## Usage
- GET `curl -i -H Accept:application/json -X GET http://localhost:3000/api`
- POST `curl -i -H Accept:application/json -X POST http://localhost:3000/api -H Content-Type: application/json -d '{ "name": "A name", "data": { "dataKey": "dataValue" }}'`
- PUT `curl -i -H Accept:application/json -X PUT http://localhost:3000/api -H Content-Type: application/json -d '[{ "name": "A name", "data": { "dataKey": "dataValue" }}]'`
- DELETE `curl -i -H Accept:application/json -X DELETE http://localhost:3000/api`