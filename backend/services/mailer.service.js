const nodemailer = require("nodemailer");
const { config } = require("../config/default.config");
const { ErrorHandler } = require("../lib/errorhandler.lib");
const axios = require("axios");
exports.mailer = async (payload) => {
  try {
    return await sendMail(payload);
  } catch (error) {
    console.log(error)
    await ErrorHandler(error);
  }
};

async function sendMail(payload) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: config.nodemailer.host,
    port: Number(config.nodemailer.port),
    secure: config.nodemailer.secure,
    service: "outlook",
    auth: {
      user: config.nodemailer.user || testAccount.user,
      pass: config.nodemailer.password || testAccount.pass,
    },
  });

  const mailOptions = {
    from: `${payload.senderName} <${config.nodemailer.user}>`,
    to: `${payload.receiverName} <${payload.receiverEmail}>`,
    subject: `${payload.subject}`,
    text: `${payload.message}`,
    html: `<div>${payload.message}</div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
}
exports.SendPdf = async (Ticket) => {
  const payload = {
    senderName: "Holiday - Tickets",
    senderEmail: "mahmoudalmazoon@outlook.com",
    receiverName: Ticket.name,
    receiverEmail: Ticket.email,
    subject: "Ticket",
    message: Ticket.TourName,
  };
  try {
    await sendMailPdf(payload, Ticket);
  } catch (error) {
    await ErrorHandler(error);
  }
};
async function sendMailPdf(payload, Ticket) {
  const url = await pdfService.generatePdfTicket(Ticket);
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: config.nodemailer.host,
    port: Number(config.nodemailer.port),
    secure: config.nodemailer.secure,
    service: "outlook",
    auth: {
      user: config.nodemailer.user || testAccount.user,
      pass: config.nodemailer.password || testAccount.pass,
    },
  });
  const mailOptions = {
    from: `${payload.senderName} <${payload.senderEmail}>`,
    to: `${payload.receiverName} <${payload.receiverEmail}>`,
    subject: `${payload.subject}`,
    text: `${payload.message}`,
    html: `<div>${payload.message}</div>`,
    attachments: [
      {
        filename: "document.pdf",
        path: `tickets/${Ticket.ticketNumber}.pdf`, //url path in cloudstorage
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    await ErrorHandler(error);
  }
}

async function fetchImage(src) {
  const image = await axios.get(src, {
    responseType: "arraybuffer",
  });
  return image.data;
}
const gen = async () => {
  QRCode.toFile(
    "qrcode.png",
    "https://www.google.com/search?client=firefox-b-d&q=image#imgrc=YmDohMp4T5AODM",
    { width: 200 },
    (err) => {
      if (err) throw err;

      // Define the HTML content for the PDF file
      const htmlContent = `
      <div style="display:flex; align-items:flex-start;">
      <img src="http://uat.ruzinn.com/api/park/v1/image/1615" alt="image" style="width:200px; height:200px;" />
      <div style="width:100%; display:flex; align-items:center; justify-content:center; flex-direction:column;">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&amp;data=Example" alt="QR Code" style="width:100px; height:100px;" />
        <div style="width:100%; padding:10px; border:1px solid black; border-radius:20px;">
          <h4 style="text-align:center;">THIS IS YOUR E-TICKET</h4>
          <p style="text-align:center;">This ticket is non-refundable and void if altered</p>
        </div>
      </div>
    </div>
    `;
      // Define options for the PDF file
      const options = { format: "Letter" };

      // Generate the PDF file from the HTML content
      pdf.create(htmlContent, options).toFile("./example.pdf", (err, res) => {
        if (err) throw err;
      });
    }
  );
};
