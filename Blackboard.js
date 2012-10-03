function(Blackboard) {



Blackboard.Lecturer = function(core) {
    
    var lecturer = {};

    lecturer.init = function(core) {
        
        core.isIn(lecturer);
        core.defineCollection('boardCollection', 'Board');
        
        return {
            useBoard: lecturer.useBoard
        };

    }
    
    lecturer.useBoard = function(domElement) {
        var board = lecturer.boardCollection.createItem({
            domElement: domElement
        });
        
    }
    
    return lecturer.init(core);
    
}

Blackboard.Board = function(core, boardOptions) {
    
    var board = {
        domElement: null
    };
    
    board.init = function(core, boardOptions) {
        
        board.domElement = boardOptions.domElement;
        board.domElement.style.backgroundColor = "black";
        return {
            
        };
        
    }
    
    return board.init(core, boardOptions);
    
}



}