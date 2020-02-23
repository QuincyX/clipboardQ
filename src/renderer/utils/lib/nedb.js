const path = require('path')
const Datastore = require('nedb')
const { remote, app } = require('electron')

function getPath(val) {
  return path.join(
    remote.app.getPath('appData'),
    remote.app.getName(),
    'db',
    `${val}.db`
  )
}

export default class nedb {
  constructor(dbList, config) {
    dbList.forEach(o => {
      this[o] = new Datastore({
        filename: getPath(o),
        autoload: true,
        timestampData: true
      })
    })
  }
}
