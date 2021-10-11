export abstract class EmailInterface {
    public abstract sendEmail(to: string, organizationName: string, inviteToken: string, role: string): Promise<any>

    abstract getEmailFrom(): string;

    abstract getEmailSubject(organizationName: string): string;

    abstract getEmailContent(organizationName: string, inviteToken: string, emailTo: string, role: string): string;

    abstract getEmailInformation(to: string, organizationName: string, inviteToken: string, emailTo: string, role: string): any;
}
