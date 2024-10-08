import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS
  }
});

async function sendEmail(user) {
  const { nombre_usuario, correo, token } = user;

  const dateDay = new Date().getDay();
  const dateYear = new Date().getFullYear();
  const dateMonth = new Date().getMonth();
  const dateHour = new Date().getHours();
  const dateMinutes = new Date().getMinutes();

  const timeSet = dateHour <= 12 ? "a.m" : "p.m"
  const info = await transport.sendMail({
    from: '"InvenTrack enterprise 🚀" <noreply@inventrack.com>',
    to: correo,
    subject: "¡Bienvenido a InvenTrack! 👑",
    text: `Hola, ${nombre_usuario}, gracias por registrarte.`,
    html: /*HTML*/`
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h1 style="color: #4CAF50;">Hola, ${nombre_usuario} 👋</h1>
          <p>Gracias por registrarte en nuestra plataforma <strong>InvenTrack</strong>.</p>
          <div style="display:flex; justify-content:start; align-items:center; gap:1.5rem;">
            <p>Fecha de registro: <strong>${dateDay}/${dateMonth}/${dateYear}</strong></p>
            <p>Hora: <strong>${dateHour}:${dateMinutes.toString().length === 1 ? `0${dateMinutes}` : dateMinutes} ${timeSet}</strong> </p>
          </div>
          <p>Si tienes alguna duda, no dudes en contactarnos.</p>
          <p>
            <a href="${process.env.FRONT_URL}/confirmation/${token}"
               style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
              Confirmar tu cuenta
            </a>
          </p>
          <p style="margin-top: 20px;">¡Saludos!<br><strong>InvenTrack Team</strong></p>
        </div>
      `
  });
}

export default sendEmail