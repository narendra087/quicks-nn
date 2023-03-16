<template>
  <div
    class="chat__bubble"
    :class="{
      'chat__bubble-self': chat.sender === 'You',
      'chat__bubble-mary': chat.sender === 'Mary Hilda',
      'chat__bubble-obai': chat.sender === 'Obaidullah Amarkhil',
    }"
  >
    <p class="chat__bubble-name">{{ chat.sender }}</p>
    <div class="chat__bubble-body">
      <p
        class="chat__bubble-text"
        :class="{
          'chat__bubble-text--deleted': chat.isDeleted
        }"
      >
        {{ chat.isDeleted ? 'This message was deleted.' : chat.body }}
      </p>
      <p class="chat__bubble-time" v-if="!chat.isDeleted">{{ chat.time }} {{ chat.isEdited ? '(Edited)' : '' }}</p>
      <div class="chat__bubble-option" v-if="!chat.isDeleted">
        <div class="option-icon" @click="() => {showOption = !showOption}">
          <MoreIcons height="3" width="10" />
        </div>
        <div class="option" v-if="showOption">
          <div class="option-item option-item__edit" @click="handleEdit" v-if="chat.sender === 'You'">Edit</div>
          <div class="option-item option-item__delete" @click="handleDelete">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MoreIcons from '../icons/MoreIcons.vue';
  
  import { useChatStore } from '../../stores/chat'

  export default {
    props: ['chat'],
    components: {
      MoreIcons,
    },
    data() {
      return {
        showOption: false,
        store: useChatStore(),
      }
    },
    methods: {
      handleEdit() {
        this.$emit('update', this.chat)
        this.showOption = false
      },
      handleDelete() {
        const index = this.store.chatData.findIndex(x => x.id === this.chat.id)
        if (index) {
          this.store.chatData[index].isDeleted = true
        }
        
        this.showOption = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat__bubble {
    margin: 10px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &-self {
      text-align: end;
      
      .chat__bubble-body {
        margin-left: auto;
        background: #EEDCFF;
        .chat__bubble-name {
          color: #9B51E0;
        }
        .chat__bubble-option {
          left: -18px;
          right: unset;
        }
      }
    }
    &-mary{
      .chat__bubble-name {
        color: #E5A443;
      }
      .chat__bubble-body {
        background: #FCEED3;
      }
    }
    &-obai {
      .chat__bubble-name {
        color: #43B78D;
      }
      .chat__bubble-body {
        background: #D2F2EA;
      }
    }
    
    &-name {
      font-size: 12px;
      line-height: 1;
      margin-bottom: 4px;
      font-weight: bold;
    }
    &-body {
      text-align: start;
      max-width: 65%;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      background: #F8F8F8;
    }
    &-option {
      position: absolute;
      top: -10px;
      right: -18px;
      cursor: pointer;
    }
    &-text {
      margin-bottom: 25px;
      &--deleted {
        font-style: italic;
        margin: 0;
      }
    }
    &-time {
      font-size: 14px;
      line-height: 1;
      position: absolute;
      bottom: 10px;
    }
    
    .option {
      position: absolute;
      min-width: 126px;
      border-radius: 5px;
      border: 1px solid #BDBDBD;
      background: #FFF;
      z-index: 20;
      &-item {
        height: 40px;
        padding: 0 18px;
        border-bottom: 1px solid #BDBDBD;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        &:hover {
          background: #E0E0E0;
        }
        &:last-child {
          border: none;
        }
        
        &__edit {
          color: #2F80ED;
        }
        &__delete {
          color: #EB5757;
        }
      }
    }
  }
</style>