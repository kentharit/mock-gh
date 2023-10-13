Project Name: Mock
CS Login: wchyun and tngampra
Github Repo: https://github.com/cs0320-f23/mock-tngampra-wchyun
Estimated Time: 15 hours

Design Choice:
REPLInput.tsx: This is the class where we mainly changed. Within the handleSubmit function, we handle all of the user stories inside. Initially, what we handled was the user story 1, which is changing modes. As a default setting, when the user accesses the front end, it is in the “brief “ mode, which just displays the result of running the command. However, when the user enters “mode” again, it will change to verbose output where both command text and result of running the command are presented. After setting this functionality, we then handled the load_file case (user story 2), where the user can upload the CSV file. We check if it’s the correct CSV format by checking if the “splitted.length == 2”, and if the file can be found and inputted as a correct format, it will return the success message. If not, it will return the error message. What we then figured out was the view command (user story 3). We first check if the command line is in the correct input by seeing if the “splitted length == 1”. If the command is in the correct format, the loaded CSV file would be presented. Some of the error cases would be when the CSV file is not loaded properly, or when the user calls the view function before load. Final functionality that we handled was the search function (user story 4). The input should be in the format of “search column value”, so we check this condition by checking if the “splitted length == 3”. We incorporate JSON.stringfy method to make the JSON texts into strings and look into desired value in the indicated column. Some of the error cases handled are when there is no loaded CSV file or had the incorrect input to search.

We decided to structure the code to have all the user story functionalities inside REPLInput.tsx file, because of the efficiency. All the userstory component except for “mode” command requires the load command to access the CSV file. We thought it would be very inefficient to separate the load command from other commands because all the other ones needed to access the CSV file to perform correctly.

Output Box: It takes in some input and depending on what mode the user hopes to be in, it will output different results. In the “brief” output, it will just display the result of running the command. In the verbose mode, it will display both the command text and the result of running the command.

Index.css
This is the class where we inputted the button and changed the color scheme of the overall frontend output.

App.css
This is the class where we set the background color, overall color scheme, and the font size of the front-end.

REPL:
In REPL, we are trying to add some kind of shared state that holds all the commands submitted. This class is also where our REPL history goes.

App:
This is the highest-level component and will represent the entire front-end.

Controlled Input:
This class in terms of definitions means a function that sets a state containing a string.

Controlled input method:
All the input boxes contain states. We hope to make sure that React is managing the state appropriately so that there is a component that can wrap the input box. This method will handle these problems.

Tests:

Bugs: There are no known bugs.
