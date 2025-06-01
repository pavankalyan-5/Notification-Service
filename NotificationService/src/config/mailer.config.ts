import nodemailer, { Transporter } from 'nodemailer';


function connectToMailer() {
    try {
        let transporter: Transporter;

        return () => {
            console.log("inside connectToMailer: ", transporter)
            if(transporter){
                return transporter
            }
            transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465, 
                secure: true, 
                auth: {
                user: process.env.EMAIL_USER,       
                pass: process.env.EMAIL_PASSWORD,
                },
            });
            return transporter;
        }
    }
    catch(error){
        console.error('Error connecting to node mailer:', error);
        throw error;
    }    
}


export const getMailerConnectionObject = connectToMailer();