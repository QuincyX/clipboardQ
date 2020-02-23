import DB from '../utils/lib/nedb'

const db = new DB(['clip', 'starClip', 'userData'])
export default db
