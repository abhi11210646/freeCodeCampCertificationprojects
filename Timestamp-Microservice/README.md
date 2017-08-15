#Timestamp Microservice

Part of the back end certificate at http://freecodecamp.com. For more information about this challenge, go to http://freecodecamp.com/challenges/basejump-timestamp-microservice

Live Demo

Go to https://timestamp-abhi.herokuapp.com/ for the live demo of this app.

<html><head>
    <title>Timestamp microservice </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>
        <div class="container">
            <h1 class="header">
                API Basejump: Timestamp microservice
            </h1>
            <blockquote>
                User stories:
                <ul>1) I can pass a string as a parameter, and it will check to see whether that string 
                contains either a unix timestamp or a natural language date (example: January 1, 2016)</ul>
                <ul>2) If it does, it returns both the Unix timestamp and the natural language form of that date.</ul>
                <ul>3) If it does not contain a date or Unix timestamp, it returns null for those properties.</ul>
            </blockquote>
            <h3>Example usage:</h3>
            <code>https://timestamp-abhi.herokuapp.com/April%2015,%202017</code><br>
            <code>https://timestamp-abhi.herokuapp.com/1492214400</code>
            <h3>Example output:</h3>
            <code>
                {
                  "unix": 1492214400,
                  "natural": "April 15, 2017"
                }
            </code>
        </div>
    

</body></html>
