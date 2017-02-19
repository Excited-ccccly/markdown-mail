const MarkdownIt = require('markdown-it');
import hljs from 'highlight.js';

export default class MarkDown {
  private _md;

  constructor() {
    this._md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) { }
        }

        return '';
      }
    });
  }
  renderMarkdownToHtml(content: String) {
    return this._md.render(content);
  }
}


