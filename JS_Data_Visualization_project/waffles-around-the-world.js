function WafflesAroundTheWorld(){
// Name 
    this.name = 'Waffles Around the World';
    
    this.id = 'waffles-around-the-world';
    
    var waffles = [];
    var waffle;
    
 this.preload = function() {
    // Preloads the data from CSV and sets callback to true
    var self = this;
	this.data = loadTable("./data/food/waffleData.csv", "csv", "header",
        function(table) {
        self.loaded = true;} )   
}

// Initlializes the waffle chart data and drawing
this.setup = function () {
    // Each of the seven waffle charts
	var types = ["American", "Belgian", "Stroop", "Rosettes", "Pizzelles", "Egg", "FranskVafler"
	];
    // Values from survey 
	var values = ["My Favorite!", "I like it!", "It's ok", "I don't like it",
		"Never had it before"];
    
     
    for(var i = 0; i < types.length; i++){
        if(i < 4){
            waffles.push(new Waffle(20 + (i * 220), 100, 200, 200, 10, 10, this.data, types[i], values));
        }
        else{
            waffles.push(new Waffle( 120 + (i - 4) * 220, 340, 200, 200, 10, 10, this.data, types[i], values));
        }
        
    }
    
    // Title / explanation of data
    this.create_element = createElement('h2', 'Data from Survey about how people feel about different types of waffles'); 
        
    // position the element 
    this.create_element.position(width * 0.35, 10); 

}

// Get rid od the title element when new visualization selected
// Called in Gallery
this.destroy = function() {
    this.create_element.remove();
    };
    
    
// Draws the waffle sections
 this.draw = function() {
     
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    };
     
	background(255);
    for(var i = 0; i < waffles.length; i++){
        waffles[i].draw();
    };
    
    for(var i = 0; i < waffles.length; i++){
        waffles[i].checkMouse(mouseX, mouseY);
    };   

  };

};