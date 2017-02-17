import { window, workspace } from 'vscode';
const email = require('emailjs');
import MarkDown from './markdown';
import { EmailConnectionConfig, EmailContentConfig, AccountConfig } from './interface';

export default class Email {
    private _server;
    private _markdownRender;

    constructor(smtpConfiguration: EmailConnectionConfig) {
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
            throw "请先保存为 markdown 文件";
        }
        const content = doc.getText();
        const html = this._markdownRender.renderMarkdownToHtml(content);
        const emailContent: EmailContentConfig = workspace.getConfiguration("markdown-mail").get("email") as EmailContentConfig;
        const accountConfig: AccountConfig = workspace.getConfiguration("markdown-mail").get("account") as AccountConfig;
        emailContent.from = getUserFromAccountConfig(accountConfig);
        emailContent.attachment = [{ data: html,  alternative: true }];
        this._server.send(emailContent, (err: Error, message: String) => {
            if (err) throw err;
            window.setStatusBarMessage(`邮件已发送至${emailContent.to}`, 2000);
        });
    }
}

function getUserFromAccountConfig(accountConfig: AccountConfig) : String {
    return `${accountConfig["user"].split('@')[0]} <${accountConfig["user"]}>`;
}
