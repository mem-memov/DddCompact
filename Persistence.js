function(Persistence) {Persistence.Persistence = function(persistenceOptions) {    var persistence = this;        persistence.properties = {        data: null    };        persistence.publicMembers = {};        persistence.init = function(persistenceOptions) {                persistence.properties.data = {            Education: {                Teacher: [                    { id: 5, firstName: "Ivan", lastName: "Ivanov" },                    { id: 6, firstName: "Petr", lastName: "Petrov" },                    { id: 7, firstName: "Sidor", lastName: "Sidorov" }                ]            }        };                persistence.publicMembers = {            setRecordId: persistence.setRecordId,            readRecordUsingId: persistence.readRecordUsingId,            readAllRecords: persistence.readAllRecords,            updateRecord: persistence.updateRecord,            deleteRecord: persistence.deleteRecord        };                return persistence.publicMembers;            };        persistence.readAllRecords = function(domainName, itemClass) {        var records = [];        if (                !persistence.properties.data[domainName]            ||     !persistence.properties.data[domainName][itemClass]            ||     !persistence.properties.data[domainName][itemClass][0]        ) {                    return records;                }        records = persistence.properties.data[domainName][itemClass];                return records;            };        persistence.deleteRecord = function(domainName, itemClass, idFieldName, idFieldValue) {        if (                !persistence.properties.data[domainName]            ||     !persistence.properties.data[domainName][itemClass]            ||     !persistence.properties.data[domainName][itemClass][0]        ) {                    return false;                }                for (var i in persistence.properties.data[domainName][itemClass]) {            if (persistence.properties.data[domainName][itemClass][i][idFieldName] == idFieldValue) {                                var start = persistence.properties.data[domainName][itemClass].slice(0, i);                var end = persistence.properties.data[domainName][itemClass].slice(i+1);                persistence.properties.data[domainName][itemClass] = start.concat(end);                break;                                            }                    }        return true;        }        persistence.readRecordUsingId = function(domainName, itemClass, idField, id) {            var record = null;                if (                !persistence.properties.data[domainName]            ||     !persistence.properties.data[domainName][itemClass]            ||     !persistence.properties.data[domainName][itemClass][0]        ) {                    return record;                }                        for (var i in persistence.properties.data[domainName][itemClass]) {                        if (                    persistence.properties.data[domainName][itemClass][i][idField]                &&    persistence.properties.data[domainName][itemClass][i][idField] == id            ) {                record = persistence.properties.data[domainName][itemClass][i];                break;            }                    }                return record;        }        persistence.updateRecord = function(domainName, itemClass, idFieldName, record) {            if (                !persistence.properties.data[domainName]            ||  !persistence.properties.data[domainName][itemClass]            ||  !persistence.properties.data[domainName][itemClass][0]            ||  !record[idFieldName]        ) {                    return false;                }                var isNewRecord = true;                for (var i in persistence.properties.data[domainName][itemClass]) {            if (persistence.properties.data[domainName][itemClass][i][idFieldName] == record[idFieldName]) {                                for (var k in persistence.properties.data[domainName][itemClass][i]) {                                        persistence.properties.data[domainName][itemClass][i][k] = record[k];                                    }                                isNewRecord = false;                break;                                            }                    }                if (isNewRecord) {                        if (!persistence.properties.data[domainName][itemClass][0]) {                                persistence.properties.data[domainName][itemClass].push(record);                            } else {                                persistence.properties.data[domainName][itemClass].push({});                                var index = persistence.properties.data[domainName][itemClass].length - 1;                                for (var j in persistence.properties.data[domainName][itemClass][0]) {                    persistence.properties.data[domainName][itemClass][index][j] = record[j];                }                            }        }        return true;        };        persistence.setRecordId = function(domainName, itemClass, idFieldName, record) {            if (                !persistence.properties.data[domainName]            ||     !persistence.properties.data[domainName][itemClass]        ) {                    return false;                }                if (!persistence.setRecordId.max) {                        persistence.setRecordId.max = 1;            for (var i in persistence.properties.data[domainName][itemClass]) {                if (persistence.properties.data[domainName][itemClass][i][idFieldName] > persistence.setRecordId.max) {                    persistence.setRecordId.max = persistence.properties.data[domainName][itemClass][i][idFieldName];                }            }                    }                persistence.setRecordId.max++;                record[idFieldName] = persistence.setRecordId.max;                };        return persistence.init(persistenceOptions);};}