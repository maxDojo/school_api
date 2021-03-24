Student
_get_ **/** - returns all students as an array
_get_ **/:id** - returns object containing student with the given id
_put_ **/enrol** - enrols student(s) in a program depending on the type of data recieved
_post_ **/new** - initializes new student data
_put_ **/:id** - modifies data for the selected student
_delete_ **/:id** - removes student data with given id from the database
_put_ **/attendance** - records attendance (in dev)

Academics
_get_ **/** - returns object containing all programs

courses (doubles as subjects)
_get_ **/** - returns a list of all courses
_get_ **/:id** - returns a list of specific course
_post_ **/new** - add new course data
_put_ **/:id** - edit data for the course with given id
_delete_ **/:id** - remove course with given id

programs (doubles as classes)
_get_ **/** - returns a list of all programss
_get_ **/:id** - returns a list of specific programs
_post_ **/new** - add new programs data
_put_ **/:id** - edit data for the programs with given id
_delete_ **/:id** - remove programs with given id

Next => create auth middleware
Current => working on auth middleware
