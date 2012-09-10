<?php
class DddCompact_Application {
    
    public function makeDomain(
        $pathToDirectory, 
        DddCompact_Store_Interface $store = null, 
        DddCompact_Service_Interface $service = null
    ) {
        
        return new DddCompact_Domain($pathToDirectory, $store, $service);
        
    }
    
}
interface DddCompact_Store_Interface {
    public function fetch($class, $method, $arguments);
}
interface DddCompact_Service_Interface {
    
}
class DddCompact_Exception extends Exception {
    
}
class DddCompact_Domain {
    
    private $pathToDirectory;
    private $store;
    private $service;
    
    public function __construct(
        $pathToDirectory, 
        DddCompact_Store_Interface $store = null, 
        DddCompact_Service_Interface $service = null
    ) {
        $this->pathToDirectory = $pathToDirectory;
        $this->store = $store;
        $this->service = $service;
    }
    
    public function get($class) {
        require_once($this->pathToDirectory.'/'.$class.'.php');
        $core = new DddCompact_Core($this->pathToDirectory, $this->store, $this->service);
        return new $class($core);
    }

}
class DddCompact_Core {

    private $pathToDirectory;
    private $store;
    private $service;
    
    private $fieldNames;
    private $idFieldName;
    private $collectionNames;
    private $collectionInstances;
    
    
    public function __construct(
        $pathToDirectory, 
        DddCompact_Store_Interface $store = null, 
        DddCompact_Service_Interface $service = null
    ) {

        $this->pathToDirectory = $pathToDirectory;
        $this->store = $store;
        $this->service = $service;
        
        $this->fieldNames = array();
        $this->idFieldName = null;
        $this->collectionNames = array();
        $this->collectionInstances = array();
        
    }
    
    public function defineIdField($name) {
        
        $this->defineField($name);
        $this->idFieldName = $name;
        
    }
    
    public function defineField($name) {
        
        if (in_array($name, $this->fieldNames)) {
            throw new DddCompact_Exception();
        }
        
        $this->fieldNames[] = $name;
        $this->$name = null;
        
    }
    
    public function setFields(array $record) {
        
        foreach ($this->fieldNames as $field) {
            
            $this->$field = null;
            
        }
        
        foreach ($record as $field => $value) {
            
            if (!in_array($field, $this->fieldNames)) {
                throw new DddCompact_Exception();
            }
            
            $this->$field = $value;
            
        }

    }
    
    public function getRecord() {
        
        $record = array();
        
        foreach ($this->fieldNames as $field) {
            
            $record[$field] = $this->$field;
            
        }
        
        return $record;
        
    }
    
    public function defineCollection($name, $class) {
        
        if (in_array($name, $this->collectionNames)) {
            throw new DddCompact_Exception();
        }

        $this->collectionNames[] = $name;
        $this->collectionInstances[$name] = new DddCompact_Collection(
            $class, 
            $this->pathToDirectory, 
            $this->store,
            $this->service
        );
        $this->$name = $this->collectionInstances[$name];
        
    }
    
}
class DddCompact_Collection {

    private $class;
    private $pathToDirectory;
    private $store;
    private $service;
    
    private static $cores;
    private static $items;

    public function __construct(
        $class,
        $pathToDirectory, 
        DddCompact_Store_Interface $store = null, 
        DddCompact_Service_Interface $service = null
    ) {

        $this->class = $class;
        $this->pathToDirectory = $pathToDirectory;
        $this->store = $store;
        $this->service = $service;
        
        $this->cores = array();
        $this->items = array();
        
    }
    
    public function create(array $record) {

        return $this->make($record);
        
    }
    
    public function readById($id) {

        $record = $this->store->readById($this->class, $id);
        return $this->make($record);
        
    }
    
    public function readByConnectedItem($connectedItem) {
        
        $connectedCore = $this->retrieveCore($connectedItem);
        $connectedClass = get_class($connectedItem);
        $connectedRecord = $connectedCore->getRecord();
        $this->store->readByConnectedItem($connectedClass, $connectedRecord);
        
    }
    
    public function update($item) {
        $core = $this->cores[spl_object_hash($item)];
        $this->store->update($this->class, $core->getRecord());
    }
    
    public function delete($item) {
        $core = $this->cores[spl_object_hash($item)];
        $this->store->delete($this->class, $core->getRecord());
        unset($this->cores[spl_object_hash($item)]);
        unset($item);
    }
    
    private function make(array $record) {
        
        require_once($this->pathToDirectory.'/'.$this->class.'.php');
        
        $core = new DddCompact_Core($this->pathToDirectory, $this->store, $this->service);
        $item = new $this->class($core);
        $core->setFields($record);
        
        $this->insertCore($item, $core);
        $this->insertItem($core, $item);

        return $item;
    }
    
    private function insertCore($item, $core) {
        
        self::$cores[spl_object_hash($item)] = $core;
        
    }
    
    private function retrieveCore($item) {
        
        $key = spl_object_hash($item);
        
        if (array_key_exists($key, self::$cores)) {
            
            return self::$cores[$key];
            
        } else {
            
            return null;
            
        }
        
    }
    
    private function insertItem($core, $item) {
        
        self::$items[spl_object_hash($core)] = $item;
        
    }
    
    private function retrieveItem($core) {
        
        $key = spl_object_hash($core);
        
        if (array_key_exists($key, self::$items)) {
            
            return self::$items[$key];
            
        } else {
            
            return null;
            
        }
        
    }
    
}




return new DddCompact_Application();