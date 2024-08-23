// const PDFDocument = require('pdfkit');

// const PDFGenerator = (event) => {
//     const doc = new PDFDocument();
//     doc.text(`Event: ${event.name}`);
//     event.sessions.forEach((session) => {
//         doc.text(`Session: ${session.title}`);
//         session.participants.forEach((participant) => {
//             doc.text(`Participant: ${participant.name} (${participant.email})`);
//         });
//     });
//     return doc;
// };

// module.exports = PDFGenerator;
// utils/pdfGenerator.js
// const PDFDocument = require('pdfkit');

// const generatePDF = (event) => {
//     const doc = new PDFDocument();

//     doc.fontSize(20).text(`Event: ${event.name}`, { underline: true });
//     doc.text(`Description: ${event.description}`);
//     doc.text('Sessions:', { underline: true });

//     event.sessions.forEach((session, index) => {
//         doc.fontSize(16).text(`${index + 1}. ${session.title}`);
//         doc.text(`Start Time: ${new Date(session.startTime).toLocaleString()}`);
//         doc.text(`End Time: ${new Date(session.endTime).toLocaleString()}`);
//         doc.text('Participants:', { underline: true });

//         if (session.participants.length > 0) {
//             session.participants.forEach((participant, pIndex) => {
//                 doc.fontSize(12).text(`${pIndex + 1}. ${participant.name} (${participant.email})`);
//             });
//         } else {
//             doc.fontSize(12).text('No participants registered.');
//         }

//         doc.moveDown();
//     });

//     doc.end();
//     return doc;
// };

// module.exports = generatePDF;

// const PDFDocument = require('pdfkit');

// function PDFGenerator(event) {
//     const doc = new PDFDocument();

//     let buffers = [];
//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => {
//         let pdfData = Buffer.concat(buffers);
//         return pdfData;
//     });

//     // Add event details to the PDF
//     doc.fontSize(25).text(event.name, { align: 'center' });
//     doc.fontSize(18).text(event.description, { align: 'left' });
//     doc.text('Sessions:', { align: 'left' });

//     event.sessions.forEach(session => {
//         doc.fontSize(14).text(`- ${session.title}`);
//         doc.text(`  Start: ${new Date(session.startTime).toLocaleString()}`);
//         doc.text(`  End: ${new Date(session.endTime).toLocaleString()}`);
//     });

//     doc.end();
// }

// module.exports = PDFGenerator;
// utils/pdfGenerator.js
// const PDFDocument = require('pdfkit');

// function PDFGenerator(event) {
//     const doc = new PDFDocument();

//     let buffers = [];
//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => {
//         let pdfData = Buffer.concat(buffers);
//         return pdfData;
//     });

//     // Add event details to the PDF
//     doc.fontSize(25).text(event.name, { align: 'center' });
//     doc.fontSize(18).text(event.description, { align: 'left' });
//     doc.text('Sessions:', { align: 'left' });

//     event.sessions.forEach(session => {
//         doc.fontSize(14).text(`- ${session.title}`);
//         doc.text(`  Start: ${new Date(session.startTime).toLocaleString()}`);
//         doc.text(`  End: ${new Date(session.endTime).toLocaleString()}`);
//     });

//     doc.end();
// }

// module.exports = PDFGenerator;
// console.log(`Generating PDF for event: ${event.name}`);
// doc.fontSize(20).text(`Event: ${event.name}`, { underline: true });
// console.log('Added event title to PDF');

// doc.text(`Description: ${event.description}`);
// console.log('Added event description to PDF');

// Continue with other content...

// const PDFDocument = require('pdfkit');
// const generatePDF = (event) => {
//     const doc = new PDFDocument();
//     // Add content to the PDF
//     doc.fontSize(20).text(`Event: ${event.name}`, { underline: true });
//     doc.text(`Description: ${event.description}`);
//     doc.text('Sessions:', { underline: true });

//     event.sessions.forEach((session, index) => {
//         doc.fontSize(16).text(`${index + 1}. ${session.title}`);
//         doc.text(`Start Time: ${new Date(session.startTime).toLocaleString()}`);
//         doc.text(`End Time: ${new Date(session.endTime).toLocaleString()}`);
//         doc.text('Participants:', { underline: true });

//         if (session.participants.length > 0) {
//             session.participants.forEach((participant, pIndex) => {
//                 doc.fontSize(12).text(`${pIndex + 1}. ${participant.name} (${participant.email})`);
//             });
//         } else {
//             doc.fontSize(12).text('No participants registered.');
//         }

//         doc.moveDown();
//     });

//     return doc;
// };

// module.exports = generatePDF;
const PDFDocument = require('pdfkit');

function PDFGenerator(event, res) {
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${event.name}_report.pdf"`);

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add event details to the PDF
    doc.fontSize(25).text(event.name, { align: 'center' });
    doc.fontSize(18).text(event.description, { align: 'left' });
    doc.text('Sessions:', { align: 'left' });

    event.sessions.forEach(session => {
        doc.fontSize(14).text(`- ${session.title}`);
        doc.text(`  Start: ${new Date(session.startTime).toLocaleString()}`);
        doc.text(`  End: ${new Date(session.endTime).toLocaleString()}`);
    });

    // Finalize the PDF and end the stream
    doc.end();
}

module.exports = PDFGenerator;
