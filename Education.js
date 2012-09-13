Education = {};
Education.School = function(core) {

    var school = this;
    school.properties = {};
    school.publicMembers = {};

    school.init = function(core) {

        school.core = core;

        school.core.defineCollection('teacherCollection', 'Teacher');

        school.publicMembers = {
            getTeachers: school.getTeachers
        };

        return school.publicMembers;

    };

    school.getTeachers = function() {
        var teacher = school.core.teacherCollection.createItem();
        return teacher;
    };

    return school.init(core);

};
Education.Teacher = function(core) {

    var teacher = this;
    teacher.properties = {};
    teacher.publicMembers = {};

    teacher.init = function(core) {

        teacher.core = core;

        teacher.core.defineIdField('id');
        teacher.core.defineField('firstName');
        teacher.core.defineField('lastName');
console.log(core);
        teacher.publicMembers = {

        };

        return teacher.publicMembers;

    };


    return teacher.init(core);

}