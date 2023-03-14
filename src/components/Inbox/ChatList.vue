<template>
  <div class="chat"
    :class="{
      'chat__group': chat.isGroup
    }"
    @click="() => $emit('action', chat.id)"
  >
    <div class="chat__unread" v-if="!chat.isRead"></div>
    <div class="chat__icon">
      <div v-if="chat.isGroup" class="chat__icon-item chat__icon-back"><PersonIcons width="12" height="12" /></div>
      <div v-if="chat.isGroup" class="chat__icon-item chat__icon-front"><PersonIcons width="12" height="12" /></div>
      <div v-if="!chat.isGroup" class="chat__icon-item chat__icon-personal">{{ chat?.title ? chat.title[0] : '' || '' }}</div>
    </div>
    <div class="chat__content">
      <div class="chat__content-title">
        <p>{{ chat?.title || '' }}</p>
        <span>{{ chat?.date || '' }}</span>
      </div>
      <p class="chat__content-sender" v-if="chat?.sender">{{ chat?.sender }}</p>
      <p class="chat__content-text">{{ chat?.content }}</p>
    </div>
  </div>
</template>

<script>
  import PersonIcons from '../icons/PersonIcons.vue'
  export default {
    components: {
      PersonIcons
    },
    props: {
      chat: {
        required: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/partials/typhography';
  @use '../../assets/partials/colors';
  .chat {
    border-top: 1px solid #828282;
    padding: 22px 0 38px;
    margin: 0 21px;
    display: flex;
    align-items: start;
    cursor: pointer;
    position: relative;
    &:first-child {
      padding-top: 6px;
      border-top: unset;
    }
    &:hover {
      background: #FEFEFE;
    }
    &__unread {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: #EB5757;
      right: 0;
      top: 50%;
      transform: translateX(-50%);
    }
    
    &__group {
      .chat__icon {
        justify-content: unset;
      }
    }
    
    &__icon {
      position: relative;
      display: flex;
      width: 51px;
      min-width: 51px;
      margin-right: 17px;
      justify-content: center;
      &-item {
        min-width: 34px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
      }
      &-back {
        background: #E0E0E0;
      }
      &-front {
        background: #2F80ED;
        left: -17px;
      }
      &-personal {
        background: #2F80ED;
        color: #FFF;
        
      }
    }
    
    &__content {
      width: 100%;
      &-title {
        align-items: start;
        margin-bottom: 4px;
        line-height: 17px;
        display: inline-flex;
        gap: 16px;
        p {
          @include typhography.regular;
          @include typhography.ellipsis(2);
          color: #2F80ED;
          max-width: calc(100% - 130px);
        }
        span {
          @include typhography.regular-sm;
        }
      }
      
      &-sender {
        @include typhography.bold;
        margin-bottom: 4px;
      }
      &-text {
        @include typhography.regular-sm;
        @include typhography.ellipsis(2);
        line-height: 1;
        max-width: calc(100% - 100px);
      }
    }
  }
</style>