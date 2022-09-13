function Waffle(x, y, width, height, boxes_across, boxes_down, table, columnHeading, possibleValues){
    
    // Name for visulation in menu bar
    this.name = 'Waffle Charts';
    
    // Id with no special characters
    this.id = 'waffle';
    
    
    
    // Waffle containing the boxes
    // variables apply to the whole diagram is going to be
    var x = x;
    var y = y;
    var height = height;
    var width = width;
    var boxes_down = boxes_down;
    var boxes_across = boxes_across;
    //var columnHeading = columnHeading;
    
    // The type of waffle/column from the csv file 
    var column = table.getColumn(columnHeading);
    // Answer people gave from survey
    var possibleValues = possibleValues;
    // Colours to distnguish each value/answer 
    var colours = ["red", "green", "blue", "purple", "yellow"];
    
    // Stores proportions of how many people have responded to each category as array of objects
    var categories = [];
    
    
    // Stores an array of boxes created in the addCategories function
    var boxes = [];
    
    
    

    
    // Finds location of a category
    function categoryLocation(categoryName){
        for(var i = 0; i < categories.length; i++){
            if(categoryName == categories[i].name){
                return i;
            }
        }
        return -1;
    }
    
    // Adds the different categories as objects to array by iterating over the possibleValues
    function addCategories(){
        // Creates objects and pushes to categories array
        for(var i = 0; i < possibleValues.length; i++){
            categories.push({
                "name" : possibleValues[i],
                "count" : 0,
                "colour" : colours[i % colours.length]
            })
            
        }
        
        //Adds to the count of how many respondandts for each category 
        for(i = 0; i < column.length; i++){
            var catLocation = categoryLocation(column[i])
            
            if(catLocation != -1){
                categories[catLocation].count++;
            }
        }
        
        // Iterate over categories and add proportions and boxes property to categories objects
        // 1 box does nopt represent 1 person, but a proportion of persons
        
        for(var i = 0; i < categories.length; i++){
            categories[i].boxes = round((categories[i].count / column.length) * (boxes_down * boxes_across));
            
        }
 
    }
    
    
    
    // Adds the boxes with the data structure, ready to pass to draw
    function addBoxes(){
        var currentCategory = 0;
        var currentCategoryBox = 0;
        
        var boxWidth = width / boxes_across;
        var boxHeight = height / boxes_down;
        
        for(var i = 0; i < boxes_down; i++){
            boxes.push([])
            for(var j = 0; j < boxes_across; j++){
                if(currentCategoryBox == categories[currentCategory].boxes){
                    currentCategoryBox = 0;
                    currentCategory++;
                }
                
                boxes[i].push(new Box(x + (j * boxWidth), y + (i * boxHeight),boxWidth, boxHeight, categories[currentCategory]));
                currentCategoryBox++;
            }
        }
    }
    
    
    addCategories();
    addBoxes();
    
    //draw waffle diagram
    this.draw = function(){
       
        // Title of waffles
         push();
         fill(0);
         textSize(20);
         text(columnHeading, x + 50, y - 10);
         pop();
        
        
        //Outer loop iterates over the array 
        for( var i = 0; i < boxes.length; i++){
            //Inner loop iterates over each element in the array, which is also an array
            for(var j = 0; j < boxes[i].length; j++){
                if(boxes[i][j].category != undefined){
                    boxes[i][j].draw();
                }
            }
        }
    }
    
    
    
    // Checks all the boxes and see if mouse os over that box
    this.checkMouse = function(mouseX, mouseY){
        for( var i = 0; i < boxes.length; i++){
            for(var j = 0; j < boxes[i].length; j ++){
                
                if(boxes[i][j].category != undefined){
                var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                if(mouseOver != false){
                    push();
                    fill(0);
                    textSize(20);
                    var tWidth = textWidth(mouseOver);
                    textAlign(LEFT, TOP);
                    rect(mouseX, mouseY, tWidth + 20, 40);
                    fill(255);
                    text(mouseOver, mouseX + 10, mouseY + 10);
                    pop();
                    break;
                }
            }
          }
        }
      } 
    
}