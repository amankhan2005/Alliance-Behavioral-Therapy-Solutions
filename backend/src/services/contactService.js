import Contact from "../models/Contact.js";
import { sendAdminEmail, sendUserEmail } from "./emailService.js";

export const createContactService = async (data) => {
  const { name, email, phone, message } = data;

  if (!name || !email || !message) {
    throw new Error("Required fields missing");
  }

  // Save in DB
  const contact = await Contact.create(data);

  // Send Emails
  await Promise.all([
    sendAdminEmail({ name, email, phone, message }),
    sendUserEmail({ name, email })
  ]);

  return contact;
};