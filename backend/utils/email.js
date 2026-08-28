const nodemailer = require('nodemailer');

// Create mail transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send email function
const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to,
            subject,
            html,
            text,
            attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✉️ Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        throw error;
    }
};

// Send bulk email
const sendBulkEmail = async (recipients, subject, html) => {
    const results = [];
    
    for (const email of recipients) {
        try {
            const result = await sendEmail({ to: email, subject, html });
            results.push({ email, success: true });
        } catch (error) {
            results.push({ email, success: false, error: error.message });
        }
    }
    
    return results;
};

// Verify SMTP connection
const verifyConnection = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email service verified');
        return true;
    } catch (error) {
        console.error('❌ Email service verification failed:', error);
        return false;
    }
};

module.exports = {
    sendEmail,
    sendBulkEmail,
    verifyConnection
};
