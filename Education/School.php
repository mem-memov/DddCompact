<?php
class School {
    
    public function __construct($core) {
        
        $this->core = $core;
        
        $core->defineField('name');
        
        $core->defineCollection('teacherCollection', 'Teacher');
        
    }
    
    public function appear() {
        return $this->core->teacherCollection->readAll();
        return $this->core->teacherCollection;
        return $this->core->name;
    }
    
}