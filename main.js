var dddCompact = new DddCompact({
    Education: 'Education.js',
    Persistence: 'Persistence.js'
});

var school = dddCompact.makeItem("Education", "School", {});

school.enrollTeacher('Sergei', 'Sobakin');

var teachers = school.getTeachers();

for (i in teachers) {
    teachers[i].teach();
}

