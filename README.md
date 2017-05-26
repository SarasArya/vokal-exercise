Question 

1. Create Signup/login page with JSON Web Tokens authentication.  

2. After successfully login, there will be a text bar which should be integrated with google location api. In which if we type location then suggestions of locations should come. (refer freshmenu or any for location suggestions textbox)  

3. After searching location in a text box and selecting we have to save this search details (name, location, coordinates and other details of location) In DB. // create rest API to create entry in DB  

4. Fetch all searches done by user and show in a table. // create Rest API to fetch details from DB  

To run
1. Run your mongod server by typing `mongod --dbpath ~/db `.  
2. Take two terminals. In one cd into the main folder. In one cd into the frontend folder.  
3. Run the nodemon app.js /node app.js.
4. In second run live-server.
5. Create your own account. And Start using the system

To do  
1. The system uses PassportJS for login, against JWT as mentioned in the question, this was done due to save time, will be upgraded in the next release.

