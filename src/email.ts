import { window } from 'vscode';
import email from 'emailjs';
import MarkDown from './markdown';
import { TlsConfiguration, SmtpConfiguration, EmailConfiguration } from './interface';


export default class Email {
    private _username: String;
    private _password: String;
    private _smtpHost: String;
    private _tls: TlsConfiguration;
    private _server: email.server;
    private _markdownRender;

    constructor(smtpConfiguration: SmtpConfiguration) {
        this._username = smtpConfiguration.user;
        this._password = smtpConfiguration.password;
        this._smtpHost = smtpConfiguration.host;
        this._tls = { ciphers: 'SSLv3' };
        this._server = email.server.connect(smtpConfiguration);
        this._markdownRender = new MarkDown();
    }

    send() {
        const editor = window.activeTextEditor;
        if (!editor) {
            window.showErrorMessage("没有活动的 markdown 文档");
            return;
        }
        const doc = editor.document;
        if (doc.isDirty) {
            window.showErrorMessage("文档未保存");
        }
        const content = doc.getText();
        const fileNameAsEmailSubject = doc.fileName;
        const html = this._markdownRender.renderMarkdownToHtml(content);
        const emailContent: EmailConfiguration = {
            text: "i hope this works",
            from: "Excited ccccly <geekchenlingyun@outlook.com>",
            to: "171764847@qq.com",
            cc: "",
            subject: fileNameAsEmailSubject,
            attachment:
            [
                { data: html,  alternative: true },
            ]
        }
        this._server.send(emailContent, (err: Error, message: String) => {
            console.log(err || message);
        });
    }
}