<study hof and callback func>
<study asyncHandeler>

<new topic >
->axios better than fetch
->proxy and reflect 
->iffie




--> condition ?(if) : (else)

-->package,json->contains details of package file that we are using
 ->.ev contains keys that are never meant to show publicly they are basically called internaly preventing risk of exposinfg API credentials

 ->In any project that we are making project directory structure looks like this :-
     ->scr
         ->index.js -> does DB connects
         ->App.js -> does configuration of cookies ,url ecode 
         ->constant.js -> contains enums and database name 
         ->DB           ->connects to DB
         ->Models       ->structure for db
         ->controllers  ->contains all the functionality 
         ->routes       ->it is a place where routes meet their respective functions like watch history acess histroy function in the controllers
         ->middleware   ->
         ->Utils        ->  contains file packages tht we are going to use everywhere in teh project like sending mail 
         ->More(depending on the use case)


-->app.use tab use karte hai jab koi config setting karni ho


-->ES6 Modules vs CommonJS – Summary Notes

1. What are ES6 Modules and CommonJS?
CommonJS is a module system used in Node.js for importing and exporting code. It uses require() and module.exports.
ES6 Modules are the modern JavaScript standard introduced in ECMAScript 2015. They use import and export and are supported in both modern browsers and Node.js.

2. File Extensions and Environment Support
CommonJS files typically use .js and work only in Node.js.
ES6 Modules can use .js (with "type": "module" in package.json) or .mjs, and they work in both browsers and Node.js.

3. Syntax Differences
CommonJS uses const lib = require('./lib') to import and module.exports = value to export.
ES6 Modules use import lib from './lib.js' to import and export default value or export { namedThing } to export.

4. Load Type (Synchronous vs Asynchronous)
CommonJS loads modules synchronously, meaning it blocks execution until the module is fully loaded.
ES6 Modules load asynchronously, allowing the rest of the program to continue executing while the module is being loaded.

5. Why Load Type Matters
Synchronous loading (CommonJS) can freeze the application during load, especially in browsers or when loading large libraries.
Asynchronous loading (ES6 Modules) improves performance, especially in web apps where files are loaded over the network.
Async loading enables features like top-level await, lazy loading, and faster startup.

6. Support in Browsers
CommonJS is not natively supported in browsers. It requires bundlers like Webpack or tools like Browserify to work.
ES6 Modules are supported natively in modern browsers, making them ideal for frontend development.

7. Modern Features with ES6 Modules
ES6 Modules support top-level await, meaning you can use await directly without wrapping it in a function.
They enable lazy loading using dynamic import().
They work well with modern tooling that allows code splitting and tree-shaking (removing unused code).

8. When to Use CommonJS
Use CommonJS if you are maintaining or building older Node.js projects.
Use it if you're using libraries that haven’t migrated to ES6 Modules.
It's better suited for simple backend tools or scripts that don’t require modern features.

9. When to Use ES6 Modules
Use ES6 Modules for modern web apps, APIs, or any frontend code.
Use them when you need features like top-level await, lazy loading, and browser compatibility.
They are ideal if you are using build tools like Vite, Webpack, Rollup, or frameworks like React or Next.js.

10. Mixing the Two Systems (Not Recommended)
You cannot directly mix require() and import in the same file without special configuration.
ES6 Modules and CommonJS work very differently and mixing them can cause runtime errors or unexpected behavior.
Stick to one module system in a project to avoid confusion and compatibility issues.

11. Final Takeaway
CommonJS is synchronous, older, and Node-specific. It's great for older Node.js environments but not suitable for browsers.
ES6 Modules are asynchronous, modern, and support advanced features like top-level await, code splitting, and are browser-compatible.
For any modern development, especially for frontend or full-stack apps, ES6 Modules are the better choice.






-->a server is a software and those big machines are data centeres which run these software and stores data
->nginx is a server 

->Status Code:-
        ->Informational responses (100 – 199)
        ->Successful responses (200 – 299)
        ->Redirection messages (300 – 399)
        ->Client error responses (400 – 499)
        ->Server error responses (500 – 599)

