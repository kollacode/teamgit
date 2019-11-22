const trace = (x, msg = "") => (console.log(msg, x), x)

const curry = (f) => (...a) => (...b) => f(...a, ...b)

const applyTo = (...x) => (f) => f(...x)

const lazyApplyTo = (f) => (x) => () => f(x())

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

const findElemById = (id) => document.querySelector(`#${id}`)

const newTag = (tagName) => () => document.createElement (tagName)

//TODO: fix this to support the laziness of newTag
const tag = (tagName) => (...fs) => compose(...fs, newTag (tagName))

const innerText = (content) => lazyApplyTo (elem =>
  ( elem.innerText = content
  , elem
  )
)

const addAttribute = (name) => (value) => lazyApplyTo (elem =>
  ( elem.setAttribute (name, value)
  , elem
  )
)

const appendElem = (elem) => lazyApplyTo (paren => 
  ( paren.appendChild (elem)
  , paren
  )
)

const addChildTo = flip (appendElem)

const addChildrenTo = (p) => 
  compose 
    ( map_ (addChildTo (p))
    , argsAslList
    )

const input = (type) => (name) => (value) =>
  tag ('input')
    ( addAttribute ('type') (type)
    , addAttribute ('name') (name)
    , addAttribute ('value') (value)
    )

const label = (value) =>
  tag ('label') (innerText (value))

const labelFor = (name) => (value) => 
  compose(addAttribute ('for') (name), label(value))

const checkBox = (name) => (isChecked) => 
  compose
    ( isChecked ? addAttribute ('checked') (true) : id
    , input ('checkbox') (name) ("")
    )

const newItem = (text = "TODO", isDone = false) => ({ text, isDone })

const itemText = ({ text = "" }) => text

const isDone = ({ isDone = true }) => isDone

const liftReader = (f) => (g) => (h) => (r) => f (g(r)) (h(r))

const inBetween = (s) => compose_ (prependText, appendText (s))

const renderTodoItemText = compose_ (tag ('div'), innerText, itemText)

const renderTodoItemIsDone = compose_ (checkBox ("isDone"), isDone)

const renderTodoItem = (item) =>
  appendElem 
    (renderTodoItemIsDone (item))
    (renderTodoItemText (item))

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
