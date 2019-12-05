const { readdir, readFile } = require ('fs') 

const throwErr = (err) => {
  throw new Error(err)
}

const newPerson = (favoriteFood, city) => (
  { favoriteFood
  , city
  }
)

const printPersonInfo = ({name, favoriteFood, city }) => 
  console.log(`${name} lives in ${city} and likes ${favoriteFood}`)

const checkCorrectPerson = ({ favoriteFood = null, city = null } = {}) => 
  favoriteFood && city

const parsePersonFile = (name) => (str) => (
  { ...JSON.parse(str)
  , name
  }
)

const nameFilePath = (name) => `./${name}`

const asPromise = (f) => (...args) => (
  new Promise((resolve, reject) =>
    f(...args, (err, x) =>
      err ? reject(err) : resolve (x)
    )
  )
)

const readPersonFile = (name) =>
  asPromise (readFile) (nameFilePath (name))
    .then(parsePersonFile (name))
    .catch(err =>
      ( console.log (`Couldn't parse ${name} remember should be ${JSON.stringify(newPerson ("...", "..."))} `)
      , null
      )
    )

const processPerson = (name) =>
  readPersonFile (name)
  .then(personInfo => 
    personInfo && checkCorrectPerson (personInfo) 
      ? (printPersonInfo (personInfo), personInfo)
      : null
    )

const allValidPersons = (persons) =>
  persons.reduce((isValid, x) => isValid && x, true)

const checkAllPersons = (names) =>
  Promise.all(names.map (processPerson))
  .then(allValidPersons)
  .then(isAllValid =>
    isAllValid ? console.log("You've passed!") : console.log("You didn't pass!")
  )

const isNameFile = (fp) => /^[a-z]*$/.test(fp)

const filterNameFiles = (fps) => fps.filter(isNameFile)

const trace = (x) => console.log(x)

const getNames = () =>
  asPromise (readdir) ('.')
  .then (filterNameFiles)

getNames().then(checkAllPersons)
