## Project Initialization Steps:

  

 1. Modify the environment variables and add suitable MongoDB URI of your own cluster and project.

 2. Make sure to add two different URI : one for development and another one for testing purpose.

  3. Check the .env file in the root directory for more details.

## Project Launch Steps: 

1. Launch terminal and start the node server using the command: 
		
> `node server.js`

2. The server will start on the port 5000 or the port specified by the server machine.

## Project Screenshots:

1. Running tests using the command: 
> `npm test`

![Test Results](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Test_Results.png)

2. Sending a POST request with a new report to be added

![Post result 1](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20POST%201.png)

![DB result Post 1](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20DB%201.png)

3. Sending a POST request to update the prices based on another set of price units and commodity price.

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20POST%202.png)

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20DB%202.png)


4. Sending a POST request from another user reporting the price of the commodity.

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%203%20POST.png)

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20DB%203.png)

5. Retrieving a report using GET request and reportID.

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/RESULT%20GET%201.png)

6. Creating a new report based on new combination of userID and commodityID using POST method.

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20POST%204.png)

![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20DB%204.png)

 7.  Returning custom errors in cases on bad request using express-validator middlewares.
 
 - POST  => /reports
	 
	 ![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20POST%20Error%201.png)

- GET  =>  /reports?reportID=reportID
- ![enter image description here](https://raw.githubusercontent.com/Shashank03200/Agrilinks-Backend-Task/master/screenshots/Result%20GET%20Error%201.png)
