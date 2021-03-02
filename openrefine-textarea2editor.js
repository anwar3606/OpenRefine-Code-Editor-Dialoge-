// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:3333/*
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @grant        none
// ==/UserScript==
//


let script = document.createElement("script");
script.src = "http://cdnjs.cloudflare.com/ajax/libs/ace/1.3.0/ace.js";
document.getElementsByTagName("head")[0].appendChild(script);

script.onload = function () {
    let script2 = document.createElement("script");
    script2.src = "http://cdnjs.cloudflare.com/ajax/libs/ace/1.3.0/ext-language_tools.js";
    document.getElementsByTagName("head")[0].appendChild(script2);
}


function initiate_textarea(event) {
    console.log('dialogue found')
    let parent = $('.input-container');
    let editor_found = parent.find('div#editor');

    if (editor_found.length) {
        return
    }
    let textarea = parent.find('textarea');
    textarea.css('display', 'none');

    parent.append('<div id="editor" style="width: 100%; height: 300px;resize:vertical; overflow:auto;">value </div>')

    ace.require("ace/ext/language_tools");
    let html_editor = ace.edit("editor");
    html_editor.setTheme("ace/theme/monokai");
    html_editor.session.setMode("ace/mode/python");
    html_editor.setOptions({
        fontSize: '15px',
        showPrintMargin: false,
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
    });

    html_editor.getSession().on('change', function () {
        textarea.val(html_editor.getSession().getValue());
        textarea.trigger('change');
    });

    html_editor.focus()

    html_editor.commands.addCommand({
        name: 'save',
        bindKey: {win: "Ctrl-Enter"},
        exec: function (editor) {
            $('.dialog-container .dialog-footer button').get(0).click()
        }
    })
}

// noinspection JSUnresolvedVariable,JSUnresolvedFunction
const debouncedMouseMove = _.debounce(initiate_textarea, 1000);
(function () {
    'use strict';

    $('body').on('DOMNodeInserted', '.dialog-container', debouncedMouseMove)
})();