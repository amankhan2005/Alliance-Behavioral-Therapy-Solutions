import { Resend } from "resend";

// =======================
// ✅ LAZY INIT (MAIN FIX)
// =======================
let resend;

const getResend = () => {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("❌ RESEND_API_KEY missing in .env");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

// ✅ ENV CONFIG
const FROM_EMAIL = process.env.EMAIL_FROM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const COMPANY_NAME =
  process.env.COMPANY_NAME || "Alliance Behavioral Therapy Solutions";

// 🎨 Brand (UPDATED 🔥)
const gradient = "linear-gradient(135deg,#1565C0,#00B4D8)";
const primaryColor = "#1565C0";
const lightBg = "#F4F8FF";

// =======================
// 🔥 ADMIN EMAIL
// =======================
export const sendAdminEmail = async ({ name, email, phone, message }) => {
  try {
    const resend = getResend();

    if (!ADMIN_EMAIL) throw new Error("ADMIN_EMAIL not defined");

    if (!name || !email || !message) {
      throw new Error("Missing required fields");
    }

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Inquiry - ${COMPANY_NAME}`,

      html: `
<div style="font-family:Arial,sans-serif;background:${lightBg};padding:30px;">
  <div style="max-width:620px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.08);">

    <div style="background:${gradient};padding:25px;text-align:center;color:#fff;">
      <h2 style="margin:0;font-size:22px;">📩 New Client Inquiry</h2>
      <p style="margin:5px 0 0;font-size:13px;opacity:0.9;">
        ${COMPANY_NAME}
      </p>
    </div>

    <div style="padding:25px;">
      <p style="color:#555;margin-bottom:20px;">
        A new inquiry has been submitted through your website:
      </p>

      <div style="border-radius:12px;overflow:hidden;border:1px solid #E3ECFF;">

        ${[
          ["Name", name],
          ["Email", `<a href="mailto:${email}" style="color:${primaryColor};">${email}</a>`],
          ["Phone", phone || "N/A"],
          ["Message", message],
        ]
          .map(
            ([label, value], i) => `
          <div style="display:flex;padding:12px;background:${
            i % 2 === 0 ? "#fff" : "#F4F8FF"
          };align-items:flex-start;">
            <div style="width:120px;font-weight:600;color:#0A1228;">
              ${label}
            </div>
            <div style="flex:1;color:#374B70;word-break:break-word;">
              ${value}
            </div>
          </div>
        `
          )
          .join("")}

      </div>
    </div>

    <div style="padding:15px;text-align:center;font-size:12px;color:#6B7FAF;background:#EEF4FF;">
      © ${new Date().getFullYear()} ${COMPANY_NAME} <br/>
      Empowering Every Step 💙
    </div>

  </div>
</div>
`,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("❌ Admin Email Error:", error.message);
    return { success: false, error: error.message };
  }
};

// =======================
// 🔥 USER AUTO REPLY
// =======================
export const sendUserEmail = async ({ name, email }) => {
  try {
    const resend = getResend();

    if (!name || !email) {
      throw new Error("Missing required fields");
    }

    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `We’ve Received Your Request - ${COMPANY_NAME}`,

      html: `
<div style="font-family:Arial,sans-serif;background:${lightBg};padding:30px;">
  <div style="max-width:620px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.08);">

    <div style="background:${gradient};padding:30px;text-align:center;color:#fff;">
      <h2 style="margin:0;font-size:24px;">${COMPANY_NAME}</h2>
      <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
        Care • Support • Growth
      </p>
    </div>

    <div style="padding:28px;">
      <h3 style="margin-top:0;color:#0A1228;">Hello ${name}, 👋</h3>

      <p style="color:#374B70;line-height:1.6;">
        Thank you for reaching out to <strong>${COMPANY_NAME}</strong>.
        We’ve received your message and our team will connect with you shortly.
      </p>

      <p style="color:#374B70;line-height:1.6;">
        ⏱ Expected response time: <strong>within 24 hours</strong>
      </p>

      <div style="margin:30px 0;text-align:center;">
        <a href="mailto:${ADMIN_EMAIL}"
           style="background:${primaryColor};color:#fff;padding:14px 22px;border-radius:999px;text-decoration:none;font-weight:bold;">
          Contact Support →
        </a>
      </div>

      <p style="font-size:13px;color:#7A95BE;text-align:center;">
        If your request is urgent, feel free to reply directly to this email.
      </p>
    </div>

    <div style="padding:18px;text-align:center;font-size:12px;color:#6B7FAF;background:#EEF4FF;">
      © ${new Date().getFullYear()} ${COMPANY_NAME}<br/>
      You’re in safe hands 💙
    </div>

  </div>
</div>
`,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("❌ User Email Error:", error.message);
    return { success: false, error: error.message };
  }
};