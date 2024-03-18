// /controllers/api.js
exports.install = function() {
    // Standard **RESTful** routing
    ROUTE('GET      /api/todos/         *Todos --> query');   // Query all todos
    ROUTE('POST     /api/todos/         *Todos --> insert');  // Insert a new todo (+ expects payload data, validated in schema)
    
    ROUTE('GET      /api/todos/{id}/    *Todos --> read');    // Read a specific todo by ID
    ROUTE('PUT      /api/todos/{id}/    *Todos --> update');  // Update a specific todo by ID (+ expects payload data, validated in schema)
    ROUTE('DELETE   /api/todos/{id}/    *Todos --> remove');  // Remove a specific todo by ID (- does not expect payload data)

    ROUTE('POST     /api/todos_wipe/    *Todos --> wipe');    // **API**: Remove all todos (- does not expect payload data)

    // **API** routing using different conventions

    // Using hyphen notation for **API** endpoint names
    ROUTE('API /api/ -todos             *Todos --> query');   // **API**: Query all todos (- does not expect payload data)
    ROUTE('API /api/ -todos_read/{id}   *Todos --> read');    // **API**: Read a specific todo by ID (- does not expect payload data)
    ROUTE('API /api/ +todos_insert      *Todos --> insert');  // **API**: Insert a new todo (+ expects payload data, validated in schema)
    ROUTE('API /api/ +todos_update/{id} *Todos --> update');  // **API**: Update a specific todo by ID (+ expects payload data, validated in schema)
    ROUTE('API /api/ -todos_remove/{id} *Todos --> remove');  // **API**: Remove a specific todo by ID (- does not expect payload data)

    // **API** routing for websockets using at notation
    ROUTE('API @api -todos              *Todos --> query');   // **API Websocket**: Query all todos (- does not expect payload data)
    ROUTE('API @api -todos_read/{id}    *Todos --> read');    // **API Websocket**: Read a specific todo by ID (- does not expect payload data)
    ROUTE('API @api +todos_insert       *Todos --> insert');  // **API Websocket**: Insert a new todo (+ expects payload data, validated in schema)
    ROUTE('API @api +todos_update/{id}  *Todos --> update');  // **API Websocket**: Update a specific todo by ID (+ expects payload data, validated in schema)
    ROUTE('API @api -todos_remove/{id}  *Todos --> remove');  // **API Websocket**: Remove a specific todo by ID (- does not expect payload data)

    // // For WEBSOCKET Routing
    // ROUTE('SOCKET /api/ @api', 1024 * 5);                     // Handle websockets on the '/api/' path using at notation
}
