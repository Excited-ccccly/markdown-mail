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
            window.showErrorMessage('文档未保存');
            return;
        }
        if (doc.isUntitled) {
            window.showErrorMessage('请先保存为 markdown 文件');
            return;
        }
        const content = doc.getText();
        const html = this._markdownRender.renderMarkdownToHtml(content);
        const emailContent: EmailContentConfig = workspace.getConfiguration("markdown-mail").get("email") as EmailContentConfig;
        const accountConfig: AccountConfig = workspace.getConfiguration("markdown-mail").get("account") as AccountConfig;
        if (validateAccountConfig(accountConfig)) {
            window.showErrorMessage('请先到工作区设置或用户设置中配置 email 账号');
        }
        emailContent.from = getUserFromAccountConfig(accountConfig);
        emailContent.attachment = [{ data: html, alternative: true }];
        window.setStatusBarMessage('正在发送...', 5000);
        this._server.send(emailContent, (err: Error, message: String) => {
            if (err) {
                window.setStatusBarMessage('发送失败,请查看扩展配置', 2000);
                return;
            }
            window.setStatusBarMessage(`邮件已发送至${emailContent.to}`, 2000);
        });
    }
}

function getUserFromAccountConfig(accountConfig: AccountConfig): String {
    return `${accountConfig["user"].split('@')[0]} <${accountConfig["user"]}>`;
}

function validateAccountConfig(accountConfig: AccountConfig): Boolean {
    return accountConfig["user"] === "username@your-email.com";
}


