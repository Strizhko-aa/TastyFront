import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import store from '../components/store/store'

var stompClient = null

function callbackOnMessage (message) {
  console.log(message)
  switch (message.body) {
    case 'refresh all': {
      console.log('I am in REFRESH ALL case')
      store.dispatch('setValue', {key: 'refreshAdmin', value: true})
      store.dispatch('setValue', {key: 'refreshWaiter', value: true})
      store.dispatch('setValue', {key: 'refreshKitchen', value: true})
      console.log(store.getters.value('refreshAdmin'))

      break
    }
    case 'refresh waiter': {
      store.dispatch('setValue', {key: 'refreshWaiter', value: true})
      break
    }
  }
  console.log(message.body)
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
  })
}

export function disconnect () {
  if (stompClient !== null) {
    stompClient.disconnect()
  }
  console.log('Disconnected')
}

export function sendMessage () {
  // eslint-disable-next-line no-undef
  stompClient.send('/app/refresh', {}, JSON.stringify({message: 'bought new dish'}))
  console.log('Сообщение : ' + JSON.stringify({message: 'added new dish'}) + ' отправлено!')
  console.log(JSON.stringify({message: 'added new dish'}))
}