-->What is Node.js?
   ->Node.js is a runtime environment that allows developers to execute JavaScript code outside of a web browser. Built on Chrome's V8 JavaScript engine, it enables the use of JavaScript for server-side and networking applications
   ->A Node.js app runs in a single process, without creating a new thread for every request.
   ->node.js provides many functions to js which are not part of js 

--> What is a Node.js Framework?
->A Node.js framework is a pre-built set of tools, libraries, and best practices that helps      developers build applications faster using Node.js, which is a JavaScript runtime built on Chrome's V8 engine.

-->What is npm?
npm stands for Node Package Manager.
It’'s:
The default package manager for Node.js.
A tool that helps you install, share, and manage libraries (packages) of code written by others.
A huge online registry of open-source JavaScript packages that you can use in your projects.
Why is npm useful?
Imagine you want to add features to your Node.js app — like handling HTTP requests, working with databases, or adding authentication.
Instead of writing everything from scratch, you can:
Use npm to install ready-made code packages created by other developers.
Easily manage your projects dependencies (all the packages your project needs).
Keep your packages up to date.

-->it can add other libraries otside node.js to make your work easier

-->What does npm init do?
Running npm init sets up a Node.js project by creating a package.json file in your directory. This file acts as the blueprint or manifest for your project.



-->🧪 What is dotenv?
dotenv is a Node.js package that loads environment variables from a .env file into process.env.
This is useful for keeping sensitive information (like API keys, database URLs, passwords) outside of your source code.



-->🟢 What is nodemon?
nodemon is a utility that automatically restarts your Node.js application whenever it detects file changes in your project directory. This means you don't' have to manually stop and start your server every time you make a code change — nodemon does it for you!

--> What is Express?
->Express is a web application framework for Node.js, designed to make building web servers and APIs easier and more efficient. 
->Express.js is a web framework for Node.js that helps you handle HTTP requests and responses easily. It's like a toolkit that sits on top of Node's built-in HTTP module, giving you a clean, powerful, and efficient way to build web apps or APIs.
->app.listens ->listens on a port number

-->content-type batayega ki wo kis tarah ka data serve kar raha hai

-->app.use(express.urlencoded({limit:"16kb"})) -->limits the data coming from url eg. https://dfsd.com/djd%dodofl?fsdf?sdf random eg

->Native Express (without multer or any upload middleware):
✅ Can only handle text-based data formats like:
application/json → (e.g., { "name": "Sunay" })
application/x-www-form-urlencoded → (e.g., name=Sunay&age=20)

❌ But Express cannot by itself:
Read images, videos, PDFs, etc.
Handle multipart/form-data (which is what <input type="file"> sends)
Access uploaded file content
Save a file to disk

-->What is Multer :-
Multer is an npm package commonly used in Node.js applications for handling multipart/form data, particularly for file uploads. It simplifies the process of handling file uploads by providing middleware that can be easily integrated into Express.js applications.
  ->Features of npm multer
         -->File Uploads: Allows uploading files from client-side forms to the server.
         -->Middleware: Integrates seamlessly with Express.js middleware, making it easy to handle file uploads within routes.
         -->File Storage: Provides options for storing uploaded files on the server, such as in-memory storage, disk storage, or using a custom storage engine.
         -->File Filtering: Supports filtering uploaded files based on file type, size, and other criteria.
         -->Error Handling: Offers error handling for file uploads, including handling file size limits, invalid file types, and other upload-related errors.

-->🧠 What is app.use(express.static())?
express.static() is a built-in middleware function in Express.
It serves static assets: HTML, CSS, JS, images, fonts, etc.
It's super fast and optimized for performance (uses internal caching strategies).
It’'s like a mini built-in file server.


-->🔧 What is cookie-parser?  --> app.use(cookeParser())
cookie-parser is a middleware in Express that:
🔹 Parses the Cookie header in the HTTP request
🔹 Converts it into a JavaScript object


