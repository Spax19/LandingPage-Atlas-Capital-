const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// POST route to handle sending the postcard
app.post('/send-postcard', (req, res) => {
    const { name, message, email, regards, senderName } = req.body;

    // Create the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use the email service (Gmail in this case)
        auth: {
            user: 'Kmotsepe807@gmail.com', // Your Gmail
            pass: 'bdz pebs njux hhuo'   // Your Gmail password or app-specific password
        }
    });

    // HTML email template
    const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f8ff;
                        color: #333;
                    }
                    .card {
                        width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .card h1 {
                        color: #2f8b50;
                    }
                    .card img {
                        width: 100%;
                        max-width: 400px;
                        height: auto;
                        border-radius: 10px;
                    }
                    .card p {
                        font-size: 18px;
                        margin: 20px 0;
                    }
                    .card .regards {
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .card .sender {
                        font-style: italic;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Hello ${name}!</h1>
                    <img src=https://th.bing.com/th/id/OIP.5uqpnqxgRsgISESs_5z9rwE8DF?rs=1&pid=ImgDetMain" alt="Postcard Image" />
                    <p>${message}</p>
                    <p class="regards">Regards, ${regards}</p>
                    <p class="sender">- From, ${senderName}</p>
                </div>
            </body>
        </html>
    `;

    // Email options
    const mailOptions = {
        from: 'Kmotsepe807@gmail.com',
        to: email,
        subject: 'Merry Christmas Postcard!',
        html: htmlContent
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending postcard', error });
        }
        res.status(200).json({ message: 'Postcard sent successfully!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
