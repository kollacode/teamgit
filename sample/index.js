const trace = (x, msg = "") => (console.log(msg, x), x)

const curry = (f) => (...a) => (...b) => f(...a, ...b)

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

const newTagWith = (tagName) => (f) => f (newTag (tagName))

const innerText = (content) => (elem) =>
  ( elem.innerText = content
  , elem
  )

const tag = (tagName) => (...fs) => compose(...fs, newTag) (tagName)

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

const addAttribute = (name) => (value) => (elem) =>
  ( elem.setAttribute (name, value)
  , elem
  )

const extendAttrs = curry

const input = (type) => (name) => (value) =>
  extendAttrs (tag ('input'))
    ( addAttribute ('type') (type)
    , addAttribute ('name') (name)
    , addAttribute ('value') (value)
    )

const label = (value) =>
  extendAttrs (tag ('label'))
    ( innerText (value)
    )

const labelFor = (name) => (value) => 
  extendAttrs (label(value)) (addAttribute ('for') (name))

const checkBox = (x) => 
  input ('checkbox') (x ? addAttribute ('checked') () : id) (x)

const findElemById = (id) => document.querySelector(`#${id}`)

const newItem = (text = "TODO", isDone = false) => ({ text, isDone })

const itemText = ({ text = "" }) => text

const isDone = ({ isDone = true }) => isDone

const liftReader = (f) => (g) => (h) => (r) => f (g(r)) (h(r))

const inBetween = (s) => compose_ (prependText, appendText (s))

const renderTodoItemText = compose_ (innerText, itemText)

const renderTodoItemIsDone = compose (appendElem, checkBox, isDone)

const renderTodoItem = (item) =>
  tag ('div')
    ( renderTodoItemIsDone (item)
    , renderTodoItemText (item) 
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
