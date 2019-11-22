const trace = (x, msg = "") => (console.log(msg, x), x)

const id = (x) => x

const asConst = (a) => (b) => a

const compose_ = (g, f) => (...x) => g(f(...x))

const compose = (...fs) => fs.reduce(compose_)

const flip = (f) => (b) => (a) => f(a)(b)

const argsAslList = (...xs) => xs

const onSnd = (f) => (_, x) => f(x)

const fold = (f) => (y) => (xs) => xs.reduce (f, y)

const map_ = (f) => (xs) => xs.forEach(f)

const map = (f) => (xs) => xs.map(f)

const range = (min) => (max) => map (onSnd(id)) (new Array(max - min).fill())

const prependText = (prefix) => (t) => `${prefix}${t}`

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
    ( map_ (addChildTo (p))
    , argsAslList
    )

const findElemById = (id) => document.querySelector(`#${id}`)

const newItem = (text) => ({ text })

const itemText = ({ text = "" }) => text

const renderTodoItem = compose_(tag ('div'), itemText)

const mainElem = () => findElemById ('main') 

const renderTodoItems = (todoItems) =>
  addChildrenTo
    (mainElem())
    ( ...map (renderTodoItem) (todoItems)
    )

const todoItems = 
  map 
    ( compose 
        ( newItem
        , prependText ("Item - ")
        ) 
    )
    (range (0) (4))

renderTodoItems (todoItems)
