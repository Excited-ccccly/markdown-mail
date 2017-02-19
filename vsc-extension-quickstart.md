# Welcome to your first VS Code Extension

## What's in the folder
* This folder contains all of the files necessary for your extension
* `package.json` - this is the manifest file in which you declare your extension and command.
This plugin registers a command and defines its title and command name. With this information
VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* `src/extension.ts` - this is the main file where you will provide the implementation of your command.
The file exports one function, `activate`, which is called the very first time your extension is
activated (in this case by detecting a markdown file). Inside the `activate` function we call `registerCommand`.
We pass the function containing the implementation of the command as the second parameter to
`registerCommand`.
* `src/interface.ts` - typescript interface definition
* `src/word-counter.ts` and `src/word-counter-controller.ts` are responsible for counting words in markdown file.
* `src/markdown.ts` - render markdown to html
* `src/smtp-config.ts` - store smtp config retrieved from the internet. If you want to support a new email service provider,
you have to find their smtp config and store it into this file.
* `src/email.ts` - send email

## Get up and running straight away
* run **npm install** to install dependencies
* press `F5` to open a new window with your extension loaded
* open a markdown file
* config your email account and email setting according to [Extension Settings](README.md#Settings)
* run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Send My Email`
* set breakpoints in your code inside `src/extension.ts` to debug your extension
* find output from your extension in the debug console

## Make changes
* you can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`
* you can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes

## Explore the API
* you can open the full set of our API when you open the file `node_modules/vscode/vscode.d.ts`

<h2 id="Packaging"> Packaging Extensions</h2>

You may want to simply package extensions without getting them from the store. Extensions will always be packaged into a **.vsix** file. Here's how:

* Install vsce:

  Make sure you have [Node.js](https://nodejs.org/) installed. Then simply run:

  ```
  npm install -g vsce
  ```

* Package

  If you haven't run **npm install**, you should run it first to install dependencies.

  Then, you are ready to package this extension.

  ```
  vsce package
  ```

  This will package this extension into a **.vsix** file and place it in the current directory. It's possible to install **.vsix** files into Visual Studio Code. See [Installing Extensions](http://code.visualstudio.com/docs/extensions/install-extension) for more details.