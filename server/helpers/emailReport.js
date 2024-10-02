import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS
  }
});

async function sendEmailReport(pedido, product, user) {
  const { cantidad: cant, estado_envio: estado } = pedido;
  const { nombre, estado_stock } = product;
  const { nombre_usuario, correo } = user;

  const dateDay = new Date().getDate();
  const dateYear = new Date().getFullYear();
  const dateMonth = new Date().toLocaleString('default', { month: 'long' });
  const dateHour = new Date().getHours();
  const dateMinutes = new Date().getMinutes();

  const timeSet = dateHour < 12 ? "a.m" : "p.m";
  const adjustedHour = dateHour % 12 || 12;

  const stockColor = estado_stock === 'Bajo' ? '#ed2023'
    : estado_stock === 'Adecuado' ? '#e19b1a'
      : '#42b942';

  const envioColor = estado === 'pendiente' ? '#e19b1a'
    : estado === 'enviado' ? '#1e44cf'
      : '#42b942';

  const info = await transport.sendMail({
    from: '"InvenTrack enterprise 🚀" <noreply@inventrack.com>',
    to: correo,
    subject: "Reporte de Pedido - InvenTrack ☢️",
    text: `Hola ${nombre_usuario}, te enviamos el reporte de tu pedido.`,
    html: /*HTML*/`
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #b91c21; text-align:center; font-weight:900;">Reporte de Pedido ☢️</h1>
        <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
          <span><strong style="font-size:20px">${nombre_usuario}</strong> aquí está el reporte de tu pedido:</span>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f2f2f2; border: 1px solid #ddd;">Nombre de Producto:</th>
              <td style="padding: 12px; border: 1px solid #ddd;text-align:center;">${nombre}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f2f2f2; border: 1px solid #ddd;">Cantidad Solicitada:</th>
              <td style="padding: 12px; border: 1px solid #ddd; text-align:center;">${cant}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f2f2f2; border: 1px solid #ddd;">Estado de Stock:</th>
              <td style="border: 1px solid #ddd;">
              <div style="padding: 8px; color: white; background-color: ${stockColor}; width:max-content; margin:0 auto;  border-radius:5px; min-width:80px; text-align:center;">
              ${estado_stock.charAt(0).toUpperCase() + estado_stock.slice(1)}
            </div>
              </td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f2f2f2; border: 1px solid #ddd;">Estado de Envío:</th>
              <td style="border: 1px solid #ddd;">
                <div style="padding: 8px; color: white; background-color: ${envioColor}; width:max-content; margin:0 auto;  border-radius:5px;  min-width:80px; text-align:center;">
                  ${estado.charAt(0).toUpperCase() + estado.slice(1)}
                </div>
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <p>Fecha de envío: <strong>${dateDay} de ${dateMonth}, ${dateYear}</strong></p>
            <p>Hora de envío: <strong>${adjustedHour}:${dateMinutes.toString().padStart(2, '0')} ${timeSet}</strong></p>
          </div>
        </div>
        <p style="margin-top: 20px;">¡Gracias por confiar en InvenTrack!<br><strong>InvenTrack Team</strong></p>
      </div>
    `
  });
}

export default sendEmailReport