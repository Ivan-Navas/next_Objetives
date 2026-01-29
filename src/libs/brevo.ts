import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

const smtpEmail = new brevo.SendSmtpEmail();

interface Params {
  code: number;
  to: { email: string; name: string }[];
}

export async function sendEmail({ code, to }: Params) {
  smtpEmail.subject = "Codigo de verificación";
  smtpEmail.to = to;
  smtpEmail.htmlContent = `<html>
    <body style="background:#2F2F2F; padding:10px">
      <div style="width:100%; display:flex; align-items:center; justify-items:center;">
        <div>  
          <img
            style="width:68px; height:68px;"
            alt="LogoImage" 
            src="https://res.cloudinary.com/ivannavas/image/upload/v1765838347/Oinc/iconos/Rectangle_45_zfu9mr.png"
          />
          <p style="font-size:20px; color:#BADE00; text-align:center;">Oinc</p>
        </div>
      </div>
      <p style="font-family:sans-serif; color:#FFFFFF; font-size:12px; font-weight:bold;">Hola ${to[0].name}:</p>
      <p style="font-family:sans-serif; color:#FFFFFF; font-size:12px; font-weight:bold;">Este es tu código para verificar tu correo.</p>
      <div style="height:66px; background:#1F1F1F; border-radius:16px;">
        <h1 style="font-family: sans-serif; color:#BADE00; font-size:40px; font-weight:bold; text-align:center;">${code}</h1>
      </div>
      <p style="font-family:sans-serif; color:#FFFFFF; font-size:12px; font-weight:bold;">¿No fuiste tu? simplemente puedes ignorar este mensaje.</p>
      <p style="font-family:sans-serif; color:#FF0000; font-size:35px; font-weight:bold;">¡Recuerda, no compartas este código!</p>
    </body>
  </html>`;
  smtpEmail.sender = { email: "ivanrng1502@gmail.com", name: "Ivan Navas" };
  await apiInstance.sendTransacEmail(smtpEmail);
}

export async function recoverPasswordEmail({ to, code }: Params) {
  smtpEmail.subject = "Recuperacion de contraseña";
  smtpEmail.to = to;
  smtpEmail.htmlContent = `<html>
    <body style="background:#2F2F2F; padding:10px">
      <div style="width:100%; display:flex; align-items:center; justify-items:center;">
        <div>  
          <img
            style="width:68px; height:68px;"
            alt="LogoImage" 
            src="https://res.cloudinary.com/ivannavas/image/upload/v1765838347/Oinc/iconos/Rectangle_45_zfu9mr.png"
          />
          <p style="font-size:20px; color:#BADE00; text-align:center;">Oinc</p>
        </div>
      </div>
      <p style="font-family:sans-serif; color:#FFFFFF; font-size:12px; font-weight:bold;">Este es tu código para recuperar tu contraseña.</p>
      <div style="height:66px; background:#1F1F1F; border-radius:16px;">
        <h1 style="font-family: sans-serif; color:#BADE00; font-size:40px; font-weight:bold; text-align:center;">${code}</h1>
      </div>
      <p style="font-family:sans-serif; color:#FFFFFF; font-size:12px; font-weight:bold;">¿No fuiste tu? simplemente puedes ignorar este mensaje.</p>
      <p style="font-family:sans-serif; color:#FF0000; font-size:35px; font-weight:bold;">¡Recuerda, no compartas este código!</p>
    </body>
  </html>`;
  smtpEmail.sender = { email: "ivanrng1502@gmail.com", name: "Ivan Navas" };
  await apiInstance.sendTransacEmail(smtpEmail);
}
