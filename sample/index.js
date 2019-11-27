const trace = (x, msg = "") => (console.log(msg, x), x)

const curry = (f) => (...a) => (...b) => f(...a, ...b)

const uncurry = (f) => (a, ...b) => f(a)(...b)

const applyTo = (...x) => (f) => f(...x)

const lazyApplyTo = (f) => (x) => () => f(x())

const id = (x) => x

const asConst = (a) => (b) => a

const compose_ = (g) => (f) => (...x) => g(f(...x))

const compose = (...fs) => (x) => fs.reduce((v, f) => f(v), x)

const flip = (f) => (...b) => (...a) => f(...a)(...b)

const argsAsList = (...xs) => xs

const onSnd = (f) => (_, x) => f(x)

const fold = (f) => (y) => (xs) => xs.reduce (f, y)

const for_ = (f) => (xs) => xs.forEach(f)

const map = (f) => (xs) => xs.map(f)

const range = (min) => (max) => map (onSnd(id)) (new Array(max - min).fill())

const prependText = (prefix) => (t) => `${prefix}${t}`

const appendText = flip(prependText)

/* type Tag = () -> Html
 * 
 * newTag :: TagName -> Tag
 *
 * mapTag :: (Html -> Html) -> Tag -> Tag 
 * mapTag f t _ = f . runTag $ t
 *
 * runTag :: Tag -> Html
 * runTag = ($ ())
 *
 */

//    newTag : TagName -> Tag
const newTag = (tagName) => () => document.createElement (tagName)

//    findElemById : ElemId -> Tag
const findElemById = (id) => () => document.querySelector(`#${id}`)

//    tag : TagName -> (...Tag -> Tag) -> Tag
const tag = (tagname) => (...fs) =>
  compose (...fs) (newTag (tagname))

//    runTag : Tag -> Html
const runTag = applyTo ()

//    mapTag : (Html -> Html) -> Tag -> Tag
const mapTag = (f) => (t) => () => compose_ (f) (runTag) (t)

//    innerText : Text -> Tag -> Tag
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
const appendElem = elem => mapTag (paren =>
  ( paren.appendChild (runTag (elem))
  , paren
  )
)

//    appendChild : Tag -> Tag -> Tag
const appendChild = flip (appendElem)

//    addChildrenTo : Tag -> [Tag] -> Tag
const addChildrenTo = fold (uncurry (appendChild))

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

//    newItem : Text -> Bool -> Item
const newItem = (text = "TODO") => (isDone = false) => ({ text, isDone })

//    itemText : Item -> Text
const itemText = ({ text = "" }) => text

//    itemIsDone : Item -> Bool
const itemIsDone = ({ isDone = true }) => isDone

//    renderTodoItemText : Text -> Tag
const renderTodoItemText = 
  compose 
  ( innerText
  , applyTo (newTag ('div'))
  )

//    renderTodoItemIsDone : Bool -> Tag
const renderTodoItemIsDone = checkBox ('itemIsDone')

//    renderTodoItem : Item -> Tag
const renderTodoItem = (item) =>
  appendChild 
    (renderTodoItemText (itemText (item)))
    (renderTodoItemIsDone (itemIsDone (item)))

//    mainElem : Tag
const mainElem = findElemById ('main') 

//    renderTodoItems : [Item] -> [Tag]
const renderTodoItems = map (renderTodoItem)

//    todoItems : [Item]
const todoItems = 
  map 
    (compose_ 
      (flip (newItem) (true)) 
      (prependText ("Item - 1")) 
    )
    (range (0) (4))

console.log(todoItems)
 
runTag (
  addChildrenTo (mainElem) (renderTodoItems (todoItems))
)
