<template>
  <div class="modal">
    <div v-if="isLoading" class="modal__loading">
      <LoadingIcons width="85" height="85" />
      <span>Loading Chats...</span>
    </div>
    <div class="modal__container">
      <div class="modal__header">
        <div class="modal__header-list" v-if="!activeChat">
          <input class="modal__search" placeholder="Search" type="text">
          <SearchIcons class="modal__search-icon" width="12" height="12" />
        </div>
        <div class="modal__header-chat" v-else>
          <ArrowBackIcons width="16" height="16" />
        </div>
      </div>
      <div class="modal__body">
        <div class="modal__body-container" v-if="!isLoading && !activeChat">
          <ChatList v-for="chat in store.chatData" :key="chat.id" :chat="chat" @action="setActiveChat" />
        </div>
        <div class="modal__body-container" v-else-if="!isLoading && activeChat">
          
        </div>
      </div>
      <div class="modal__footer"></div>
    </div>
  </div>
</template>

<script>
  import SearchIcons from './icons/SearchIcons.vue'
  import LoadingIcons from './icons/LoadingIcons.vue'
  import ArrowBackIcons from './icons/ArrowBackIcons.vue'
  
  import ChatList from './Inbox/ChatList.vue'
  
  import { useChatStore } from '../stores/chat'

  export default {
    name: 'InboxModal',
    components: {
      SearchIcons,
      LoadingIcons,
      ArrowBackIcons,
      ChatList,
    },
    data() {
      return {
        isLoading: true,
        store: useChatStore(),
        activeChat: null,
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000);
    },
    methods: {
      setActiveChat(id) {
        console.log(id)
        this.activeChat = id
      }
    },
  }
</script>

<style lang="scss">
  .chat__icon-back {
    svg path {
      fill: #000;
    }
  }
</style>

<style lang="scss" scoped>
  @use '../assets/partials/typhography';
  @use '../assets/partials/colors';
  .modal {
    border: 1px solid #BDBDBD;
    background: #FFF;
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    bottom: 83px;
    max-width: 40vw;
    max-height: 68vh;
    
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #FFF;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(189, 189, 189, 0.5);
      border-radius: 4px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #BDBDBD;
    }
    
    &__header {
      padding: 20px 34px;
      position: relative;
    }
    
    &__search {
      height: 32px;
      width: 100%;
      padding: 10px 59px;
      border-radius: 5px;
      border: 1px solid #828282;
      
      &-icon {
        position: absolute;
        right: 93px;
        top: 10px;
      }
    }
    
    &__body {
      position: relative;
      padding: 0 12px;
      &-container {
        height: calc(68vh - 92px);
        overflow: auto;
      }
    }
    
    &__loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
    }
  }
</style>