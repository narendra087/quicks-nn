<template>
  <div
    class="task"
    :class="{
      'task--inactive': task.isCompleted,
      'task--opened': isOpen
    }"
  >
    <input class="task__status" type="checkbox" :name="`checkbox${task.id}`" :id="`checkbox${task.id}`" :checked="isInactive" @change="handleToggleTask">
    <div class="task__content">
      <div class="task__info">
        <p v-if="!task.isNew && !task.isEdit" class="task__title">{{ task.title || 'No Title' }}</p>
        <input v-if="task.isNew || task.isEdit" :value="task.title" @change="(e) => handleChangeData(e, 'title')" class="task__title-input" type="text" placeholder="Type Task Title" :name="`title${task.id}`" :id="`title${task.id}`">
        <div class="task__summary">
          <p class="task__deadline" v-if="task.date">
            <span class="task__deadline-left" v-if="!task.isCompleted">{{ differentDays >= 0 ? `${differentDays} Days Left` : 'Past deadlines!' }}</span>
            <span class="task__deadline-date">{{ dateFormat || '' }}</span></p>
          <div class="task__option">
            <div class="task__option-item task__option-item-expand" @click="() => isOpen = !isOpen">
              <ExpandIcons width="10" height="6" />
            </div>
            <div class="task__option-item task__option-item-more" @click="() => openOptions = !openOptions">
              <MoreIcons width="10" height="3" />
              <div v-if="openOptions" class="option option-more">
                <div v-if="task.isNew || task.isEdit" class="option-item option-save" @click="handleSaveTask">Save</div>
                <div v-if="!task.isNew && !task.isEdit" class="option-item option-edit" @click="handleEditTask">Edit</div>
                <div class="option-item option-delete" @click="handleDeleteTask">Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isOpen" class="task__body">
        <div class="task__body-item task__date">
          <CalendarIcons width="17" height="17" />
          <input type="date" placeholder="Set Date" name="task-date" id="task-date" class="task__date-input" :value="task.date"  @change="(e) => handleChangeData(e, 'date')">
        </div>
        <div class="task__body-item task__desc">
          <PencilIcons width="15" height="15" />
          <p class="task__desc-text" v-if="!task.isNew && !task.isEdit">{{ task.desc || 'No Description' }}</p>
          <textarea :value="task.desc" v-if="task.isNew || task.isEdit" class="task__desc-input" rows="2" placeholder="Type Description" @change="(e) => handleChangeData(e, 'desc')"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MoreIcons from '../icons/MoreIcons.vue';
  import PencilIcons from '../icons/PencilIcons.vue';
  import CalendarIcons from '../icons/CalendarIcons.vue';
  import ExpandIcons from '../icons/ExpandIcons.vue';
  
  import { useTaskStore } from '../../stores/task';
  
  export default {
    props: ['task'],
    components: {
      MoreIcons,
      PencilIcons,
      CalendarIcons,
      ExpandIcons,
    },
    data() {
      return {
        isOpen: true,
        isInactive: false,
        store: useTaskStore(),
        openOptions: false,
        taskDate: null,
      }
    },
    mounted() {
      if (this.task.isCompleted) {
        this.isOpen = false
        this.isInactive = true
      }
      
      this.taskDate = this.task.date
    },
    computed: {
      differentDays() {
        const today = new Date()
        const otherDate = new Date(this.task.date)
        
        const diffTime = (otherDate - today)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return diffDays
      },
      dateFormat() {
        if (!this.task.date) return null
        const temp = new Date(this.task.date)
        return temp.getDate() +'/'+ temp.getMonth() +'/'+ temp.getFullYear()
      }
    },
    methods: {
      handleToggleTask() {
        const index = this.store.taskData.findIndex(x => x.id === this.task.id)
        if (index != -1) {
          if (this.store.taskData[index].isCompleted) {
            this.store.taskData[index].isCompleted = false
            this.isInactive = false
          } else {
            this.store.taskData[index].isCompleted = true
            this.isInactive = true
          }
        }
      },
      handleDeleteTask() {
        const index = this.store.taskData.findIndex(x => x.id === this.task.id)
        if (index != -1) {
          this.store.taskData.splice(index, 1)
        }
      },
      handleSaveTask() {
        const index = this.store.taskData.findIndex(x => x.id === this.task.id)
        if (index != -1) {
          this.store.taskData[index].isNew = false
          this.store.taskData[index].isEdit = false
        }
      },
      handleEditTask() {
        const index = this.store.taskData.findIndex(x => x.id === this.task.id)
        if (index != -1) {
          this.store.taskData[index].isEdit = true
        }
      },
      handleChangeData(dt, target) {
        const index = this.store.taskData.findIndex(x => x.id === this.task.id)
        if (index != -1) {
          if (target === 'date') {
            this.store.taskData[index].date = dt.target.value
          }
          if (target === 'title') {
            this.store.taskData[index].title = dt.target.value
          }
          if (target === 'desc') {
            this.store.taskData[index].desc = dt.target.value
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .task {
    display: flex;
    align-items: start;
    width: 100%;
    gap: 22px;
    padding: 22px 0;
    border-bottom: 1px solid #828282;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: unset;
    }
    &__status {
      top: 5px;
    }
    &__content {
      width: 100%;
    }
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__title {
      max-width: 335px;
      font-weight: bold;
      font-size: 14px;
      line-height: 1;
      &-input {
        min-height: 40px;
        width: 100%;
        max-width: 380px;
        border-radius: 5px;
        border: 1px solid #828282;
        padding: 0 14px;
        bottom: 7px;
      }
    }
    &__summary {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    &__deadline {
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 20px;
      &-left {
        color: #EB5757;
      }
    }
    &__option {
      display: flex;
      align-items: center;
      gap: 20px;
      &-item {
        cursor: pointer;
      }
    }
    
    &__body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 17px;
      &-item {
        display: flex;
        gap: 20px ;
        &.task__desc {
          align-items: start;
          svg {
            min-width: 15px;
          }
        }
        .task__desc-text {
          font-size: 14px;
          line-height: 17px;
        }
        .task__desc-input {
          resize: none;
          width: calc(100% - 70px);
          padding: 12px;
          border-radius: 5px;
          border: 1px solid #828282;
        }
        &.task__date {
          align-items: center;
        }
        .task__date-input {
          min-height: 40px;
          min-width: 193px;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #828282;
        }
      }
    }
    
    &--inactive {
      .task__title {
        text-decoration: line-through;
      }
    }
    
    &--opened {
      .task__option-item-expand {
        svg {
          transform: rotate(180deg);
        }
      }
    }
    
    .option {
      position: absolute;
      right: 0;
      border: 1px solid #828282;
      border-radius: 5px;
      width: 126px;
      z-index: 10;
      &-item {
        height: 43px;
        padding: 18px 15px;
        font-size: 12px;
        line-height: 10px;
        border-bottom: 1px solid #828282;
        transition: all 0.3s;
        &:last-child {
          border: none;
        }
        &:hover {
          background: #e0e0e0;
        }
      }
      &-delete {
        color: #EB5757;
      }
      &-save {
        color: #2F80ED;
      }
    }
  }
</style>