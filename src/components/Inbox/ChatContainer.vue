<template>
  <div class="chat">
    <div
      class="chat__container"
      :class="{
        'chat__container-connecting': isConnecting || (store.selectedChannel.isCS && isConnectingCS)
      }"
      id="chat__container"
    >
      <ChatBubble v-for="chat in readList" :key="chat.id" :chat="chat" @update="handleEdit" />
      <div class="chat__unread-divider" v-if="unreadList.length > 0">
        <hr>
        <p>New Message</p>
        <hr>
      </div>
      <ChatBubble v-for="chat in unreadList" :key="chat.id" :chat="chat" @update="handleEdit" />
    </div>
    <div class="chat__footer">
      <div class="chat__footer-edited" v-if="isEditing">
        <div class="chat__footer-edited-close" @click="handleCancelEdit">
          <CloseIcons width="12" height="12" />
        </div>
        <p class="chat__footer-edited-title">Edit:</p>
        <p class="chat__footer-edited-body">{{ editedChat.body }}</p>
      </div>
      <div class="chat__footer-connect" v-if="isConnecting || (store.selectedChannel.isCS && isConnectingCS)">
        <LoadingIcons width="18" height="18" />
        <p>Please wait while we connect you with one of our team ...</p>
      </div>
      <div class="chat__footer-input">
        <input class="chat__box" placeholder="Type a new message" type="text" v-model="chatBody">
        <button class="chat__send btn btn-primary" @click="handleSendChat">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingIcons from '../icons/LoadingIcons.vue'
  import CloseIcons from '../icons/CloseIcons.vue'

  import ChatBubble from '../Inbox/ChatBubble.vue'
  
  import { useChatStore } from '../../stores/chat'
  
  export default {
    components: {
      LoadingIcons,
      CloseIcons,
      ChatBubble,
    },
    data() {
      return {
        store: useChatStore(),
        chatBody: '',
        isConnecting: false,
        isConnectingCS: true,
        isEditing: false,
        editedChat: null,
      }
    },
    computed: {
      readList() {
        const list = this.store.channelChat.filter(x => x.isRead === true)
        return list
      },
      unreadList() {
        const list = this.store.channelChat.filter(x => x.isRead === false)
        return list
      },
    },
    mounted() {
      this.handleScrollContainer()
    },
    methods: {
      handleScrollContainer() {
        const elm = document.getElementById('chat__container')
        if (elm) {
          this.$nextTick(() => {
            elm.scrollTo({
              top: elm.scrollHeight
            })
          })
        }
      },
      handleSendChat() {
        if (!this.chatBody) return
        
        const tempData = {
          id: Math.floor(Math.random() * 1000),
          channelId: this.store.selectedChannel.id,
          date: Date.now(),
          time: '19:32',
          sender: 'You',
          body: this.chatBody,
          isRead: true,
        }
        
        // Remove new message status
        this.unreadList.forEach((msg) => {
          const indexMsg = this.store.chatData.findIndex(x => x.id === msg.id)
          if (indexMsg != -1) {
            this.store.chatData[indexMsg].isRead = true
          }
        })
        
        // Remove dot unread channel
        const indexChannel = this.store.channelList.findIndex(x => x.id === this.store.selectedChannel.id)
        console.log(indexChannel)
        if (indexChannel != -1) {
          this.store.channelList[indexChannel].isRead = true
        }
        
        if (this.isEditing) {
          const indexEdited = this.store.chatData.findIndex(x => x.id === this.editedChat.id)
          if (indexEdited != -1) {
            this.store.chatData[indexEdited].body = this.chatBody
            this.store.chatData[indexEdited].isEdited = true
          }
        } else {
          this.store.chatData = [...this.store.chatData, tempData]
        }
        
        this.chatBody = ''
        this.editedChat = null
        this.isEditing = false
        
        this.handleScrollContainer()
      },
      handleEdit(data) {
        if (!data) return
        this.isEditing = true
        this.editedChat = data
        this.chatBody = data.body
      },
      handleCancelEdit() {
        this.isEditing = false
        this.editedChat = null
        this.chatBody = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat {
    &__container {
      height: calc(100vh - 312px);
      overflow-x: hidden;
      overflow-y: auto;
      &-connecting {
        height: calc(100vh - 375px);
      }
    }
    
    &__unread-divider {
      display: flex;
      align-items: center;
      gap: 15px;
      p {
        width: 30%;
        text-align: center;
        color: #EB5757;
      }
      hr {
        width: 35%;
        border-color: #EB5757;
        border-top: 0;
      }
    }
    
    &__footer {
      display: flex;
      flex-direction: column;
      gap: 11px;
      padding-top: 25px;
      &-input {
        display: flex;
        gap: 13px;
        z-index: 40;
      }
      &-connect {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 14px;
        background: #E9F3FF;
        svg {
          margin: 0 !important;
          background: transparent !important;
        }
      }
      &-edited {
        position: absolute;
        height: 100px;
        bottom: 35px;
        background: #F2F2F2;
        border-radius: 5px 5px 0 0;
        padding: 15px 20px;
        width: calc(100% - 89px);
        z-index: 30;
        &-close {
          position: absolute;
          top: 15px;
          right: 20px;
          cursor: pointer;
        }
        &-title {
          font-size: 14px;
          font-weight: bold;
          width: fit-content;
        }
        &-body {
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
    &__box {
      height: 40px;
      padding: 0 16px;
      width: 100%;
      border: 1px solid #828282;
      border-radius: 5px;
    }
    &__send {
      max-width: 76px;
      width: 100%;
    }
  }
</style>