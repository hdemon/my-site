const fs = require('fs')
const marked = require('marked')
const pug = require('pug')

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => require('highlight.js').highlightAuto(code).value,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

const top = {
  path: 'index.html',
  templatePath: './templates/top.pug',
  data: {}
}

const articles =
  fs.readdirSync('./articles')
    .map(path =>({
      path: `articles/${path.replace(/\.md$/, '.html')}`,
      templatePath: `articles/${path}`,
      data: {}
    }))

const templates = [...articles, top]

templates
  .map(template => ({ path: `dist/${template.path}`, renderedString: pug.compileFile(template.templatePath)(template.data) }))
  .forEach(page => fs.writeFileSync(page.path, page.renderedString))
