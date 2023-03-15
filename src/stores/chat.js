import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    channelList: [
      {
        id: "g1",
        title: "109220-Naturalization",
        date: "January 1,2021 19:10",
        sender: "Cameron Phillips",
        content: "Please check this out!",
        isGroup: true,
        isRead: false,
        isCS: false,
      },
      {
        id: "g2",
        title: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
        date: "02/06/2021 10:45",
        sender: "Ellen",
        content: "Hey, please read.",
        isGroup: true,
        isRead: true,
        isCS: false,
      },
      {
        id: "g3",
        title: "8405-Diana SALAZAR MUNGUIA",
        date: "01/06/2021 12:19",
        sender: "Cameron Phillips",
        content: "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
        isGroup: true,
        isRead: true,
        isCS: false,
      },
      {
        id: "p1",
        title: "FastVisa Support",
        date: "January 1,2021 19:10",
        sender: "",
        content: "Hey there! Welcome to your inbox.",
        isGroup: false,
        isRead: true,
        isCS: true,
      }
    ],
    selectedChannel: null,
    chatData: [
      {
        id: '001',
        channelId: 'g1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'You',
        body: 'No worries. It will be completed ASAP. I’ve asked him yesterday.',
        isRead: true,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '002',
        channelId: 'g1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'Mary Hilda',
        body: 'Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.',
        isRead: true,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '003',
        channelId: 'g1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'You',
        body: 'Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.',
        isRead: true,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '004',
        channelId: 'g1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'Mary Hilda',
        body: 'Sure thing, Claren',
        isRead: true,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '005',
        channelId: 'g1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'Obaidullah Amarkhil',
        body: 'Morning. I’ll try to do them. Thanks',
        isRead: false,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '006',
        channelId: 'p1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'FastVisa Support',
        body: 'Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.',
        isRead: false,
        isDeleted: false,
        isEdited: false,
      },
      {
        id: '007',
        channelId: 'p1',
        date: '14/03/2023',
        time: '19:32',
        sender: 'You',
        body: 'Hi, I need help with something can you help me ?',
        isRead: false,
        isDeleted: false,
        isEdited: false,
      },
    ]
  }),
  getters: {
    channelChat: (state) => {
      const filteredData = state.chatData.filter(x => x.channelId === state.selectedChannel.id)
      return filteredData
    },
  },
  actions: {
    sendChat() {
      console.log('sending chat...')
    }
  }
})
