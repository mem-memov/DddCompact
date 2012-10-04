function(Blackboard) {



Blackboard.Lecturer = function(core) {
    
    var lecturer = this;

    lecturer.init = function(core) {
        
        core.isIn(lecturer);
        core.defineCollection('boardCollection', 'Board');
        core.defineMessages('TouchBoard');
        
        return {
            useBoard: lecturer.useBoard
        };

    }
    
    lecturer.useBoard = function(domElement) {
        
        var board = lecturer.boardCollection.createItem({
            domElement: domElement
        });
        
        //lecturer.touchBoard();
        
        board.contact(lecturer.TouchBoard());
        
    }
    
    return lecturer.init(core);
    
}

Blackboard.Board = function(core) {

    var board = this;
    
    board.init = function(core) {
        
        core.isIn(board);
        core.defineRequiredField('domElement');
        core.defineEvents('setDomElementStyle', 'bindEventHandlerToDomElement');

        

        board.setDomElementStyle({
            domElement: board.domElement,
            style: {
                "background-color": "blue"
            }
        });
        
        board.bindEventHandlerToDomElement({
            domElement: board.domElement,
            event: "onmousemove",
            handler: function(x, y) {
                
		//Defining the SVG Namespace
		var svgNS = "http://www.w3.org/2000/svg";
		//Creating a Document by Namespace
		var dot = document.createElementNS(svgNS, "circle");

                
                
                //var dot = document.createElement("CIRCLE");
                dot.setAttribute("cx",x);
                dot.setAttribute("cy",y);
                dot.setAttribute("r",1);
                dot.setAttribute("fill","white");
                board.domElement.appendChild(dot);
            }
        });
        
        return {
            contact: board.contact
        };
        
    };
    
    board.contact = function(contactMessage) {
        
        
    };
    
    return board.init(core);
    
}

Blackboard.TouchBoard = function() {

    var message = this;
    
    message.init = function() {
        
        
        
        return {
            
        };
        
    }
    
    return message.init();
    
}



}