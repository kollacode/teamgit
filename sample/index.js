const trace = (x) => (console.log(x), x)

const compose_ = (g, f) => (...x) => g(f(...x))

const compose = (...fs) => fs.reduce(compose_)

const flip = (f) => (b) => (a) => f(a)(b)

const newTag = (tagName) => document.createElement (tagName)

const setContent = (content) => (elem) =>
  ( elem.innerText = content
  , elem
  )

const tag = (tagName) => (content) =>
  compose_(setContent (content), newTag) (tagName)

const appendElem = (elem) => (paren) => 
  ( paren.appendChild (elem)
  , paren
  )

const addChild = flip (appendElem)

const findElemById = (id) => document.querySelector(`#${id}`)

const itemText = ({ text = "" }) => text

const renderTodoItem = compose_(tag ('div'), itemText)

const mainElem = () => findElemById ('main') 

addChild 
  (mainElem())
  (renderTodoItem({ text: "bob" }))
