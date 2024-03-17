// /schemas/todos.js
// Create an empty array to store todo data
var Todos = [];

// Define a new schema for 'Todos'
NEWSCHEMA('Todos', function(schema) {

    // Action for querying todos
    schema.action('query', {
        name: 'List todos',
        query: 'search:String',
        action: function($) {
            // Callback with the array of todos
            $.callback(Todos);
        }
    });

    // Action for reading a specific todo
    schema.action('read', {
        name: 'Read a specific todo',
        params: '*id:UID',
        action: function($) {
            var params = $.params;
            // Find the todo by ID in the array
            var item = Todos.findItem('id', params.id);
            if (!item) {
                // If the todo is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Callback with the found todo
            $.callback(item);
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
            // Create a search string for the todo
            model.search = (model.title + ' ' + model.description + ' ' + model.author + ' ' + model.year).toSearch();
            // Add the new todo to the array
            Todos.push(model);
            // Callback with the ID of the inserted todo
            $.done(model.id)();
        }
    });

    // Action for updating a todo
    schema.action('update', {
        name: 'Update todo',
        params: '*id:String',
        input: '*title:String',
        action: function($, model) {
            var item = Todos.findItem('id', $.params.id);
            if (!item) {
                // If the todo is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Update the todo with the new data
            model.dtupdated = NOW;
            model.search = (model.title).toSearch();
            for (var el in model) 
                item[el] = model[el];
            // Callback with the ID of the updated todo
            $.done(model.id)();
        }
    });

    // Action for removing a todo
    schema.action('remove', {
        name: 'Remove todo',
        params: '*id:String',
        action: function($) {
            var params = $.params;
            // Find the index of the todo in the array
            var index = Todos.findIndex('id', params.id);
            console.log(index);
            if (index === -1) {
                // If the todo is not found, return a 404 error
                $.invalid(404);
                return;
            }
            // Remove the todo from the array
            Todos.remove(item => item.id == index);
            // Callback to indicate successful removal
            $.done()();
        } 
    });

    // Action for removing all todos
    schema.action('wipe', {
        name: 'Remove all todos',
        action: function($) {
            Todos = [];
            // Callback to indicate successful removal
            $.done()();
        } 
    });
});
