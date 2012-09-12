<?php
class DddCompact_Application {

    public function makeDomain(
        $pathToDirectory, 
        DddCompact_Store_Interface $store = null, 
        DddCompact_Service_Interface $service = null
    ) {
        
        $fileSystem = new DddCompact_FileSystem($pathToDirectory);
        $instantiator = new DddCompact_Instantiator($fileSystem, $store, $service);

        return new DddCompact_Domain($instantiator);
        
    }


    
}
class DddCompact_FileSystem {
    
    private $pathToDomainDirectory;
    
    public function __construct($pathToDomainDirectory) {
        
        $this->pathToDomainDirectory = $pathToDomainDirectory;
        
    }
    
    public function loadDomainClass($class) {
        
        if (!class_exists($class)) {
            $path = $this->pathToDomainDirectory.'/'.$class.'.php';
            require_once($path);
        }
        
    }

}
class DddCompact_Instantiator {
    
    private $fileSystem;
    private $storeProvider;
    private $serviceProvider;
    
    public function __construct(
        DddCompact_FileSystem $fileSystem,
        DddCompact_StoreProvider $storeProvider = null, 
        DddCompact_ServiceProvider $serviceProvider = null
    ) {
        
        $this->fileSystem = $fileSystem;
        $this->storeProvider = $storeProvider;
        $this->serviceProvider = $serviceProvider;
        
    }
    
    public function instantiateItem($class) {
        
        $this->fileSystem->loadDomainClass($class);
        $core = new DddCompact_Core($class, $this);
        $item = new $class($core);
        return array($item, $core);
        
    }
    
    public function instantiateStore($class) {

        $store = $this->storeProvider->provide($class);

        return $store;
        
    }
}
class DddCompact_Store_Interface {
    
}
class DddCompact_StoreProvider {

    protected $mockData;
    
    public function provide($class) {

        if (isset($this->mockData[$class])) {
            return new DddCompact_MockStore($this->mockData[$class]);
        } else {
            return $this->$class();
        }

    }
    
}
class DddCompact_MockStore implements DddCompact_Store_Interface {
    
    private $data;
            
    public function __construct($data) {
        
        $this->data = $data;
        
    }
    
    public function __call($method, $arguments) {
        
        return $this->data[$method];
        
    }
    
}
class DddCompact_ServiceProvider {
    
}
class DddCompact_Exception extends Exception {
    
}
class DddCompact_Domain {
    
    private $instantiator;
    
    public function __construct(
        DddCompact_Instantiator $instantiator
    ) {
        
        $this->instantiator = $instantiator;
        
    }
    
    public function get($class) {
        
        list($item, $core) = $this->instantiator->instantiateDomainItem($class);

        return $item;
        
    }

}
class DddCompact_Core {

    private $class;
    private $instantiator;
    
    private $fieldNames;
    private $idFieldName;
    private $collectionNames;
    private $collectionInstances;
    private $serviceNames;
    private $serviceInstances;
    
    
    public function __construct(
        $class,
        DddCompact_Instantiator $instantiator
    ) {

        $this->class = $class;
        $this->instantiator = $instantiator;
        
        $this->fieldNames = array();
        $this->idFieldName = null;
        $this->collectionNames = array();
        $this->collectionInstances = array();
        $this->serviceNames = array();
        $this->serviceInstances = array();
        
    }
    
    public function defineIdField($name) {
        
        if (!is_null($this->idFieldName)) {
            throw new DddCompact_Exception();
        }
        
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
        
        return array($this->class => $record);
        
    }
    
    public function idIsSet() {
        
        foreach ($this->idFieldNames as $idFieldName) {
            
        }
        
    }
    
    public function defineCollection($name, $class) {
        
        if (in_array($name, $this->collectionNames)) {
            throw new DddCompact_Exception();
        }

        $this->collectionNames[] = $name;
        $this->collectionInstances[$name] = new DddCompact_Collection(
            $class,
            $this->instantiator->instantiateStore($class),
            $this->instantiator
        );
        $this->$name = $this->collectionInstances[$name];
        
    }
    
    public function defineService($property, $service) {
        
        if (in_array($service, $this->serviceNames)) {
            throw new DddCompact_Exception();
        }

        $this->serviceNames[] = $property;
        $this->serviceInstances[$property] = new DddCompact_Collection(

        );
        $this->$property = $this->serviceInstances[$property];
        
    }
    
    public function findById(array $cores = array()) {

        $isFound = false;
        
        foreach ($cores as $core) {
            $idFieldName = $this->idFieldName;
            if ($this->$idFieldName === $core->$idFieldName) {
                $isFound = true;
                break;
            }
            
        }
        
        if ($isFound) {
            return $core;
        } else {
            return null;
        }
        
        
    }
}
class DddCompact_Collection {

    private $class;
    private $store;
    private $instantiator;

    private static $cores = array();
    private static $items = array();

    public function __construct(
        $class,
        DddCompact_FantomStore $store,
        DddCompact_Instantiator $instantiator
    ) {

        $this->class = $class;
        $this->store = $store;
        $this->instantiator = $instantiator;
        
    }
    
    public function create(array $record) {

        return $this->make($record);
        
    }
    
    public function readAll() {
        $records = $this->store->readAll();
        return $this->makeMultiple($records);
    }
    
    public function readById($id) {
        $record = $this->store->readById($id);
        return $this->make($record);
    }
    
    public function readByFilter(array $parameters) {
        $records = $this->store->readByParameters($parameters);
        return $this->makeMultiple($records);
    }
    
    public function readByConnectedItems() {
        
        $connectedItems = func_get_args();
        
        $connectedCores = array();
        foreach ($connectedItems as $connectedItem) {
            $connectedCores[] = $this->retrieveCore($connectedItem);
        }
        
        $records = array();
        foreach ($connectedCores as $connectedCore) {
            $records[] = $connectedCore->getRecord();
        }
        
        return $this->makeMultiple($records);
        
    }
    
    public function update($item) {
        $core = $this->cores[spl_object_hash($item)];
        $record = $core->getRecord();
        if (!$core->idIsSet()) {
            $this->store->create($record);
        } else {
            $this->store->update($record);
        }
    }
    
    public function delete($item) {
        $core = $this->cores[spl_object_hash($item)];
        $this->store->delete($core->getRecord());
        unset($this->cores[spl_object_hash($item)]);
        unset($item);
    }
    
    private function makeMultiple(array $records) {

        $items = array();
        
        foreach ($records as $record) {
            
            $items[] = $this->make($record);
            
        }
        
        return $items;
        
    }
    
    private function make(array $record) {
        
        list($item, $core) = $this->instantiator->instantiateDomainItem($this->class);
        
        $existingCore = $core->findById(self::$cores);

        if (!is_null($existingCore)) {
            
            $existingCore->setFields($record);
            
            return $this->retrieveItem($existingCore);

        } else {
            
            $core->setFields($record);

            $this->insertCore($item, $core);
            $this->insertItem($core, $item);
            
            return $item;
            
        }

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