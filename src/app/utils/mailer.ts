import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import UserModel from '@/models/User'


export async function sendMail({ email, emailType, userid }: any) {
    try {

        const uuidToken = `${userid}-${uuidv4()}`

        if (emailType === 'VERIFY') {
            await UserModel.findByIdAndUpdate(userid, { verifytoken: uuidToken, verifyexpiry: Date.now() + 3600000 })
        }


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "ahanaf.tanvir40@gmail.com",
                pass: "zvqwuskutlooqszk",
            },
        })

        const info = await transporter.sendMail({
            from: `"TrendyKicks" <ahanaf.tanvir40@gmail.com>`, // sender address
            to: email, // list of receivers
            subject: "Verify Your Email", // Subject line
            
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${uuidToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${uuidToken}
            </p>`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);


    } catch (error: any) {
        throw new Error(error.message)
    }
}