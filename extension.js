/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path');

// The module 'vscode' contains the VS Code extensibility API
const { workspace, window, commands, ViewColumn, Uri, Position, Selection,
        Range, TextEditorRevealType } = require('vscode');

const { search } = require('./searchfox/api');
const { renderMainSection } = require('./searchfox/render');

function promptForText(prompt, placeHolder) {
    return window.showInputBox({
        placeHolder,
        prompt
    });
}

async function getTextToSearch(prompt, placeHolder) {
    if (window.activeTextEditor) {
        let selection = window.activeTextEditor.selections[0];
        if (!selection.isSingleLine) {
            return promptForText(prompt, placeHolder);
        }

        let range = selection.isEmpty ?
                    window.activeTextEditor.document.getWordRangeAtPosition(selection.start) :
                    selection;

        if (!range) {
            return promptForText(prompt, placeHolder);
        }

        let text = window.activeTextEditor.document.getText(range);

        if (text) {
            return text;
        }
    }

    return promptForText(prompt, placeHolder);
}

async function searchText(context) {
    let text = await getTextToSearch('Keyword to search for on Searchfox', 'keyword');
    if (!text) {
        return;
    }

    let data = await search({
        q: text,
        case: false,
        regexp: false,
    });

    displayResults(data, context);
}

function displayResults(data, context) {
    if (data["*timedout*"]) {
        window.showErrorMessage('Searchfox timed out.');
        return;
    }

    let css = Uri.file(path.join(context.extensionPath, 'media', 'css', 'search.css'))
                 .with({ scheme: 'vscode-resource' });
    let js = Uri.file(path.join(context.extensionPath, 'media', 'js', 'search.js'))
                .with({ scheme: 'vscode-resource' });

    let html = `<!DOCTYPE html><html><head>` +
      `<meta http-equiv="Content-Security-Policy" content="default-src vscode-resource:;">` +
      `<link rel='stylesheet' type='text/css' href='${css}'>` +
      `<script type='text/javascript' src='${js}'></script>` +
    `</head><body><ul>`;
    for (let id of ['normal', 'test', 'generated']) {
        html += renderMainSection(id, data[id]);
    }
    html += `</ul></body></html>`;

    let panel = window.createWebviewPanel('searchfox', data["*title*"], ViewColumn.Three, {
        localResourceRoots: [
            Uri.file(path.join(context.extensionPath, 'media')),
        ],
        enableScripts: true,
    });
    panel.webview.html = html;

    panel.webview.onDidReceiveMessage(async message => {
        switch (message.command) {
            case 'openPath':
                let foo = path.join(workspace.rootPath, message.data.path);
                let document = await workspace.openTextDocument(foo);
                let editor = await window.showTextDocument(document, ViewColumn.One);
                if (message.data.line) {
                    let line = message.data.line - 1;
                    let position = new Position(line, 0);
                    let selection = new Selection(position, position);
                    editor.selection = selection;

                    let range = new Range(position, position);
                    editor.revealRange(range, TextEditorRevealType.InCenter);
                }
                break;
            default:
                console.error(`Unexpected webview command: ${message.command}`);
                break;
        }
    });
}

// this method is called when your extension is activated
function activate(context) {
    let disposable = commands.registerCommand('searchfox.searchText', searchText.bind(null, context));

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;