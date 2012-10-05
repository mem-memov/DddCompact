function(Blackboard) {



Blackboard.Lecturer = function(core) {
    
    var lecturer = this;

    lecturer.init = function(core) {
        
        core.isIn(lecturer);
        core.defineCollection('boardCollection', 'Board');
        core.defineMessages('TouchBoard');
        core.defineEvents('bindEventHandlerToDomElement');
        
        return {
            useBoard: lecturer.useBoard
        };

    }
    
    lecturer.useBoard = function(domElement) {
        
        var board = lecturer.boardCollection.createItem({
            domElement: domElement
        });
        
        lecturer.bindEventHandlerToDomElement({
            domElement: domElement,
            event: "onmousedown",
            handler: function(x, y) { 
                
                board.showPath(x, y);

            }
        });
        
        lecturer.bindEventHandlerToDomElement({
            domElement: domElement,
            event: "onmouseup",
            handler: function(x, y) { 
                board.stopReacting(x, y);
            }
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
        core.defineField('currentPath');
        core.defineCollection('pathCollection', 'Path');
        core.defineEvents(
            'setDomElementStyle', 
            'bindEventHandlerToDomElement',
            'createSvgElement'
        );

        board.setDomElementStyle({
            domElement: board.domElement,
            style: {
                "background-color": "blue"
            }
        });
     
        return {
            contact: board.contact,
            showPath: board.showPath,
            stopReacting: board.stopReacting
        };
        
    };
    
    board.showPath = function(x, y) {
      
        board.currentPath = board.pathCollection.createItem({
            x: x,
            y: y,
            svgContainer: board.domElement
        });
      
        board.bindEventHandlerToDomElement({
            domElement: board.domElement,
            event: "onmousemove",
            handler: function(x, y) {
 
		board.currentPath.addDot(x, y);
                
            }
        });
        
    };
    
    board.stopReacting = function(x, y) {
        
        board.bindEventHandlerToDomElement({
            domElement: board.domElement,
            event: "onmousemove",
            handler: function(x, y) {
 
		console.log('stopped');
                
            }
        });
        
    };
    
    board.contact = function(contactMessage) {
        
        
    };
    
    return board.init(core);
    
}

Blackboard.Path = function(core) {
    
    var path = this;
    
    path.init = function(core) {
        
        core.isIn(path);
        core.defineRequiredField('x');
        core.defineRequiredField('y');
        core.defineRequiredField('svgContainer');
        core.defineField('svgPath');
        core.defineField('command');
        core.defineEvents(
            'createSvgElement'
        );
            
        path.command = "M" + path.x + " " + path.y;
        
        path.svgPath = path.createSvgElement({
            type: "path",
            attributes: {
                "d": path.command,
                "stroke": "white",
                "stroke-width": 1,
                "fill": "none",
                "result": null
            },
            container: path.svgContainer
        });

        return {
            addDot: path.addDot
        }
        
    };
    
    path.addDot = function(x, y) {
        path.command += " L" + x + " " + y;
        path.svgPath.setAttribute("d", path.command);
    };

    return path.init(core);
    
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