'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import WordCounter from './word-counter';
import WordCounterController from './word-counter-controller';
import Email from './email';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "markdown-mail" is now active!');

    let wordCounter = new WordCounter();
    let controller = new WordCounterController(wordCounter);
    const email = new Email({
        user: "geekchenlingyun@outlook.com",
        password: "pkklsrmypfkjtmcz",
        host: "smtp-mail.outlook.com"
    });
    const emailDisposable = vscode.commands.registerCommand('extension.sendMarkDownEmail', () => {
        email.send();
    })


    context.subscriptions.push(wordCounter);
    context.subscriptions.push(controller);
    context.subscriptions.push(emailDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}