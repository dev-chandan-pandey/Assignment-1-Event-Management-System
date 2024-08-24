
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

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.remove();
        res.status(200).json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
