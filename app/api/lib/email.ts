import nodemailer from "nodemailer";
import { env } from "./env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }
  return transporter;
}

export async function sendBookingConfirmation(params: {
  to: string;
  clientName: string;
  serviceName: string;
  bookingDateTime: string;
  timezone: string;
  duration: number;
  businessName: string;
}) {
  const { to, clientName, serviceName, bookingDateTime, timezone, duration, businessName } =
    params;

  const subject = `Booking Confirmed - ${serviceName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #3b82f6;">Booking Confirmed</h2>
      <p>Hi ${clientName},</p>
      <p>Your booking with <strong>${businessName}</strong> has been confirmed.</p>
      
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Details</h3>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date & Time:</strong> ${bookingDateTime}</p>
        <p><strong>Timezone:</strong> ${timezone}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>
      </div>
      
      <p>A calendar invitation has been sent to your email.</p>
      <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
      
      <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
        ${businessName}<br/>
        <a href="https://seeingtheeasyway.com">seeingtheeasyway.com</a>
      </p>
    </div>
  `;

  const text = `Hi ${clientName},\n\nYour booking with ${businessName} has been confirmed.\n\nService: ${serviceName}\nDate & Time: ${bookingDateTime}\nTimezone: ${timezone}\nDuration: ${duration} minutes\n\nA calendar invitation has been sent to your email.`;

  try {
    await getTransporter().sendMail({
      from: `"${businessName}" <${env.smtpFrom}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: String(error) };
  }
}

export async function sendNotificationToBusiness(params: {
  businessEmail: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  bookingDateTime: string;
  businessTimezone: string;
  duration: number;
  businessName: string;
  notes?: string;
}) {
  const {
    businessEmail,
    clientName,
    clientEmail,
    serviceName,
    bookingDateTime,
    businessTimezone,
    duration,
    businessName,
    notes,
  } = params;

  const subject = `New Booking - ${serviceName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #10b981;">New Booking Received</h2>
      <p>A new booking has been made with ${businessName}.</p>
      
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Client Details</h3>
        <p><strong>Name:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        
        <h3>Booking Details</h3>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date & Time:</strong> ${bookingDateTime}</p>
        <p><strong>Your Timezone:</strong> ${businessTimezone}</p>
        <p><strong>Duration:</strong> ${duration} minutes</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      </div>
      
      <p>This has been automatically added to your Google Calendar.</p>
    </div>
  `;

  const text = `New Booking Received\n\nClient: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}\nDate & Time: ${bookingDateTime}\nTimezone: ${businessTimezone}\nDuration: ${duration} minutes\n${notes ? `Notes: ${notes}\n` : ""}`;

  try {
    await getTransporter().sendMail({
      from: `"${businessName}" <${env.smtpFrom}>`,
      to: businessEmail,
      subject,
      text,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return { success: false, error: String(error) };
  }
}
