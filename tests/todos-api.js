// Example
// File: {app}/tests/users.js

require('total4');

const host = 'http://localhost:8000/'

TESTER(function(group, start) {
    group('Todos API', function(test, cleanup) {

        test('Create', function(next) {

            RESTBuilder.POST(host + 'api/todos/', { title: 'test' }).exec(function(err, res) {
                err ? next(err) : next();
            });

            // Shorthand
            RESTBuilder.POST(host + 'api/todos/', { title: 'test2' }).exec(next);
        });

        test('Query', function(next) {

            RESTBuilder.GET(host + 'api/todos/').exec(function(err, res) {

                const length = res.length;

                err 
                    ? next(err) 
                    : 2 !== length
                    ? next(`expected 2 todos, but got ${length}`)
                    : next() 
            });

        });

        test('Wipe', function(next) {

            RESTBuilder.POST(host + 'api/todos_wipe').exec(function(err, res) {
                err ? next(err) : next();
            });

        });

        test('Query', function(next) {

            RESTBuilder.GET(host + 'api/todos/').exec(function(err, res) {

                const length = res.length;

                err 
                    ? next(err) 
                    : 0 !== length
                    ? next(`expected 0 todos, but got ${length}`)
                    : next() 
            });

        });

    });

    start();
});
