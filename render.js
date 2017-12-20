const marked = require('marked')
const handlebars = require('handlebars')
// const YAML = require('yamljs')

// const templates = YAML.load('templates.yml')

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

let templates = []

const articles = 
  fs.readdirSync('./articles')
  .map(path => fs.readFileSync(path))

templates.push(articles)

templates
  .map(template => { template.path, content: Handlebars.compile(template.content) })
  .forEach(page => write(page.path, page.content))
