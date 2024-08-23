// const mongoose = require('mongoose');

// const sessionSchema = new mongoose.Schema({
//     title: String,
//     startTime: Date,
//     endTime: Date,
//     participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
// });

// const eventSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: String,
//     sessions: [sessionSchema],
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     createdAt: { type: Date, default: Date.now }
// });

// const Event = mongoose.model('Event', eventSchema);
// module.exports = Event;
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    title: String,
    startTime: Date,
    endTime: Date,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
});

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    sessions: [sessionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
