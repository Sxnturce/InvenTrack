import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8d03b57e1a3a9e",
    pass: "6d7bf4a34a98f0"
  }
});

const sendPasswordResetEmail = async ({ correo, nombre_usuario: nombre, token_pass: token }) => {
  try {
    const mailOptions = {
      from: `"Soporte" <noreply@inventrack.com>`,
      to: correo,
      subject: 'Código de recuperación de contraseña 🛑',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #9b2327; font-size: 30px;font-weight:900">Código de Recuperación</h2>
          <p style="color: #333; font-size: 16px;">Hola <strong>${nombre}</strong>,</p>
          <p style="color: #555; font-size: 15px; line-height: 1.5;">
            Recibimos una solicitud para restablecer tu contraseña. Si fuiste tú quien solicitó este cambio, usa el siguiente código para continuar con el proceso:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="display: inline-block; padding:15px 20px; background-color: #bbffbf; border: 2px solid #68dd7a; border-radius: 8px; font-size: 22px; font-weight: bold; color: #2f2b2b;">
              ${token}
            </p>
          </div>
          
          <p style="color: #555; font-size: 15px; line-height: 1.5;">
            Si no solicitaste cambiar tu contraseña, por favor ignora este correo. Tu contraseña actual seguirá siendo segura.
          </p>
          
          <p style="color: #888; font-size: 14px;">Atentamente,<br>El equipo de soporte</p>
          
          <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
            <p style="margin: 0;">Inventrack © 2024</p>
            <p style="margin: 0;">Todos los derechos reservados</p>
          </footer>
        </div>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendPasswordResetEmail 