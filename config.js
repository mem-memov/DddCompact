var dddCompact = new DddCompact({
    Blackboard: 'Blackboard.js',
    Division: 'Division.js',
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
    }
});