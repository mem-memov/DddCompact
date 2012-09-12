<?php
class EducationStore extends DddCompact_StoreProvider {

    private $store;
    
    public function __construct() {

        $this->store = array(
            'Teacher' => array(
                'readAll' => array(
                    array('id' => 1, 'firstName' => 'Иван', 'lastName' => 'Иванов'),
                    array('id' => 2, 'firstName' => 'Пётр', 'lastName' => 'Петров')
                )
            )
        );
        
    }
 
}

return new EducationStore();