-->🎯 What is CORS (Cross-Origin Resource Sharing)?
In simple terms:
     -->CORS is a security feature in web browsers that controls which websites can talk to which servers.
     -->Imagine your frontend and backend are like two different houses. One house (frontend) wants to ask a question to the other house (backend). The backend must say it's' okay to talk — otherwise, the browser blocks it.
     -->
     -->🧠 A Simple Example
     -->You have:
     -->A frontend website running at:
     -->http://localhost:3000
     -->
     -->A backend server/API running at:
     -->https://api.example.com
     -->
     -->Your frontend makes this request:
     -->fetch('https://api.example.com/data')
   
     -->What happens?
     -->The browser checks:
     -->“Hmm... the frontend and backend are on different origins. Should I allow this?”
     -->
     -->So it sends an extra piece of info:
     -->
     -->Origin: http://localhost:3000
     -->The backend must reply with:
     -->
     -->Access-Control-Allow-Origin: http://localhost:3000
     -->If it does not reply like that, the browser says:
     -->
     -->❌ Blocked by CORS policy
     -->
     -->🔒 Why CORS exists?
     -->To protect users from malicious websites that try to secretly send requests on their behalf.
     -->So your bank’s website doesn’t want random websites sending requests to it — CORS prevents that.


-->What does “parse” mean?
    ->💬 In simple words:
    ->To parse means to read data and turn it into a usable format.
   
-->🍪 What is cookie-parser?
cookie-parser is a middleware for Express.js that helps you read and parse cookies from the request headers sent by the client (browser).
Without it, Express doesn’t know how to understand or access the cookies in a readable format.

✅ Why is it used?
🔍 Reads cookies from incoming requests.
📦 Parses them into an object you can easily use.
🔐 Handles signed cookies (for security).
⚡ Makes accessing cookies easy via req.cookies and req.signedCookies

-->2. app.use(express.json({ limit: "16kb" }));
   ->✅ What it does:
   ->t tells Express to parse incoming JSON data in the request body, and limit the size to 16 kilobytes.
   ->Why the size limit?
   ->To prevent DoS (Denial of Service) attacks where someone sends huge payloads to crash your server.


-->🔍 Code:

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
      ->This line tells Express:
      ->
      ->“When someone submits an HTML form, read the data they sent, and make it usable inside req.body.”
      ->
      ->✅ When this line is needed
      ->This is used when someone submits data using a regular HTML form like this:
      ->
      -><form action="/submit" method="POST">
      ->  <input name="email" value="test@example.com" />
      ->  <button type="submit">Send</button>
      -></form>
      ->When this form is submitted, the data is sent to your server in this format:
      ->
      ->
      ->email=test@example.com
      ->That’s a URL-encoded format — it's' like a string, not a JavaScript object.
      ->
      ->📖 What does each part mean?
      ->🔹 express.urlencoded(...)
      ->This is built-in middleware in Express that:
      ->
      ->Reads data coming from HTML forms
      ->
      ->Converts (or parses) it into a JavaScript object
      ->
      ->Stores it in req.body
      ->
      ->So you can do this in your route:
      ->
      ->
      ->app.post('/submit', (req, res) => {
      ->  console.log(req.body.email); // Outputs: test@example.com
      ->});
      ->🔹 extended: true
      ->This controls how complex objects from the form can be.
      ->
      ->true: Allows nested objects like user[name]=Alice → { user: { name: "Alice" } }
      ->
      ->false: Only allows simple flat data like name=Alice → { name: "Alice" }
      ->
      ->Use true if you're' accepting structured form data (which is common).
      ->
      ->🔹 limit: "16kb"
      ->This limits the maximum size of form data to 16 kilobytes.
      ->
      ->Why? 🚫 To prevent someone from sending huge amounts of data and crashing your server.
      ->Middleware	Use it for...
      ->express.json()	      -> Parsing JSON data
      ->express.urlencoded()  -> Parsing form data (URL-encoded)


-->🧭 What is a Route Function in Express?
A route function is the code that runs when someone visits a specific URL (route) on your server.      

-->What is MongoDB?
   ->MongoDB is a NoSQL database used to store and manage data in a flexible, scalable, and high-performance way. Instead of storing data in tables like SQL databases, MongoDB stores data in JSON-like documents.
    
    ->when writting models in those models we can also write methods in the manner modelName.method.methodName = () => {}
    ->we can also write methods to execute before saving data in database for instance encrypting password before saving they are triggered automatically 
   -> .isModified to check if a feild is updated or not 

