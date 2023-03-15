<template>
  <div class="channel"
    :class="{
      'channel__group': channel.isGroup
    }"
    @click="() => $emit('action', channel)"
  >
    <div class="channel__unread" v-if="!channel.isRead"></div>
    <div class="channel__icon">
      <div v-if="channel.isGroup" class="channel__icon-item channel__icon-back"><PersonIcons width="12" height="12" /></div>
      <div v-if="channel.isGroup" class="channel__icon-item channel__icon-front"><PersonIcons width="12" height="12" /></div>
      <div v-if="!channel.isGroup" class="channel__icon-item channel__icon-personal">{{ channel?.title ? channel.title[0] : '' || '' }}</div>
    </div>
    <div class="channel__content">
      <div class="channel__content-title">
        <p>{{ channel?.title || '' }}</p>
        <span>{{ channel?.date || '' }}</span>
      </div>
      <p class="channel__content-sender" v-if="channel?.sender">{{ channel?.sender }}</p>
      <p class="channel__content-text">{{ channel?.content }}</p>
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
      channel: {
        required: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/partials/typhography';
  @use '../../assets/partials/colors';
  .channel {
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
      .channel__icon {
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