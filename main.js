var lecturer = dddCompact.makeItem("Blackboard", "Lecturer", {});
console.log(lecturer);

lecturer.useBoard();

var board = dddCompact.makeItem("Blackboard", "Board", {});

console.log(board);


/*
var school = dddCompact.makeItem("Education", "School", {});

school.enrollTeacher('Sergei', 'Sobakin');

var teachers = school.getTeachers();

for (i in teachers) {
    teachers[i].teach();
}
*/
