function(Education) {

Education.School = function(core) {

    var school = this;
    school.properties = {};
    school.publicMembers = {};

    school.init = function(core) {

        core.isIn(school);

        core.defineCollection('teacherCollection', 'Teacher');

        school.publicMembers = {
            getTeachers: school.getTeachers,
            looseTeacher: school.looseTeacher,
            enrollTeacher: school.enrollTeacher
        };

        return school.publicMembers;

    };

    school.getTeachers = function() {
        //var teachers = school.teacherCollection.createItem();
        //var teachers = school.teacherCollection.readItemUsingId(5);
        var teachers = school.teacherCollection.readAllItems();
        return teachers;
    };

    school.looseTeacher = function(teacher) {
        school.teacherCollection.deleteItem(teacher);
    }
    
    school.enrollTeacher = function(firstName, lastName) {
        
        var newTeacher = school.teacherCollection.createItem({
            firstName: firstName,
            lastName: lastName
        });
        
        school.teacherCollection.updateItem(newTeacher);
        
    }
    
    return school.init(core);

};
Education.Teacher = function(core) {

    var teacher = this;
    teacher.properties = {};
    teacher.publicMembers = {};

    teacher.init = function(core) {

        core.isIn(teacher);
        core.defineIdField('id');
        core.defineField('firstName');
        core.defineRequiredField('lastName');
        core.defineUtilities();

        teacher.publicMembers = {
            teach: teacher.teach
        };

        return teacher.publicMembers;

    };
    
    teacher.teach = function() {

        console.log('I am ' + teacher.firstName + ' ' + teacher.lastName);
        
    };

    return teacher.init(core);

}


}
