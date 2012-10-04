

window.onload=function() {
    
    
    var lecturer = dddCompact.makeItem("Blackboard", "Lecturer", {});


    lecturer.useBoard(document.getElementById('panel'));



};



/*
var school = dddCompact.makeItem("Education", "School", {});

school.enrollTeacher('Sergei', 'Sobakin');

var teachers = school.getTeachers();

for (i in teachers) {
    teachers[i].teach();
}
*/
