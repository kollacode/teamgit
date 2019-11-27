const trace = (x, msg = "") => (console.log(msg, x), x)

const curry = (f) => (...a) => (...b) => f(...a, ...b)

const applyTo = (...x) => (f) => f(...x)

const lazyApplyTo = (f) => (x) => () => f(x())

const id = (x) => x

const asConst = (a) => (b) => a

const compose_ = (g, f) => (...x) => g(f(...x))

const compose = (...fs) => fs.reduce(compose_)

const flip = (f) => (...b) => (...a) => f(...a)(...b)

const argsAsList = (...xs) => xs

const onSnd = (f) => (_, x) => f(x)

const fold = (f) => (y) => (xs) => xs.reduce (f, y)

const for_ = (f) => (xs) => xs.forEach(f)

const map = (f) => (xs) => xs.map(f)

const range = (min) => (max) => map (onSnd(id)) (new Array(max - min).fill())

const prependText = (prefix) => (t) => `${prefix}${t}`

const appendText = flip(prependText)

const findElemById = (id) => document.querySelector(`#${id}`)

/* type Tag = () -> Html
 * 
 * newTag :: TagName -> Tag
 *
 * asTag :: Html -> Tag
 * asTag = const
 *
 * mapTag :: (Html -> Html) -> Tag -> Tag 
 * mapTag f = asTag . f . runTag
 *
 * runTag :: Tag -> Html
 * runTag = ($ ())
 *
 */

//    newTag : TagName -> Tag
const newTag = (tagName) => () => document.createElement (tagName)

//    tag : TagName -> (...Tag -> Tag) -> Tag
const tag = (tagname) => (...fs) =>
  compose (...fs) (newTag (tagname))

//    asTag : Html -> Tag
const asTag = asConst

//    runTag : Tag -> Html
const runTag = applyTo ()

//    mapTag : (Html -> Html) -> Tag -> Tag
const mapTag = (f) => compose (runTag, f, asTag)

//    innerText : Text -> Html -> Html
const innerText = (content) => mapTag (elem =>
  ( elem.innerText = content
  , elem
  )
)

//    addAttribute : Name -> Value -> Tag -> Tag
const addAttribute = (name) => (value) => mapTag (elem =>
  ( elem.setAttribute (name, value)
  , elem
  )
)

//    named : Name -> Tag -> Tag
const named = addAttribute ('name') 

//    valued : Value -> Tag -> Tag
const valued = addAttribute ('value')

//    type : Type -> Tag -> Tag
const typed = addAttribute ('type')

//    fored : Name -> Tag -> Tag
const fored = addAttribute ('for')

//    checked : Tag -> Tag
const checked = addAttribute ('checked') (true)

//    appendTag : Tag -> Tag -> Tag
const appendElem = (elem) => mapTag (paren => 
  ( paren.appendChild (runTag (elem))
  , paren
  )
)

//    addChildTo : Tag -> Tag -> Tag
const addChildTo = flip (appendElem)

//    addChildrenTo : Tag -> (...Tag) -> Tag
const addChildrenTo = (p) => 
  compose 
    ( for_ (addChildTo (p))
    , argsAsList
    )

//    input : Type -> Name -> Value -> Tag
const input = (type) => (name) => (value) =>
  tag ('input')
    ( typed (type)
    , named (name)
    , valued (value)
    )

//    labelFor : Name -> Value -> Tag
const labelFor = (name) => (value) => 
  tag ('label')
    ( valued (value)
    , fored (name)
    )

//    label : Value -> Tag
const label = labelFor ('')

//    checkBox : Name -> Bool -> Tag
const checkBox = (name) => (isChecked) => 
  applyTo 
    ( (input ('checkbox') (name) (true)))
    (isChecked ? checked : id) 

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