-->📁 1. node_modules/
      ->What it is: Automatically created by npm/yarn.
      ->Purpose: Stores all installed packages/dependencies (like Express, Mongoose, etc.).
      ->You don’t edit this manually.
      ->Note: It can get very large; that's why it's excluded from version control using .gitignore.

-->2. public/
   ->What it is: Contains static files.
   ->Purpose:
   ->Frontend assets like images, CSS, JavaScript files.
   ->Files here are served directly to the browser.

-->3. controllers/
   ->What it is: Contains functions that handle logic for specific routes.
    ->Purpose: Separates route handling logic from route definitions.   

-->4. db/ or config/
    ->What it is: Holds database connection files or other config files (like .env, DB URI).
    ->Purpose: Central place to connect to MongoDB or configure app settings.    

-->📁 5. middlewares/
What it is: Contains middleware functions.
    -->Purpose: Middleware sits between the request and response cycle.
    -->Logging
    -->Authentication
    -->Error handling
    -->Middleware is a function that runs between the time a request is received by the server and the final response is sent.In Express.js, middleware functions can:Execute any code Modify the request (req) or response (res) objects End the request-response cycle Call the next middleware in the stack using next()

    
 -->What it is: Defines data schemas for MongoDB using Mongoose or other ORMs.
   ->Purpose: Models represent your data structure and handle DB interactions.
   -->What Are ORMs?
         -->ORM stands for Object-Relational Mapping.
         It’s a tool or library that helps you interact with a relational database (like MySQL, PostgreSQL, SQLite) using objects in your programming language instead of writing raw SQL queries
 
 --> 7. routes/
   ->What it is: Defines application endpoints (URLs) and connects them to controller logic.
   ->Purpose: Maps paths like /api/users to appropriate controller functions.

--> 8. utils/
  ->What it is: Utility/helper functions that are reused across the app.
  ->Purpose: DRY principle — avoid repeating common logic (e.g., format dates, generate tokens).   


-->What is JWT?
         -->JWT stands for JSON Web Token. It’s a way to send information securely between two parties — usually, between your frontend app (like a website or mobile app) and your backend server.
         -->The key thing is:
         -->The token proves who you are without the server having to keep track of you (stateless).
         -->The token is digitally signed so it can’t be changed or faked.  

         ->What does a JWT look like?
                    -->A JWT is just a long string with 3 parts separated by dots:
                    -->
                    -->aaaaa.bbbbb.ccccc
                    -->These parts are:
                    -->
                    -->Header — Info about the token, like what algorithm was used to sign it.
                    -->Payload — The data or claims (like your user ID, username, and expiry time).
                    -->Signature — A secret signature that ensures the token wasn’t tampered with.

                          1. Access Token
                          -->Short-lived token (e.g., expires in 15 minutes or 1 hour).
                          -->Used to access protected resources or APIs.
                          -->Sent with each request to prove who you are.
                          -->If expired, you can’t use it anymore and need a new one.

                          -->2. Refresh Token

                          -->Long-lived token (e.g., expires in days or weeks).
                          -->Used only to get a new access token when the access token expires.
                          -->Sent less frequently (usually via a dedicated refresh endpoint).
                          -->Helps keep the user logged in without asking for credentials again.           


