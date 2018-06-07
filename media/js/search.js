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

    let line = file.querySelector('.line');
    if (!line) {
      continue;
    }

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
});
