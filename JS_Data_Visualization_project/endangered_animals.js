function EndangeredAnimals(){
    
    // Name for visulation in menu bar
    this.name = 'Endangered Animals';
    
    // Id with no special characters
    this.id = 'endangered_animals';
    this.loaded = false;

    
    this.preload = function() {
        
        var self = this;

          // load the csv data
          this.animal_data = loadTable('./data/endangered.csv', 'csv','header',       // Callback function to set the value
                // this.loaded to true.
                function(table) {
                self.loaded = true;
            });

          // load each jpg image of each animal, the choice to capitalize the names was made to avoid confusion when comparing to the csv data
          this.Mountain_Gorilla = loadImage("./img/Mountain_Gorilla.jpg");
          this.Amur_Leopard = loadImage("./img/Amur_Leopard.jpg");
          this.Sumatran_Orangutan = loadImage("./img/Sumatran_Orangutan.jpg");
          this.Sumatran_Elephant = loadImage("./img/Sumatran_Elephant.jpg");
          this.Sumatran_Tiger = loadImage("./img/Sumatran_Tiger.jpg");
          this.Javan_Rhino = loadImage("./img/Javan_Rhino.jpg");
        
          // Variables for each animal pic for easier rferecne and storage in array
          var Mountain_Gorilla = this.Mountain_Gorilla;
          var Amur_Leopard =this.Amur_Leopard;
          var Sumatran_Orangutan = this.Sumatran_Orangutan;
          var Sumatran_Elephant = this.Sumatran_Elephant;
          var Sumatran_Tiger = this.Sumatran_Tiger;
          var Javan_Rhino = this.Javan_Rhino;

         // array to store each animal, location in array corrsepnds to id tag in csv data
         this.picAnimals = [Mountain_Gorilla, Amur_Leopard, Sumatran_Orangutan, Sumatran_Elephant, Sumatran_Tiger, Javan_Rhino];

    }


    this.setup = function() {
        
        // Check if data has been loaded yet
        if(!this.loaded) {
            console.log('Data not loaded');
            return;
        }
        

        // make the select DOM button & position
        this.select = createSelect();
        this.select.position(width/2, 10);

        // animal name in each column
        var animals = this.animal_data.columns;

        // filling the select with strings from animal_data columns
        for(var i = 1; i < animals.length; i++){
            this.select.option(animals[i]);
        };
        
          // create the H2 elment, a titel above the picture  
          this.create_element = createElement('h2', 'Each animal left in the wild is 1 "Pixel"'); 

          // position the element 
          this.create_element.position(width/2 - 50, 10); 
        
    }
    
    // Remove the select and H2 element after new extension is chosen
    this.destroy = function() {
            this.select.remove();
            this.create_element.remove();
          };
    

    this.draw = function() {
        // Check of the Data is done
        if (!this.loaded) {
          console.log('Data not yet loaded');
          return;
        }
        

        // Selected value from drop down
        var animalType = this.select.value();
        // population number from csv
        var population = this.animal_data.get(0,animalType);
        // match the id from csv with animal type chosen
        var picId = this.animal_data.get(3,animalType);
        // chooses the correct pic from the array using picId variable
        var picDisplay = this.picAnimals[picId];

        // vScale factore the number to divde the width of the canvas by to output the correct # of squres to be drawn horizontally and vertically
        var vScale = width/round(sqrt(population));
        // Adjust the picutre quality to lower resoultion based on population of animal
        picDisplay.resize(width/vScale, height/vScale);  
        // Loads new array of pixels from resized pic
        picDisplay.loadPixels();
        //loads the array of pixels from the canvas we will be drawing to
        loadPixels();

        // iterate over the height of the pic after resizing
        for(var i = 0; i < picDisplay.height; i++){
            // interate over the width of the pic after resizing
            for(var j = 0; j < picDisplay.width; j++){
                // index is algorithin to find a paritcular pixel, multiplied by 4 becuase the array is single numbers and every 4 numbers is the r,g,b, aplha value of one picel
                var index = (i + j * picDisplay.width) * 4;
                // red value of pixel
                var r = picDisplay.pixels[index];
                // green value of pixel
                var g = picDisplay.pixels[index + 1];
                // blue value of pixel
                var b = picDisplay.pixels[index + 2];

                // fill the macthing colors and draw rectangles
                fill(r, g, b);
                rect(i * vScale + 20, j * vScale + 50, vScale, vScale);
            }
        }

    }

}






