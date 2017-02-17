import MarkdownIt from 'markdown-it';
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
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) { }
        }
        return '<pre class="hljs"><code>' + this._md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
  }
  renderMarkdownToHtml(content: String) {
    return this._md.render(content);
  }
}


