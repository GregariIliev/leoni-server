# leoni-server

## This server can be running whit leoni-client.
## You can login whit EMAIL: admin@abv.bg and PASSWORD: admin

At first time open the console and run npm install.

Run the server: npm run dev.

The server create MySql database 'leoni' and inject to database statics models these are Employee, Department and Postion;

# Data base relations

One Employee can be Admin (self reference). The logic to create or convert one Employee to Admin is not implemented.

One Employee can work in one Department and one Position.

Departments and Postions have many to many relationship.

# API

## /api/authenticate

All request at this end point send response whit stats 200 and json true if the client has a valid jwt token. Else response whit error and status 401.




## POST Employee

### /api/employee/login

Check the admin credentials and send response to client whit the admin email and set cookie whit jwt token.

### /api/employee/create

 Create a new employee whit his Department and Position.

## GET Emplooyee/s

### /api/employees/:id
 
 Can get one Employee by his id. Employee is returned only with the necessary attributes and whit his Department and Positions.
 
### /api/employees

 Can get all Emplyees in the database. Pagination is not implemented!
 
### /api/employees/count

 Can get the number of all Employees in the database.
 
## PUT Employee

### /api/employees/:id 

 Can modify the Employee data by his id.
 
## DELETE Employee

### /api/employees/:id 

Can delete the Employee by his id.




## POST Department 

### /api/departments 

Can create a new Department whit his Postions.

## GET Department

### /api/departments/:id 

Can get Department by his id.  

### /api/departments 

Can get all Deparmtnets. The server return the Departments only whit the neccesary attributes and his Postitions.

### /api/departments/count 

Can get the number of Departments in the database.

## PUT Department

### /api/departments/:id 

## DELETE Department

Can modify the Deparmtnet by his id.

### /api/departments/:id 

Can delete the Department by his id.




## POST Position

### /api/positions 

Can create one Postion whit his shifts.

### /api/positions/:id 

Can get one Position by his id.

### /api/positions 

Can get all Positions 

### /api/positions/count

Can get the number of all Positions in the database.

## PUT Position 

### /api/positions/:id 

Can modfy the Positions by his id.

## /api/positions/:id 

Can delete the Position by his id.


