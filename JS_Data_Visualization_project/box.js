function Box(x, y, width, height, category){
    // A indivual box inside the Waffle
    var x = x;
    var y = y;
    var height;
    var width;
    
    //Category of the box being drawn
    this.category = category;
    
    // Is the move over this particular box?
    this.mouseOver = function(mouseX, mouseY){
        // If so, return the boxes category
        if(mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height){
            return this.category.name;
        }
            // If not over return false
            return false;
    
    }
    // Draws the box inside the Waffle
    this.draw = function(){
        fill(category.colour);
        rect(x, y, width, height);
    }
}