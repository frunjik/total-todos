// Example
// File: {app}/tests/todos.js

require('total4');

const database = TABLE('todos');

TESTER(function(group, start) {
    group('Todos Database', function(test, cleanup) {

        test('Create', function(next) {

            database.alter('id:uid,title:string,dtcreated:date,dtupdated:date', next);

        });

        test('Count', function(next) {

            database.count()
                .callback((err, data) => {

                    if (err) {

                        next(err);

                    } else {

                        console.log('COUNT', data);
                        next();

                    }
                });

        });

    });

    start();
});
