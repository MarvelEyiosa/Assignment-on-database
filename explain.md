# Student Portal API

A REST API for creating and managing student accounts with MongoDB and Express.

## Setup


powershell
npm install
$env:MONGODB_URI = "your-mongodb-atlas-connection-string"
npm start


The API runs on `http://localhost:3001` by default.

## Endpoints

### Create a student

`POST /students`

```json
{
  "name": "Abu Marvellous",
  "registrationNumber": "BAD/2026/TC-8/0065",
  "email": "marvellouseyiosa@gmail.com"
}
```

//Get one student's details

`GET /students/:id`

Update a student's name

`PATCH /students/:id`

```json
{
  "name": "Abu Marvellous"
}
```

Registration number and email are immutable. Requests containing other fields are rejected.

### Delete a student

`DELETE /students/:id`
