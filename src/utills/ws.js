import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import store from '../components/store/store'

var stompClient = null
var delay = 1 // sec

function callbackOnMessage (message) {
  setTimeout(() => {
    console.log(message)
    if (message.body === 'refresh all') {
      store.dispatch('setValue', {key: 'refreshAdmin', value: true})
      store.dispatch('setValue', {key: 'refreshWaiter', value: true})
      store.dispatch('setValue', {key: 'refreshKitchen', value: true})
    }
    console.log(message.body)
  }, delay * 1000)
}

function callbackOnMessageFromKitchenToUpdateStock (message) {
  setTimeout(() => {
    console.log(message)
    if (message.body === 'refresh stock') {
      store.dispatch('setValue', {key: 'refreshStock', value: true})
    }
    console.log(message.body)
  }, delay * 1000)
}

function callbackOnMessageFromKitchenToUpdateWaiter (message) {
  setTimeout(() => {
    console.log(message)
    if (message.body === 'refresh waiter') {
      store.dispatch('setValue', {key: 'refreshWaiter', value: true})
    }
    console.log(message.body)
  }, delay * 1000)
}

export function connect () {
  const socket = new SockJS(store.getters.host + '/refresh')
  stompClient = Stomp.over(socket)
  stompClient.connect({}, frame => {
    console.log('!!!!!!Connected: ' + frame)
    console.log('/topic/messages')
    stompClient.subscribe('topic/messages', message => {
      callbackOnMessage(message)
    })
    stompClient.subscribe('topic/messages/toWaiter', message => {
      callbackOnMessageFromKitchenToUpdateWaiter(message)
    })
    stompClient.subscribe('topic/messages/toStock', message => {
      callbackOnMessageFromKitchenToUpdateStock(message)
    })
  })
}

export function disconnect () {
  if (stompClient !== null) {
    stompClient.disconnect()
  }
  console.log('Disconnected')
}

export function sendMessageFromKitchenToWaiter () {
  stompClient.send('/app/refresh', {}, JSON.stringify({message: 'change dish status on kitchen'}))
}

export function sendMessageFromKitchenToStock () {
  stompClient.send('/app/refresh', {}, JSON.stringify({message: 'remove ingredients from stock'}))
}

export function sendMessage () {
  // eslint-disable-next-line no-undef
  stompClient.send('/app/refresh', {}, JSON.stringify({message: 'bought new dish'}))
}
