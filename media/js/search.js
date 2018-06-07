/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const vscode = acquireVsCodeApi()

function openPath(path, line = null) {
    vscode.postMessage({
        command: 'openPath',
        data: {
            path,
            line,
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
  for (let file of document.querySelectorAll('.file.test,.file.normal')) {
    let path = file.dataset.path;

    let header = file.querySelector('h3');
    header.addEventListener('click', () => {
      openPath(path);
    });

    let lines = file.querySelectorAll('.line');
    for (let line of lines) {
      let lineno = line.dataset.line;

      let number = line.querySelector('.lineno');
      number.addEventListener('click', () => {
        openPath(path, lineno);
      })

      let code = line.querySelector('code');
      code.addEventListener('click', () => {
        openPath(path, lineno);
      })
    }
  }
});
