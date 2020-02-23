import db from '@/utils/db'

const state = {
  clipList: [],
  faviClipList: []
}

const mutations = {
  updateClipList(state, payload) {
    state.clipList = payload
  },
  updateFaviClipList(state, payload) {
    state.faviClipList = payload
  }
}

const actions = {
  initClipList(store) {
    return new Promise((resolve, reject) => {
      db.clip
        .find({})
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            reject(err)
          } else {
            store.commit('updateClipList', docs)
            resolve(docs)
          }
        })
    })
  },
  initFaviClipList(store) {
    return new Promise((resolve, reject) => {
      db.clip
        .find({ star: true })
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            reject(err)
          } else {
            store.commit('updateFaviClipList', docs)
            resolve(docs)
          }
        })
    })
  },
  addClip(store, payload) {
    return new Promise((resolve, reject) => {
      db.clip.insert(payload, (err, newDoc) => {
        if (err) {
          reject(err)
        } else {
          store.dispatch('initClipList')
          resolve(newDoc)
        }
      })
    })
  },
  deleteClip(store, id) {
    return new Promise((resolve, reject) => {
      db.clip.remove({ _id: id }, {}, (err, num) => {
        if (err) {
          reject(err)
        } else {
          store.dispatch('initClipList')
          resolve()
        }
      })
    })
  },
  starClip(store, id) {
    return new Promise((resolve, reject) => {
      db.clip.update({ _id: id }, { $set: { star: true } }, {}, (err, num) => {
        if (err) {
          reject(err)
        } else {
          store.dispatch('initClipList')
          store.dispatch('initFaviClipList')
          resolve()
        }
      })
    })
  },
  unStarClip(store, id) {
    return new Promise((resolve, reject) => {
      db.clip.update({ _id: id }, { $set: { star: false } }, {}, (err, num) => {
        if (err) {
          reject(err)
        } else {
          store.dispatch('initClipList')
          store.dispatch('initFaviClipList')
          resolve()
        }
      })
    })
  },
  clearClipList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      db[payload].remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
          reject(err)
        } else {
          store.dispatch('initClipList')
          resolve()
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
