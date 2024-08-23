const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' }
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;