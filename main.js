var dddCompact = new DddCompact({
    namespace: this
});
var domain = dddCompact.makeDomain('Education');
var school = domain.makeItem('School');
var teachers = school.getTeachers();
//console.log(teachers);