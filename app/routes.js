// app/routes.js

// load the task model
var Task = require('./models/task');

// expose the routes to our app with module.exports
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all tasks
    app.get('/api/tasks', function (req, res) {

        // use mongoose to get all tasks in the database
        Task.find(function (err, tasks) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tasks); // return all tasks in JSON format
        });
    });

    // create task and send back all tasks after creation
    app.post('/api/tasks', function (req, res) {

        // create a Task, information comes from AJAX request from Angular
        Task.create({
            text: req.body.text,
            done: false
        }, function (err, task) {
            if (err)
                res.send(err);

            // get and return all the tasks after you create another
            Task.find(function (err, tasks) {
                if (err)
                    res.send(err)
                res.json(tasks);
            });
        });

    });

    // delete a task and send back all tasks
    app.delete('/api/tasks/:task_id', function (req, res) {
        Task.remove({
            _id: req.params.task_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the tasks after the delete operation to make sure that the task got deleted
            Task.find(function (err, tasks) {
                if (err)
                    res.send(err)
                res.json(tasks);
            });
        });
    });
};