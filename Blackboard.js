function(Blackboard) {



Blackboard.Lecturer = function(core) {
    
    var lecturer = this;

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

Blackboard.Board = function(core) {

    var board = this;
    
    board.init = function(core) {
        
        core.isIn(board);
        core.defineRequiredField('domElement');
        core.defineEvents('setDomElementStyle');

        board.domElement.style.backgroundColor = "black";
        board.setDomElementStyle({
            domElement: board.domElement,
            style: {
                "background-color": "blue"
            }
        });
        
        return {
            
        };
        
    }
    
    return board.init(core);
    
}



}