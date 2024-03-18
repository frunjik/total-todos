// Example
// File: {app}/tests/users.js

require('total4');

TESTER(function(group, start) {

    const Todos = TABLE('todo');

    group('Todos TABLE', function(test, cleanup) {

        test('Create', function(next) {

            Todos.alter('id:string,title:string', next);

        });

        test('Insert', function(next) {

            Todos
                .insert({id:'1',title:'test'})
                .callback((err, data) => {
                    console.log(data);
                    next(err ? err : undefined);
                });

        });

        test('Query', function(next) {

            Todos
                .find()
                .callback((err, data) => {
                    console.log(data);
                    next(err ? err : undefined);
                });

        });

        test('Wipe', function(next) {

            Todos
                .clear()
                .callback((err, data) => {
                    next(err ? err : undefined);
                });

        });


        test('Query', function(next) {

            Todos
                .find()
                .callback((err, data) => {
                    console.log(data);
                    next(err ? err : undefined);
                });

        });

    });

    start();
});
