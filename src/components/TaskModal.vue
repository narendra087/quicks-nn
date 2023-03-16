<template>
  <div class="modal">
    <div v-if="isLoading" class="modal__loading">
      <LoadingIcons width="85" height="85" />
      <span>Loading Task List...</span>
    </div>
    <div class="modal__container">
      <div class="modal__header">
        <div class="modal__category" id="">
          <div class="task-category" @click="() => showCategory = !showCategory">
            <p>{{ activeCategory }}</p>
            <ExpandIcons width="10" height="6" />
          </div>
          <div v-if="showCategory" class="task-category__option">
            <div v-for="(category, index) in filteredCategory" :key="index" class="task-category__option-item" @click="() => handleChangeCategory(category)">{{ category }}</div>
          </div>
        </div>
        <button class="btn btn-primary" @click="handleNewTask">New Task</button>
      </div>
      <div class="modal__body" v-if="!isLoading">
        <div class="modal__body-container" id="task__container">
          <TaskCard v-for="task in filteredTask" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ExpandIcons from './icons/ExpandIcons.vue'
  import LoadingIcons from './icons/LoadingIcons.vue'
  
  import { useTaskStore } from '../stores/task'
  
  import TaskCard from './Task/TaskCard.vue'

  export default {
    name: 'TaskModal',
    components: {
      ExpandIcons,
      LoadingIcons,
      TaskCard,
    },
    data() {
      return {
        isLoading: true,
        store: useTaskStore(),
        categoryList: [
          'My Tasks',
          'Personal Errands',
          'Urgent To-Do'
        ],
        activeCategory: 'My Tasks',
        showCategory: false,
      }
    },
    computed: {
      filteredTask() {
        if (this.activeCategory) {
          return this.store.taskData.filter(x => x.category.includes(this.activeCategory))
        } else {
          return this.store.taskData
        }
      },
      filteredCategory() {
        return this.categoryList.filter(x => x != this.activeCategory)
      }
    },
    mounted() {
      this.cancelLoading()
    },
    methods: {
      cancelLoading() {
        setTimeout(() => {
          this.isLoading = false
        }, 500);
      },
      handleNewTask() {
        const data = {
          id: Math.floor(Math.random() * 1000),
          title: '',
          date: '',
          desc: '',
          isCompleted: false,
          isNew: true,
          isEdit: false,
          category: ['My Tasks']
        }
        
        this.store.taskData = [...this.store.taskData, data]
        
        if (this.activeCategory !== 'My Tasks') {
          this.handleChangeCategory('My Tasks')
          setTimeout(() => {
            this.handleScrollContainer()
          }, 800);
        } else {
          this.handleScrollContainer()
        }
        
      },
      handleScrollContainer() {
        const elm = document.getElementById('task__container')
        console.log(elm)
        if (elm) {
          this.$nextTick(() => {
            elm.scrollTo({
              top: elm.scrollHeight,
              behavior: 'smooth'
            })
          })
        }
      },
      handleChangeCategory(value) {
        this.isLoading = true
        this.activeCategory = value
        this.showCategory = false
        this.cancelLoading()
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
      padding: 20px 20px 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    &__body {
      position: relative;
      padding: 0 12px 24px;
      &-container {
        height: calc(100vh - 228px);
        padding: 0 16px;
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
    
    .task-category {
      min-height: 40px;
      margin-left: 90px;
      border-radius: 5px;
      border: 1px solid #828282;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      p {
        min-width: 118px;
        padding-right: 10px;
        pointer-events: none;
      }
      &__option {
        position: absolute;
        top: 55px;
        left: 0;
        width: 288px;
        border: 1px solid #828282;
        border-radius: 5px;
        background: #FFF;
        z-index: 20;
        &-item {
          padding: 15px;
          transition: all 0.3s;
          cursor: pointer;
          &:hover {
            background: #e0e0e0;
          }
          &:not(:last-child) {
            border-bottom: 1px solid #828282;
          }
        }
      }
    }
  }
</style>