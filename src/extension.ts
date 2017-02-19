'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import WordCounter from './word-counter';
import WordCounterController from './word-counter-controller';
import Email from './email';
import { EmailConnectionConfig, AccountConfig, SmtpConfig } from './interface';
import getSmtpConfig from './smtp-config'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "markdown-mail" is now active!');

    let wordCounter = new WordCounter();
    let controller = new WordCounterController(wordCounter);
    const accountConfig: AccountConfig = vscode.workspace.getConfiguration("markdown-mail").get("account") as AccountConfig;
    const smtpConfig: SmtpConfig = getSmtpConfig(accountConfig["user"] as String) as SmtpConfig;
    const emailConnectionConfig: EmailConnectionConfig = Object.assign({}, accountConfig, smtpConfig) as EmailConnectionConfig;
    const email = new Email(emailConnectionConfig);
    const emailDisposable = vscode.commands.registerCommand('extension.sendMarkDownEmail', () => {
        email.send();
    });
    context.subscriptions.push(wordCounter);
    context.subscriptions.push(controller);
    context.subscriptions.push(emailDisposable);
}

process.on('uncaughtException', (err) => {
    vscode.window.setStatusBarMessage('发送失败,请查看扩展配置', 2000);
});

// this method is called when your extension is deactivated
export function deactivate() {
}