var dddCompact = new DddCompact({
    Education: this.Education,
	Persistence: this.Persistence
});

var school = dddCompact.makeItem("Education", "School", {});

var teachers = school.getTeachers();

school.looseTeacher(teachers[0]);

var teachers = school.getTeachers();

console.log(teachers);