
const Event = require('../models/Event');
const Participant = require('../models/Participant');
const PDFGenerator = require('../utils/pdfGenerator');
exports.createEvent = async (req, res) => {
    const { name, description, sessions } = req.body;

    try {
        const event = new Event({
            name,
            description,
            sessions,
            createdBy: req.user._id
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getEventById = async (req, res) => {
    try {
        console.log('Fetching event with ID:', req.params.id);  // Debug log
        const event = await Event.findById(req.params.id)
            .populate({
                path: 'sessions.participants',
                model: 'Participant'
            })
            .populate('createdBy', 'name email');

        if (!event) {
            console.log('Event not found');  // Debug log
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.getEventReport = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id).populate('sessions.participants');
//         if (!event) return res.status(404).json({ message: 'Event not found' });

//         // Generate and stream the PDF to the client
//         PDFGenerator(event, res);
        
//     } catch (error) {
//         console.error('Error generating report:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
exports.getEventReport = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('sessions.participants');
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const pdfDoc = PDFGenerator(event);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${event.name}_report.pdf"`);

        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        console.error('Error generating report:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// controllers/eventController.js

// eventController.js


// eventController.js

//const Event = require('../models/Event');
//const Participant = require('../models/Participant');

// exports.deleteEvent = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);

//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         // Delete participants associated with each session
//         for (let session of event.sessions) {
//             await Participant.deleteMany({ _id: { $in: session.participants } });
//         }

//         // Delete the event
//         await event.remove();

//         res.status(200).json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// exports.deleteEvent = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);

//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         // Remove all participants associated with each session
//         for (const session of event.sessions) {
//             await Participant.deleteMany({ _id: { $in: session.participants } });
//         }

//         // Remove the event
//         await event.remove();

//         res.status(200).json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Remove all participants associated with each session
        for (const session of event.sessions) {
            await Participant.deleteMany({ _id: { $in: session.participants } });
        }

        // Use findByIdAndDelete instead of event.remove
        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.updateEvent = async (req, res) => {
    try {
        const { name, description, sessions } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.name = name || event.name;
        event.description = description || event.description;

        // Update sessions
        event.sessions = sessions || event.sessions;

        const updatedEvent = await event.save();

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// [nodemon] restarting due to changes...
// [nodemon] starting `node index.js`
// (node:5372) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
// (Use `node --trace-warnings ...` to show where the warning was created)
// (node:5372) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
// Server running on port 5000
// MongoDB connected successfully
// Error deleting event: event.remove is not a function
// Error deleting event: event.remove is not a function
// Error deleting event: event.remove is not a function

