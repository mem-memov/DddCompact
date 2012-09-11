<?php class DddCompact_Fantom_Education_f4a09f3d4a2b77187fcda164127dfc7f_Store_Teacher extends DddCompact_FantomStore {


    public function readAll() {
        $arguments = func_get_args();
        array_unshift($arguments, "Teacher");
        return call_user_func_array(array($this->store, "readAll"), $arguments);
    }

/*mark*/
}