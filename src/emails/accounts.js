const { MailerSend, EmailParams,Sender, Recipient } = require("mailersend");

const mailersend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const sendWelcomeEmail = (email,name)=>{
    const sentFrom = new Sender("anany@trial-yzkq340v57xld796.mlsender.net", "Anany");

    const recipients = [new Recipient(email, name)];
    
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Thanks For Joining Us:)")
        .setHtml(`Welcome to the app .${name}. Let me know how you get along with the app`)
        .setText(`Welcome to the app .${name}. Let me know how you get along with the app`);
    
    
        mailersend.email.send(emailParams)
        .then(response => {
            console.log("Email sent successfully:", response);
        })
        .catch(error => {
            console.error("Failed to send email:", error);
        });
}

const sendDeleteAccountEmail = (email,name)=>{
    const sentFrom = new Sender("anany@trial-yzkq340v57xld796.mlsender.net", "Anany");

    const recipients = [new Recipient(email, name)];
    
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Oops You Deregistered with Us:(")
        .setText(`Hi ${name}. Why you deregisters with us , plz let us know so thaat we improve overself`);
    
    
        mailersend.email.send(emailParams)
        .then(response => {
            console.log("Email sent successfully:", response);
        })
        .catch(error => {
            console.error("Failed to send email:", error);
        });
}


module.exports = {
    sendWelcomeEmail,
    sendDeleteAccountEmail
}

