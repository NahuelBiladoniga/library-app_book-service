import {EmailInterface} from "./interface.email";
import mailer from '@sendgrid/mail'
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";
import {ClientResponse} from "@sendgrid/client/src/response";
import fs from "fs";

mailer.setApiKey(process.env.SENDGRID_API_KEY)

let emailTemplate = fs.readFileSync(__dirname + '/email.html').toString()

export default class SendGridEmail extends EmailInterface {
    async sendEmail(to: string, organizationName: string, inviteToken: string, role: string): Promise<[ClientResponse, {}]> {
        return await mailer.send(this.getEmailInformation(to, organizationName, inviteToken, role))
    }

    getEmailFrom(): string {
        // TODO(santiagotoscanini): We should have a separate email for this.
        return 'toscaninisantiago@gmail.com'
    }

    getEmailSubject(organizationName: string): string {
        return `You received an invitation for ${organizationName}`
    }

    getEmailContent(organizationName: string, inviteToken: string, emailTo: string, role: string): string {
        const url = `http://library.app/sign-up-${role}?organizationName=${organizationName}&email=${emailTo}&invite-token=${inviteToken}`
        return emailTemplate.replace('${LINK}', url).replace('${ORG_NAME}', organizationName)
    }

    getEmailInformation(to: string, organizationName: string, inviteToken: string, role: string): MailDataRequired {
        return {
            to,
            from: this.getEmailFrom(),
            subject: this.getEmailSubject(organizationName),
            html: this.getEmailContent(organizationName, inviteToken, to, role),
        }
    }
}
