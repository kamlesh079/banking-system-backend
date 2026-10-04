const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegisterationEmail(userEmail, name) {
  const sub = "Welcome to Backend Ledger";

  const text = `Hello ${name},

                Welcome to Backend Ledger.

                Your account has been successfully created. We're pleased to have you with us and look forward to providing you with a secure and reliable experience.

                You can now sign in to your account and start using Backend Ledger.

                If you did not create this account, please disregard this email.

                Best regards,
                The Backend Ledger Team`;
  const html = `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Backend Ledger</title>
        </head>

        <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f6f8;
        font-family: Arial, Helvetica, sans-serif;
        ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
        ">

            <!-- Header -->
            <div style="
            background-color: #111827;
            padding: 28px 35px;
            text-align: center;
            ">
            <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
                font-weight: 600;
            ">
                Backend Ledger
            </h1>

            <p style="
                margin: 8px 0 0;
                color: #d1d5db;
                font-size: 13px;
            ">
                Secure Financial Management
            </p>
            </div>

            <!-- Main Content -->
            <div style="
            padding: 40px 35px;
            ">

            <h2 style="
                margin: 0 0 20px;
                color: #111827;
                font-size: 22px;
                font-weight: 600;
            ">
                Welcome, ${name}
            </h2>

            <p style="
                margin: 0 0 18px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.7;
            ">
                Your Backend Ledger account has been successfully created.
                We're pleased to have you with us.
            </p>

            <p style="
                margin: 0 0 25px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.7;
            ">
                You can now sign in to your account and start using
                Backend Ledger to manage your financial activities.
            </p>

            <!-- Action Button -->
            <div style="
                text-align: center;
                margin: 30px 0;
            ">
                <a href="http://localhost:5173"
                style="
                    display: inline-block;
                    padding: 12px 28px;
                    background-color: #111827;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                ">
                Access Backend Ledger
                </a>
            </div>

            <p style="
                margin: 25px 0 0;
                color: #6b7280;
                font-size: 13px;
                line-height: 1.6;
            ">
                If you did not create this account, you can safely
                disregard this email.
            </p>

            </div>

            <!-- Footer -->
            <div style="
            padding: 20px 35px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            ">

            <p style="
                margin: 0;
                color: #9ca3af;
                font-size: 12px;
            ">
                © 2026 Backend Ledger. All rights reserved.
            </p>

            <p style="
                margin: 6px 0 0;
                color: #9ca3af;
                font-size: 12px;
            ">
                This is an automated email. Please do not reply.
            </p>

            </div>

        </div>

        </body>
        </html>`;

  await sendEmail(userEmail, sub, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const sub = "Transaction Notification";
  const text = `Hello ${name},

                A transaction of ${amount} has been successfully made to account ${toAccount}.

                If you did not authorize this transaction, please contact our support team immediately.

                Best regards,
                The Backend Ledger Team`;

  const html = `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Transaction Notification</title>
                    </head>

                    <body style="
                        margin: 0;
                        padding: 0;
                        background-color: #f5f6f8;
                        font-family: Arial, Helvetica, sans-serif;
                        ">

                        <div style="
                            max-width: 600px;
                            margin: 40px auto;
                            background-color: #ffffff;
                            border: 1px solid #e5e7eb;
                            border-radius: 10px;
                            overflow: hidden;
                        ">

                            <!-- Header -->
                            <div style="
                            background-color: #111827;
                            padding: 28px 35px;
                            text-align: center;
                            ">
                            <h1 style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 24px;
                                font-weight: 600;
                            ">
                                Backend Ledger
                            </h1>

                            <p style="
                                margin: 8px 0 0;
                                color: #d1d5db;
                                font-size: 13px;
                            ">
                                Secure Financial Management
                            </p>
                            </div>

                            <!-- Main Content -->
                            <div style="
                            padding: 40px 35px;
                            ">

                            <h2 style="
                                margin: 0 0 20px;
                                color: #111827;
                                font-size: 22px;
                                font-weight: 600;
                            ">
                                Transaction Notification
                            </h2>

                            <p style="
                                margin: 0 0 18px;
                                color: #4b5563;
                                font-size: 15px;
                                line-height: 1.7;
                            ">
                                Hello ${name},
                            </p>

                            <p style="
                                margin: 0 0 18px;
                                color: #4b5563;
                                font-size: 15px;
                                line-height: 1.7;
                            ">
                                A transaction of <strong>${amount}</strong> has been successfully made to account <strong>${toAccount}</strong>.
                            </p>

                            <p style="
                                margin: 0 0 25px;
                                color: #4b5563;             
                                font-size: 15px;
                                line-height: 1.7;
                            ">
                                If you did not authorize this transaction, please contact our support team immediately.
                            </p>

                        </div>

                    </body>
                </html>`;

  await sendEmail(userEmail, sub, text, html);
}

async function failedTransactionEmail(userEmail, name, amount, toAccount) {
  const sub = "Transaction Failed Notification";
  const text = `Hello ${name},

                A transaction of ${amount} to account ${toAccount} has failed.

                Please check your account balance and try again.

                Best regards,
                The Backend Ledger Team`;

  const html = `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transaction Failed Notification</title>
        </head>

        <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f6f8;
        font-family: Arial, Helvetica, sans-serif;
        ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
        ">

            <!-- Header -->
            <div style="
            background-color: #111827;
            padding: 28px 35px;
            text-align: center;
            ">
            <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
                font-weight: 600;
            ">
                Backend Ledger
            </h1>

            <p style="
                margin: 8px 0 0;
                color: #d1d5db;
                font-size: 13px;
            ">
                Secure Financial Management
            </p>
            </div>

            <!-- Main Content -->
            <div style="
            padding: 40px 35px;
            ">

            <h2 style="
                margin: 0 0 20px;
                color: #111827;
                font-size: 22px;
                font-weight: 600;
            ">
                Transaction Failed Notification
            </h2>

            <p style="
                margin: 0 0 18px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.7;
            ">
                Hello ${name},
            </p>

            <p style="
                margin: 0 0 18px;
                color: #4b5563;
                font-size: 15px;
                line-height: 1.7;
            ">
                A transaction of <strong>${amount}</strong> to account <strong>${toAccount}</strong> has failed.
            </p>

            <p style="
                margin: 0 0 25px;
                color: #4b5563; 
                font-size: 15px;
                line-height: 1.7;
            ">
                Please check your account balance and try again.
            </p>

        </div>
        </body>
        </html>`;

  await sendEmail(userEmail, sub, text, html);
}

module.exports = {
  sendRegisterationEmail,
  sendTransactionEmail,
  failedTransactionEmail,
};
