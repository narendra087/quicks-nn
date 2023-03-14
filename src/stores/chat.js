import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    chatData: [
      {
        id: "g1",
        title: "109220-Naturalization",
        date: "January 1,2021 19:10",
        sender: "Cameron Phillips",
        content: "Please check this out!",
        isGroup: true,
        isRead: false
      },
      {
        id: "g2",
        title: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
        date: "02/06/2021 10:45",
        sender: "Ellen",
        content: "Hey, please read.",
        isGroup: true,
        isRead: true
      },
      {
        id: "g3",
        title: "8405-Diana SALAZAR MUNGUIA",
        date: "01/06/2021 12:19",
        sender: "Cameron Phillips",
        content: "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
        isGroup: true,
        isRead: true
      },
      {
        id: "p1",
        title: "FastVisa Support",
        date: "January 1,2021 19:10",
        sender: "",
        content: "Hey there! Welcome to your inbox.",
        isGroup: false,
        isRead: true
      }
    ]
  }),
  getters: {
    
  },
  actions: {
    sendChat() {
      console.log('sending chat...')
    }
  }
})
