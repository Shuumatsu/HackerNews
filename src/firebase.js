// This import loads the firebase namespace along with all its type information.
import { initializeApp, database } from 'firebase/app'
// These imports load individual services into the firebase namespace.
import 'firebase/database'

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
}
// avoid error when hot reload
if (!window['@initializedApp']) {
    window['@initializedApp'] = true
    initializeApp(config)
}
const firebaseDatabase = database().ref('/v0')

export const fetchAllIdsByType = type => firebaseDatabase.child(`${type}stories`).once('value').then(value => value.val())

export const fetchItem = id => firebaseDatabase.child(`item/${id}`).once('value').then(value => value.val())

export const fetchItems = ids => {
    const promises = ids.map(fetchItem)
    return Promise.all(promises)
}

export const subscribeByType = (type, callback) => firebaseDatabase.child(`${type}stories`).on('value', callback)