-->AsyncHandler ka Detailed Explanation (Meaning ke Saath)
        ->1. Express ke routes ko kya chahiye?
        ->Express framework mein jab bhi tu koi route banata hai, to wo route function ko 3 parameters milte hain:
        ->
        ->req = Request object
        ->Isme client (user) ke request ki saari details hoti hain, jaise URL, headers, body, query parameters, etc.
        ->
        ->res = Response object
        ->Isse server client ko response bhejta hai, jaise res.send(), res.json() se data bhejna.
        ->
        ->next = Next middleware function
        ->Agar route ke andar koi error ya special condition aaye, to next() call karke Express ko agla middleware ya error handler bataya jaata hai.
        ->
        ->2. fn kya hota hai?
        ->fn wo function hai jo tu apne route me likhta hai. Yeh aksar async function hota hai, matlab:
        ->
        ->Jo asynchronous kaam karta hai (database se data lana, file padhna, network request karna, etc.)
        ->
        ->Aur await ka use karta hai.
        ->
        ->Example:
        ->

        ->const fn = async (req, res, next) => {
        ->  const user = await getUserFromDB();
        ->  res.send(user);
        ->};
        ->3. Async code mein error handling kyun zaroori hai?
        ->Async function ke andar agar koi error aa gaya (jaise DB fail ho gaya), to agar usko pakad ke handle nahi kiya gaya, to:
        ->
        ->Server crash kar sakta hai
        ->
        ->Ya response kabhi nahi jayega
        ->
        ->Isliye async errors ko Express ke error handler tak safely bhejna bahut important hai.
        ->
        ->4. try/catch ka role
        ->Sync code mein hum errors ko pakadne ke liye try/catch lagate hain.
        ->
        ->Async functions mein bhi agar tum await ke saath try/catch lagate ho, to wo errors pakad leta hai.
        ->
        ->Example:
        ->

        ->try {
        ->  const data = await someAsyncTask();
        ->} catch(err) {
        ->  // error handle karo
        ->}
        ->5. Problem: try/catch bina await ke async errors pakad nahi pata
        ->Agar tum async function ko bina await call karte ho aur try/catch use karte ho, to async errors handle nahi hote.
        ->

        ->try {
        ->  someAsyncTask(); // await nahi kiya
        ->} catch(err) {
        ->  // yeh error nahi pakad payega agar asyncTask fail ho
        ->}
        ->6. asyncHandler ka kaam kya hai?
        ->asyncHandler ek wrapper function hai jo tumhare async route function ko wrap karta hai aur automatically async errors ko pakad kar Express ke error handler (next(err)) tak bhejta hai.
        ->
        ->Isse har baar tumko apne routes mein alag se try/catch likhne ki zaroorat nahi padti.
        ->
        ->7. asyncHandler ke do popular implementations
        ->Option 1: Promise style (short aur simple)

        ->const asyncHandler = (fn) => (req, res, next) => {
        ->  Promise.resolve(fn(req, res, next)).catch(next);
        ->};
        ->Yahan fn call karte hi ek Promise banta hai
        ->
        ->Agar wo reject hota hai (error aata hai), to .catch(next) us error ko Express ke error handler ko forward karta hai
        ->
        ->Option 2: Async/Await + Try/Catch style (thoda verbose)

        ->const asyncHandler = (fn) => {
        ->  return async (req, res, next) => {
        ->    try {
        ->      await fn(req, res, next);
        ->    } catch (err) {
        ->      next(err);
        ->    }
        ->  };
        ->};
        ->Isme tumhara wrapper function khud async hai
        ->
        ->Aur await ke saath try/catch lagakar error handle karta hai
        ->
        ->Functionally dono options same kaam karte hain
        ->
        ->8. req, res, next kyu wrapper function mein hain?
        ->Express framework har route ke liye ek function expect karta hai jo ye 3 parameters leta hai:
        ->
        ->req : request object
        ->
        ->res : response object
        ->
        ->next: error ya next middleware call karne ke liye
        ->
        ->Isliye asyncHandler jo function return karta hai, uska signature bhi (req, res, next) hi hota hai, taki Express usse bina problem call kar sake.
        ->
        ->9. Summary — Kaise kaam karta hai flow?
        ->Client browser /user pe request bhejta hai
        ->
        ->Express tumhara route call karta hai jo asyncHandler ke through wrap hua hai
        ->
        ->Wrapper function ke andar tumhara async route function fn(req, res, next) call hota hai
        ->
        ->Agar fn mein koi error aata hai to wo Promise reject ho jaata hai
        ->
        ->.catch(next) ya try/catch se error Express ke error handler ko bhej diya jaata hai
        ->
        ->Server crash nahi hota, error handle ho jaata hai gracefully
        ->
        ->Bas itna yaad rakh:
        ->asyncHandler ek “safety net” hai jo async errors ko Express ke error handler tak safely bhejta hai, bina baar-baar try/catch likhne ke.
      