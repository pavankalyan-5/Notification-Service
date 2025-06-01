import { Transporter } from "nodemailer";
import { NotificationDto } from "../dto/notification.dto";
import { getMailerConnectionObject } from "../config/mailer.config";
import { fillTemplateWithData, templateIdMapper } from "../utils/helpers/request.helpers";
import path from "path";
import fs from 'fs';

export const sendMailService = async (payload: NotificationDto) => {

    const transporter: Transporter = getMailerConnectionObject();

    // TODO: need to fetch template from some storage (S3)
    const templateName: string = templateIdMapper[payload.templateId]

    const templatePath: string = path.join(__dirname, `../assets/templates/${templateName}.hbs`);
    const rawTemplate: string = fs.readFileSync(templatePath, 'utf-8');

    try {
        const info = await transporter.sendMail({
          from: `"Airbnb" ${process.env.EMAIL_USER}`,
          to: payload.to,
          subject: payload.subject,
          html: fillTemplateWithData(rawTemplate, payload.params),
        });
    
        console.log('Message sent:', info.messageId);
      } catch (error) {
        console.error('Error sending email:', error);
      }
}