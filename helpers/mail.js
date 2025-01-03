const nodemailer = require('nodemailer');


async function sendEmail(receiverEmail, subject, username, password, html) {
    try {
        // SMTP ayarlarını yapılandır
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "temizlikpro00@gmail.com",
                pass: "govr xyna emug izqm",
            },
        });


        // E-posta seçeneklerini oluştur
        // E-posta seçeneklerini oluştur
        const mailOptions = {
            from: 'temizlikpro00@gmail.com', // Gönderen adresi
            to: receiverEmail, // Alıcı adresi
            subject: "CleanPRO 🧹 🧹 ", // E-posta konusu
            text: "Hoşgeldiniz", // Düz metin gövdesi
            html: !html ? `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kullanıcı Bilgileri</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                    <td style="padding: 20px 0; text-align: center; background-color: #f0f0f0;">
                        <h1 style="margin: 0;">CleanPRO 🧹 </h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px 0;">
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                <td style="padding: 0 20px;">
                                    <p style="margin: 0;">Merhaba,</p>
                                    <p style="margin: 10px 0;">İşte hesabınıza ait kullanıcı adı ve şifre:</p>
                                    <p style="margin: 10px 0;"><strong>Kullanıcı Adı:</strong> ${username}</p>
                                    <p style="margin: 10px 0;"><strong>Şifre:</strong> ${password}</p>
                                    <p style="margin: 10px 0;">Giriş yapmak için lütfen kullanıcı adı ve şifreyi kullanın.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px 0; text-align: center; background-color: #f0f0f0;">
                        <p style="margin: 0;">Bu e-posta otomatik olarak gönderilmiştir. Yanıt alamazsınız.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    ` : html
        };


        // E-postayı gönder ve sonucu bekleyin
        const info = await transporter.sendMail(mailOptions);
        console.log('E-posta başarıyla gönderildi:', info.response);
        return true;
    } catch (error) {
        console.error('E-posta gönderirken hata oluştu:', error);
        return false;
    }
}

async function generateRandomPassword() {
    const length = 6;
    let password = '';
    for (let i = 0; i < length; i++) {
        password += Math.floor(Math.random() * 10); // 0'dan 9'a kadar rastgele bir rakam ekle
    }
    return password;
}


module.exports = { sendEmail, generateRandomPassword };