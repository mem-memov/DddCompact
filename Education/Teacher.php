<?php
class Teacher {
    
    public function __construct($core) {
        
        $this->core = $core;
        
        $core->defineIdField('id');
        $core->defineField('firstName');
        $core->defineField('lastName');
        
    }

}