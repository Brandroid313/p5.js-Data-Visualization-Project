# Data Visualization with p5.js 
This is an early project done during my first year using the Javascript library p5.js where I used 4 different techniques to different datasets
## The visualizations
- Climate Change: A Line graph showing average global temperatures from 1880 ~ 2006. Features a gradual color shift as the temperature ranges get higher and two slides. The left one controls the starting year, and the right one the ending year.
- Waffles Around the world: A series of waffle charts using data from I survey I collected on peoples opinions on varioud types of waffles. Features color coded boxes that represent the different answers, and a hover feature where the answer itself displays near the mouse cursor.
- Game Habits Japan 2019: A Donut Chart with showing the percetage breakdown of various gaming habits from a survery I conducted in Japan. This feautres a drop down menus with the various questions. When selected the question will appear above the donut chart, as well as a color legend for which answer was given and a hover feature where if the mouse is hovering over a section of the donut, the "donut hole" will display the numerical percentage of that answer.
- Endagered Animals: A visuliation where the image of the selected animal is "pixelated" based on how many there are left in the wild ( 1 pixel for each animal left). Feautures a drop down menu with the animals whose data I collected.
## The files
The main files are JS classes that are called inside the main sketch file. There are also variouos support files that are called inside the main class files to creating certain objects, like rendering a pie-chart, making boxed, handling statistical number crunching etc. The gallery file is what handles putting together the visualization classes and calling them, and in the sketch file is where the gallery class is called and each visualization class is passed into the gallery.
### Main visualization files
- climate-change.js
- endangered_animals.js
- japan-game-habits.js
- waffles-around-the-world.js
### Helper files
- box.js
- gallery.js
- helper-functions.js
- waffle.js
- piechart.js
### Rendering files
- index.html 
- gallery.js
### Styling files
- style.css

## Main Screen
(index.html) Here is where you can choose which visualization to view. Features a hover option to that highlights the button when the cursor is over it, and stays highlighted ( a slightly different color) when the button is pressed

## Endagered Animals

## Climate Change

## WAffles Around the World

## Game Habits Japan 2019