var school = dddCompact.makeItem("Education", "School", {});

school.enrollTeacher('Sergei', 'Sobakin');

var teachers = school.getTeachers();

for (i in teachers) {
    teachers[i].teach();
}

