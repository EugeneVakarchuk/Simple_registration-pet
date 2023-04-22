# Simple registration

It's a simple registration created on MERN stack.

The main task of the app - get users's list with data from database and render it. This functionality is only available for users who had already registered and logged. Verification is proccesed both on the server and the client's side. 

---
## Implemented functionality
* Created server and client app.
* Validation on server's side using Express-Validation.
* Validation on client's side using React Hook Form.
* The server errors in validation are displayed on client.
* Use JWT tokens for access.
* Use a pair of access and refresh tokens.
* Use Redux for storing user's data.
* Separate logic from realization.
* Custom styles on LESS (without styling libraries).
* Logout function.
* Check if there is a token in local storage, and logging in automatically.
* Create comments for tha majority of code.

---
## Insall 
1. Clone repository.
2. Change directory to /client.
3. Install packages using:
    ``` 
    npm install
    ```
    or
    ```
    yarn install
    ```
4. Change directory to /server and install packages using the same command.
5. Create .env file and in /server directory and complete using the .env.example as a template.
6. Repeat №5 for /client directory.
7. Change directory to /server and start the server using this command:
    ```
    npm run start
    ```
    or
    ```
    yarn start
8. If there is a message in the console "Server started on port...", the server started without any problems.
9. Change directory to /client and start client side using this command:
    ```
    npm run dev
    ```
    or
    ```
    yarn dev
    ```
10. Webpack will automatically open the site in default browser.


---
## Stack:
* ### Back:
  * JavaScript 
  * Express
  * MongoDB
  * Bcrypt
  * JWT
  * Cookie parser
* ### Front:
  * TypeScript
  * React
  * Redux-toolkit
  * Webpack
  * Less
  * CSS Modules
  * React hook form
  * React router dom
  * React transition group
  * Axios
