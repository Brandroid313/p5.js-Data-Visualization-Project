function GameHabitsJapan() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Game Habits Japan 2019';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'game-habits-japan';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/games/gaming-habits-japan.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
      // Making sure the data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(width/2, 80);

    // Fill the options with all questions.
    var questions = this.data.columns;
    // First entry is empty so we start from 1
    for (let i = 1; i < questions.length; i++) {
      this.select.option(questions[i]);
    }
      
  };

    // Removes the select after use and switch to a new extension
  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);
    
    // The white center of the "donut" , also displays % information when touched
   this.donuthole = function(questionCol) {
       // Make the donuthole hole white
      fill(255);  
       // Donut hole
      ellipse(width / 2, height / 2, width * 0.2);
       // Detect when pie chart is touched
      if(dist(width / 2, height / 2, mouseX, mouseY) < width * 0.2){
          
          // Color the writing black
          fill(0);
          // Get the color value of the pixel at the mouse location
          var pText = get(mouseX, mouseY);
          // Variable for percentage of answers
          var perAn;
          
          // If color values in pixel array matches show the correct percetnages
          
                // Strongly disagree
          if(pText[0] == 255 && pText[1] == 0 && pText[2] == 0){
              // Get data by row and column, column given in draw
              perAn = this.data.get(4, questionCol)
              text(round(perAn * 100) +'%', width/2, height/2)
          }
          
                // Disagree
          else if(pText[0] == 255 && pText[1] == 165 && pText[2] == 0){
              // Get data by row and column, column given in draw
              perAn = this.data.get(3, questionCol)
              text(round(perAn * 100) +'%', width/2, height/2)
          }
          
                // Neutral
          else if(pText[0] == 255 && pText[1] == 255&& pText[2] == 0){
              // Get data by row and column, column given in draw
              perAn = this.data.get(2, questionCol)
              text(round(perAn * 100) +'%', width/2, height/2)
          }
          
                // Agree
          else if(pText[0] == 0 && pText[1] == 128 && pText[2] == 0){
              // Get data by row and column, column given in draw
              perAn = this.data.get(1, questionCol)
              text(round(perAn * 100) +'%', width/2, height/2)
          }
          
                // Strongly Agree
          else if(pText[0] == 1 && pText[1] == 50 && pText[2] == 32){
              // Get data by row and column, column given in draw
              perAn = this.data.get(0, questionCol)
              text(round(perAn * 100) +'%', width/2, height/2)
          }
          
      }
      
  }  
    

  this.draw = function() {
      // Check if data has been laoded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the question we're interested in from the select item
    var questionType = this.select.value();

    // Get the column of raw data for questionType.
    var col = this.data.getColumn(questionType);
    

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['#013220','green' ,'yellow', 'orange','red' ];

    // Make a title.
    var title = 'Question: ' + questionType;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
    // Draw the donuthole and give it the selected question column  
    this.donuthole(questionType); 
    
  };
}
