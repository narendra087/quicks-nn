import { defineStore } from 'pinia'

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    taskData: [
      {
        id: '001',
        title: 'Close off Case #012920- RODRIGUES, Amiguel',
        date: '2023-06-12',
        desc: 'Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!',
        status: 'active',
        isNew: false,
        isEdit: false,
        category: ['My Tasks', 'Personal Errands'],
      },
      {
        id: '002',
        title: 'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203',
        date: '2023-06-14',
        desc: 'All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.',
        status: 'active',
        isNew: false,
        isEdit: false,
        category: ['My Tasks', 'Urgent To-Do', 'Personal Errands'],
      },
      {
        id: '003',
        title: 'Set up appointment with Dr Blake',
        date: '2023-06-22',
        desc: '',
        status: 'active',
        isNew: false,
        isEdit: false,
        category: ['My Tasks', 'Urgent To-Do'],
      },
      {
        id: '004',
        title: 'Contact Mr Caleb - video conference?',
        date: '2023-06-03',
        desc: '',
        status: 'inactive',
        isNew: false,
        isEdit: false,
        category: ['My Tasks', 'Urgent To-Do'],
      },
      {
        id: '005',
        title: 'Assign 3 homework to Client A',
        date: '2023-06-02',
        desc: '',
        status: 'inactive',
        isNew: false,
        isEdit: false,
        category: ['My Tasks'],
      }
    ]
  }),
  getters: {
    
  },
  actions: {
    addTask() {
      
    },
    deleteTask() {
      
    }
  }
})
