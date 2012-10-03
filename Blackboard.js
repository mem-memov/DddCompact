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
        var board = lecturer.boardCollection.createItem();
        console.log(board);
    }
    
    return lecturer.init(core);
    
}

Blackboard.Board = function() {
    
    var board = {};
    
    board.init = function() {
        
        
        return {
            
        };
        
    }
    
    return board.init();
    
}



}