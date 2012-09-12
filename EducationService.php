<?php
class EducationService implements DddCompact_Service_Interface {

    private $data;
    
    public function __construct() {

        $this->data = array(
            'Teacher' => array(
                'teach' => array(

                )
            )
        );
        
    }

    public function go($class) {

        return $this->data[$class]['readAll'];
        
    }
 
}

return new EducationStore();