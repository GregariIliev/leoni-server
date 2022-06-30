# leoni-server

Run the server: npm run dev

The server create MySql data base 'leoni' and inject to data base statics models these are Employee, Department and Postion;

# Data base relations:

One Employee can be Admin (self reference). The logic to create or convert one Employee to Admin is not implemented.

One Employee can work in one Department and one Position.

Departments and Postions have many to many relationship.
