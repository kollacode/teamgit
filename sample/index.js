const trace = (x, msg = "") => (console.log(msg, x), x)

const applyTo = (...x) => (f) => f(...x)

const id = (x) => x

const asConst = (a) => (b) => a

const compose_ = (g, f) => (...x) => g(f(...x))

const compose = (...fs) => fs.reduce(compose_)

const flip = (f) => (...b) => (...a) => f(...a)(...b)

const argsAslList = (...xs) => xs

const onSnd = (f) => (_, x) => f(x)

const fold = (f) => (y) => (xs) => xs.reduce (f, y)

const map_ = (f) => (xs) => xs.forEach(f)

const map = (f) => (xs) => xs.map(f)

const range = (min) => (max) => map (onSnd(id)) (new Array(max - min).fill())

const prependText = (prefix) => (t) => `${prefix}${t}`

const appendText = flip(prependText)

const newTag = (tagName) => document.createElement (tagName)

const innerText = (content) => (elem) =>
  ( elem.innerText = content
  , elem
  )

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

const newItem = (text = "TODO", isDone = false) => ({ text, isDone })

const itemText = ({ text = "" }) => text

const isDone = ({ isDone = true }) => isDone

const liftReader = (f) => (g) => (h) => (r) => f (g(r)) (h(r))

const inBetween = (s) => compose (prependText, appendText (s))

const newTagWith = (tagName) => (f) => f (newTag (tagName))

const renderTodoItem = 
  compose
    ( newTagWith ('div')
    , innerText
    , liftReader (inBetween (" - ")) (itemText) (isDone)
    )

const mainElem = () => findElemById ('main') 

const renderTodoItems = map (renderTodoItem)

const todoItems = 
  map 
    ( compose 
        ( newItem
        , prependText ("Item - ")
        ) 
    )
    (range (0) (4))

addChildrenTo
  (mainElem())
  (... renderTodoItems (todoItems))
