<template>
  <div class="modal">
    <div v-if="isLoading" class="modal__loading">
      <LoadingIcons width="85" height="85" />
      <span>Loading Chats...</span>
    </div>
    <div class="modal__container">
      <div class="modal__header">
        <div class="modal__header-channel" v-if="!activeChannel">
          <input class="modal__search" placeholder="Search" type="text">
          <SearchIcons class="modal__search-icon" width="12" height="12" />
        </div>
        <div class="modal__header-chat" v-else>
          <div class="modal__back-icon" @click="() => setActiveChannel(null)">
            <ArrowBackIcons width="16" height="16" />
          </div>
          <div class="modal__header-title">
            <p class="modal__header-title-text">{{ store.selectedChannel.title }}</p>
            <p class="modal__header-participant">3 participants</p>
          </div>
          <div class="modal__close-icon" @click="() => $emit('toggleMenu', 'inbox')">
            <CloseIcons width="14" height="14" />
          </div>
        </div>
      </div>
      <div
        class="modal__body"
        :class="{
          'modal__body-chat': activeChannel
        }"
      >
        <div class="modal__body-container" v-if="!isLoading && !activeChannel">
          <ChannelCard v-for="channel in store.channelList" :key="channel.id" :channel="channel" @action="setActiveChannel" />
        </div>
        <ChatContainer v-if="!isLoading && activeChannel" />
      </div>
    </div>
  </div>
</template>

<script>
  import SearchIcons from './icons/SearchIcons.vue'
  import LoadingIcons from './icons/LoadingIcons.vue'
  import ArrowBackIcons from './icons/ArrowBackIcons.vue'
  import CloseIcons from './icons/CloseIcons.vue'
  
  import ChannelCard from './Inbox/ChannelCard.vue'
  import ChatContainer from './Inbox/ChatContainer.vue'
  
  import { useChatStore } from '../stores/chat'

  export default {
    name: 'InboxModal',
    components: {
      SearchIcons,
      LoadingIcons,
      ArrowBackIcons,
      CloseIcons,
      ChannelCard,
      ChatContainer,
    },
    data() {
      return {
        isLoading: true,
        store: useChatStore(),
        activeChannel: null,
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000);
    },
    methods: {
      setActiveChannel(data) {
        this.activeChannel = data
        this.store.selectedChannel = data
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
    width: 734px;
    height: 100%;
    bottom: 83px;
    max-width: calc(100vw - 54px);
    max-height: calc(100vh - 127px);
    border-radius: 5px;
    
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
      &-chat {
        display: flex;
        align-items: center;
        gap: 18px;
        svg {
          cursor: pointer;
        }
      }
      &-title {
        width: 100%;
        &-text {
          @include typhography.ellipsis(1);
          font-weight: bold;
          color: #2F80ED;
        }
      }
      &-participant {
        @include typhography.regular-xs;
        line-height: 10px;
        margin-top: 9px;
        color: #333;
      }
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
        height: calc(100vh - 200px);
        overflow: auto;
      }
      &-chat {
        border-top: 1px solid #BDBDBD;
        padding: 13.5px 20px 20px;
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