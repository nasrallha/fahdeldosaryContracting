const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🛠️ إعداد الـ Transporter الخاص باستضافة موقعك fmdcon.com مباشرة
const transporter = nodemailer.createTransport({
  host: 'mail.fmdcon.com', // ده الهوست ثابت هنا خلاص
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,     // هيقرا sales@fmdcon.com من الـ .env
    pass: process.env.AUTH_PASSWORD  // هيقرا الباسورد من الـ .env
  }
});

// الـ API الخاص باستقبال بيانات الفورم من الـ React
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message } = req.body;

  // 📬 تجهيز محتوى الإيميل
  const mailOptions = {
    from: process.env.AUTH_USER, // الإيميل الراسل (لازم يكون نفس إيميل الـ auth فوق)
    to:process.env.AUTH_USER,   // 👈 الإيميل اللي هيستقبل الرسايل وتفتح الـ Webmail تلاقيها جواه
    subject: `رسالة جديدة من موقعك: ${name}`,
    html: `
      <div style="direction: rtl; text-align: right; font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h3 style="color: #2c3e50;">تفاصيل طلب الاتصال الجديد:</h3>
        <hr/>
        <table border="0" cellpadding="8" style="direction: rtl; text-align: right; width: 100%;">
          <tr><td style="width: 120px;"><strong>الاسم:</strong></td><td>${name}</td></tr>
          <tr><td><strong>رقم الجوال:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>البريد الإلكتروني:</strong></td><td>${email || 'لم يتم إدخاله'}</td></tr>
        </table>
        <br/>
        <strong>الرسالة:</strong>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-right: 4px solid #34495e; margin-top: 10px;">
          ${message || 'بدون رسالة'}
        </div>
      </div>
    `
  };

  // إرسال البريد الإلكتروني
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Nodemailer Error:', error);
      return res.status(500).json({ success: false, message: 'حدث خطأ أثناء إرسال البريد' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true, message: 'تم إرسال الرسالة بنجاح' });
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));