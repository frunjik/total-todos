// /schemas/todos.js
// Create a table to store todo data
var TodosTable = TABLE('todos');

// Define a new schema for 'Todos'
NEWSCHEMA('Todos', function(schema) {

    // Action for querying todos
    schema.action('query', {
        name: 'List todos',
        query: 'search:String',
        action: function($) {

            TodosTable
                .find()
                .callback($.callback);

        }
    });

    // Action for inserting a new todo
    schema.action('insert', {
        name: 'Insert new todo',
        input: '*title:String',
        action: function($, model) {

            // Generate a unique ID and set the creation timestamp
            model.id = UID();
            model.dtcreated = NOW;

            // // Create a search string for the todo
            // model.search = (model.title).toSearch();

            TodosTable
                .insert(model)
                .callback($.callback);

        }
    });

    // Action for removing all todos
    schema.action('wipe', {
        name: 'Remove all todos',
        action: function($) {

            TodosTable
                .clear($.callback);

        } 
    });

});
