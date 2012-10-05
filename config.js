var dddCompact = new DddCompact({
    Blackboard: 'Blackboard.js',
    Library: 'Library.js',
    Persistence: 'Persistence.js'
}, {
    setRecordId: function(data, eventBus) {
        var persistence = eventBus.makeSingleton("Persistence", "Persistence");
        return persistence.setRecordId(data.domainName, data.itemClass, data.idFieldName, data.record);
    },
    readAllRecords: function(data, eventBus) {
        var persistence = eventBus.makeSingleton("Persistence", "Persistence");
        return persistence.readAllRecords(data.domainName, data.itemClass);
    },
    updateRecord: function(data, eventBus) {
        var persistence = eventBus.makeSingleton("Persistence", "Persistence");
        return persistence.updateRecord(data.domainName, data.itemClass, data.idFieldName, data.record);
    },
    deleteRecord: function(data, eventBus) {
        var persistence = eventBus.makeSingleton("Persistence", "Persistence");
        return persistence.deleteRecord(data.domainName, data.itemClass, data.idFieldName, data.idFieldValue);
    },
    setDomElementStyle: function(data, eventBus) {
        var $ = eventBus.makeSingleton("Library", "JQuery");
        $(data.domElement).css(data.style);
        
    },
    bindEventHandlerToDomElement: function(data, eventBus) {
        var $ = eventBus.makeSingleton("Library", "JQuery");
        switch (data.event) {
            case "onmousemove":
                $(data.domElement).unbind('mousemove');
                $(data.domElement).mousemove(function(e) { 
                    data.handler(e.clientX, e.clientY);
                });
                break;
            case "onclick":
                $(data.domElement).unbind('click');
                $(data.domElement).click(function(e) { 
                    data.handler(e.clientX, e.clientY);
                });
                break;
            case "onmousedown":
                $(data.domElement).unbind('mousedown');
                $(data.domElement).mousedown(function(e) { 
                    data.handler(e.clientX, e.clientY);
                });
                break;
            case "onmouseup":
                $(data.domElement).unbind('mouseup');
                $(data.domElement).mouseup(function(e) { 
                    data.handler(e.clientX, e.clientY);
                });
                break;
        }
    },
    createSvgElement: function(data, eventBus, utilities) {
        
        //Defining the SVG Namespace
        var svgNS = "http://www.w3.org/2000/svg";
        //Creating a Document by Namespace
        var element = document.createElementNS(svgNS, data.type);
        
        if (!utilities.test.isEmpty(data.attributes)) {
            utilities.object.each(data.attributes, function(key, value) {
                element.setAttribute(key, value);
            });
        }
       
        if (!utilities.test.isEmpty(data.container)) {
            data.container.appendChild(element);
        }

        return element;
        
    }
});