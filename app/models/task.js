//app/models/task.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
    text : String,
    done : Boolean
});