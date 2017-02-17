import { window, workspace } from 'vscode';
const email = require('emailjs');
import MarkDown from './markdown';
import { TlsConfiguration, SmtpConfiguration, EmailConfiguration } from './interface';


export default class Email {
    private _server;
    private _markdownRender;

    constructor(smtpConfiguration: SmtpConfiguration) {
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
            throw "文档未保存"
        }
        if (doc.isUntitled) {
            throw "请先保存为 markdown ";
        }
        const content = doc.getText();
        const html = this._markdownRender.renderMarkdownToHtml(content);
        const emailContent = workspace.getConfiguration("markdown-mail").get("email") as EmailConfiguration;
        emailContent.attachment = [{ data: html,  alternative: true }];
        this._server.send(emailContent, (err: Error, message: String) => {
            if (err) throw err;
            window.showInformationMessage(`邮件已发送至${emailContent.to}`);
        });
    }
}
