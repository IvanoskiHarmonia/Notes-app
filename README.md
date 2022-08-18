# Notes app


- This is a basic Notes app that you can use to keep track of your notes.


![Notes app](https://github.com/ivanoskiHarmonia/Notes-app/blob/main/src/Images/App_Photo.jpg?raw=true)


## Table of contents


* [How To Download](#how-to-download)
	* [Needed software](#needed-software)
	* [Creating database and a table](#creating-database-and-a-table)
    * [Downloading the dependencies](#downloading-the-dependencies)
	* [Starting the app](#Starting-the-app)
* [Usage](#usage)


## How To Download


### Needed software


- As you can see in these folders, there is some needed software that you need to install before you can use the app.


1. First thing you will need is ```Node.js``` and ```NPM``` (Node Package Manager) -> ```https://nodejs.org/en/download/```

2. You will need pgAdmin and PostgreSQL:
	- pgAdmin - ```https://www.pgadmin.org/download/```
	- PostgreSQL - ```https://www.postgresql.org/download/``` 
		* Side note - I am using PostgreSQL 10 server, so I recommend using the same, in case some issues occur.

## Creating database and a table

- After installing all the required software, you will need to create a database called ```Notes ``` if you don't want to change a lot of the **connectionString** in the **app.js** file.
1. You can create the database by simply doing this: 
	* Start PostgreSQL, after entering your master password, click on ```servers```, followed by ```PostgreSQL```, and when that is done right click on the ```databases``` and in the options select ```Create->``` then click ```Databases```, when that is done window will appear and it will ask you to enter the name of your database, enter the name ```Notes```, and just press safe after that, and the database ```Notes``` will be created.

2. And you can create your table ```notelist``` by doing the following:
	*	Upon creating the database ```Notes```, you will see the database under the directory ```Databases (N)```,  to create a table you need to do the following: click on the database ```Notes```, then select the ```Query Tool``` on the **Browser** banner (The query tool looks like 3 disks with a play button in front of the disks). when you have opened the ```Query tool``` you can enter this query: 

	``` 
	CREATE TABLE notelist (
		nid serial primary key,
		ndate timestamp,
		ntext text,
		ntitle varchar(50)
	)
	```
	* This should return ```Query returned successfully in <some_number> msec.```

## Downloading the dependencies

- After you have created the database and the table, you will need to download the dependencies that are needed for the app to work. you need to enter the following command in the terminal:
    * ```npm install```

## Starting the app

- After downloading the needed software, and downloading the notes app from my repository, and stash it in a place of your liking. when that is done you should open the terminal at that directory by going to that folder and pressing: ```Right click```, when the options menu opens up press ```Open in Terminal```.
- When the terminal is open, you can either use this command: ```node app``` - but for this to work you will need slight configuration to your app.js file

***Editing the app.js file***
	
- You can go to the app.js and configure the string called ```connectionString```, which looks like this: 
	```const connectionString = 'postgresql://postgres:<master_password>@localhost:<port>/<Database_name>';```
	* you can find the port number on pgAdmin like this: on the left panel, you can see all the server directories are shown, right click on the ```PostgreSQL 10``` server, and press ```Properties...```, window will appear and in the banner press ```Connection``` and the ***Port*** number will be there. 
	* The only this now that's left to do is edit the ```connectionString``` in the app.js file with your master password, port, and database name and you are good to go.
- After all these steps you can enter the ```node app```, and the command line will return ```listening on port 3000```, after this just enter this link to your browser: ```http://localhost:3000/``` so you can access the app.

## Usage
  

### Adding new note

1. When you want to write a new note, just start by entering the title and the note text you want, but make sure the ```id number``` and the ```date``` are empty in the left and right top corner respectively.
2. After that, just hover over the slider in the bottom right corner that has the blue letter ***S***

### Updating a note

1. When you want to edit a note, press the on the right where all your notes are listed, then edit that note.
2. Then press the save button on the bottom right corner that has the blue letter ***S***.

### Delete a note

1. Press the note you want to delete
2. Hover over the Slider with the red button **D** and press the delete button, then confirm that you want to delete your note.

---

**Enjoy writing your notes**
