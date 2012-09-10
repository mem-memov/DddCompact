<?php
class EducationStore implements DddCompact_Store_Interface {

    private $data;
    
    public function __construct() {

        $this->data = array(
            'Teacher' => array(
                'read' => array(
                    array('firstName' => 'Иван', 'lastName' => 'Иванов'),
                    array('firstName' => 'Пётр', 'lastName' => 'Петров')
                )
            )
        );
        
    }
    
    public function read($class, $method) {
        
        return $this->data[$class][$method];
        
    }
    
    public function update($class, array $record) {
        
        switch ($class) {
            
            case 'Teacher':
                
                break;
            
            default:
                break;
        }
        
    }
    
    public function delete($class, array $record) {
        
        switch ($class) {
            
            case 'Teacher':
                
                break;
            
            default:
                break;
        }
        
    }
    
    public function fetch($class, $method, $arguments) {
        
        switch ($class) {
            
            case 'Teacher':
                
                switch ($method) {
                    case 'readAll':
                        var_dump($this->dataAccessObjects);
                        return $this->dataAccessObjects[$class]['read']();
                        break;
                    default:
                        break;
                }
                
                break;
            
            default:
                
                break;
            
        }
        
    }
    
    private function dataToDataAccessObjects() {
        
        $this->readAccessObjects = array();
        
        foreach ($this->data as $class => $data) {
            
            $this->readAccessObjects[$class] = new stdClass();
            
            foreach ($data as $method => $result) {
                
                $this->readAccessObjects[$class]
                        
            }
            
        }
        
    }
    
}

return new EducationStore();