<?php
class EducationStore implements DddCompact_Store_Interface {

    private $data;
    
    public function __construct() {

        $this->data = array(
            'Teacher' => array(
                'readAll' => array(
                    array('id' => 1, 'firstName' => 'Иван', 'lastName' => 'Иванов'),
                    array('id' => 2, 'firstName' => 'Пётр', 'lastName' => 'Петров')
                )
            )
        );
        
    }

    public function readAll($class) {

        return $this->data[$class]['readAll'];
        
    }
 
}

return new EducationStore();