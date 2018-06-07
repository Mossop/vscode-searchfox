const escape = require('escape-html');

function renderLine(path, line) {
    let content = `<li class='line' data-line='${parseInt(line.lno)}'><span class='lineno'>`;
    content += parseInt(line.lno);
    content += `</span><code>`;
    content += escape(line.line);
    content += `</code></li>`;

    return content;
}

function renderFile(path, lines, sectionId) {
    let content = `<li class='file ${sectionId}' data-path='${escape(path)}'><h3>`;
    content += escape(path);
    content += `</h3>`;

    if (lines.length > 0) {
        content += `<ul>`;
        for (let line of lines) {
            content += renderLine(path, line);
        }
        content += `</ul>`;
    }

    content += `</li>`;
    return content;
}

function renderGroup(groupTitle, groupData, sectionId) {
    let content = `<li class='group'><h2>${escape(groupTitle)}</h2><ul>`;
    for (let file of groupData) {
        content += renderFile(file.path, file.lines, sectionId);
    }
    content += `</ul></li>`;

    return content;
}

function renderMainSection(sectionId, sectionData) {
    if (!sectionData) {
        return '';
    }

    let title = '';
    switch (sectionId) {
        case 'normal':
            title = 'Code';
            break;
        case 'test':
            title = 'Test Files';
            break;
        case 'generated':
            title = 'Generated Code';
            break;
        default:
            throw new Error(`Unexpected main section ${sectionId}`);
    }

    let content = `<li id='$[sectionId}' class='main'><h1>${escape(title)}</h1><ul>`;
    for (let header of Object.keys(sectionData)) {
        content += renderGroup(header, sectionData[header], sectionId);
    }
    content += `</ul></li>`;

    return content;
}
exports.renderMainSection = renderMainSection;
