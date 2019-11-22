const trace = (x, msg = "") => (console.log(msg, x), x)

const asConst = (a) => (b) => a

const compose_ = (g, f) => (...x) => g(f(...x))

const compose = (...fs) => fs.reduce(compose_)

const flip = (f) => (b) => (a) => f(a)(b)

const dearg = (...xs) => xs

const onSnd = (f) => (_, x) => f(x)

const fold = (f) => (y) => (xs) => xs.reduce (f, y)

const fold_ = (f) => fold (onSnd (f)) ()

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

const addChildTo = flip (appendElem)

const addChildrenTo = (p) => 
  compose 
    ( fold_ (addChildTo (p))
    , dearg
    )

const findElemById = (id) => document.querySelector(`#${id}`)

const newItem = (text) => ({ text })

const itemText = ({ text = "" }) => text

const renderTodoItem = compose_(tag ('div'), itemText)

const mainElem = () => findElemById ('main') 

addChildrenTo
  (mainElem())
  ( renderTodoItem (newItem ('bob'))
  , renderTodoItem (newItem ('joe'))
  )
