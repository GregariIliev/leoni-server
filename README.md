# leoni-server

Run the server: npm run dev

The server create MySql data base 'leoni' and inject to data base statics models these are Employee, Department and Postion;

# Data base relations

One Employee can be Admin (self reference). The logic to create or convert one Employee to Admin is not implemented.

One Employee can work in one Department and one Position.

Departments and Postions have many to many relationship.

# API

## /api/authenticate

All request at this end point send response whit stats 200 and json true if the client has a valid jwt token. Else response whit error and status 401.

## POST

### /api/employee/login

Check the admin credentials and send response to client whit the admin email and set cookie whit jwt token.

### /api/employee/create

Create a new employee whit his Department and Position.

