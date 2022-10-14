
## Detailku-Server
ExpressJS based REST API intended for [detailku-sija](https://github.com/NAoHR/detailku-sija). Built with MongoDB as its Database and integrated it with mongoose ORM.

## Feature:
- Split routes to four different name
	- `Admin` - Admin related route (on progress)
	- `User` - Route that's need to be authenticated to access and authorized to edit or delete
	- `Client` - Route that is publicly open
	- `Auth` - Route that is related to authentication (admin, user)
- Built with MVC design pattern (?)
- Use JsonWebToken as its Authentication and Authorization service
- Use Mongoose as its ORM for mongoDB
- Use middleware to verify user or admin for authentication or authorization
- Featured with Bcrypt for password encryption

## Library:
- [ExpressJS](https://expressjs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
## Contributors
Made with Love by Najmi ~ [najmim625@gmail.com](mailto:najmim625@gmail.com)

> Feel free to contribute
