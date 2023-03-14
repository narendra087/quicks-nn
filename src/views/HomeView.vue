<template>
  <main>
    <div
      class="menu"
      :class="{
        'menu--show': showMenu,
        'menu--selected': activeMenu != null
      }"
    >
    <div class="menu__list">
      <div
        class="menu__item menu__item-task"
        :class="{
          'menu__item--active': activeMenu === 'task'
        }"
        @click="() => toggleActiveMenu('task')"
      >
        <span class="menu__item-label">Task</span>
        <div class="menu__item-icon">
          <TaskIcons :width="`${ activeMenu == 'task' ? 30 : 27 }`" :height="`${ activeMenu == 'task' ? 30 : 27 }`" />
        </div>
        <div class="menu__item-overlay"></div>
      </div>
      <div
        class="menu__item menu__item-inbox"
        :class="{
          'menu__item--active': activeMenu === 'inbox'
        }"
        @click="() => toggleActiveMenu('inbox')"
      >
        <span class="menu__item-label">Inbox</span>
        <div class="menu__item-icon">
          <InboxIcons :width="`${ activeMenu == 'inbox' ? 30 : 27 }`" :height="`${ activeMenu == 'inbox' ? 30 : 27 }`" />
        </div>
        <div class="menu__item-overlay"></div>
      </div>
    </div>
      <div class="menu__toggle" @click="toggleMenu">
        <MenuIcons class="" width="56" height="56" />
      </div>
    </div>
  </main>
</template>

<script>
  import MenuIcons from '../components/icons/MenuIcons.vue'
  import InboxIcons from '../components/icons/InboxIcons.vue'
  import TaskIcons from '../components/icons/TaskIcons.vue'
  
  export default {
    components: {
      MenuIcons,
      InboxIcons,
      TaskIcons,
    },
    data() {
      return {
        showMenu: false,
        activeMenu: null,
      }
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu
      },
      toggleActiveMenu(menu) {
        if (!this.showMenu) return
        if (this.activeMenu === menu) {
          this.activeMenu = null
        } else {
          this.activeMenu = menu
        }
      }
    }
  }
</script>

<style lang="scss">
  @use '../assets/partials/colors';
  
  .menu {
    &__item {
      &-task {
        svg path {
          fill: map-get(colors.$colors, 'indicator', '100');
        }
      }
      &-inbox {
        svg path {
          fill: map-get(colors.$colors, 'indicator', '200');
        }
      }
      
      &--active {
        svg path {
          fill: #FFF;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  @use '../assets/partials/colors';

  main {
    min-height: calc(100vh - 68px);
  }

  .menu {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 26px;
    
    &--show {
      .menu__list {
        opacity: 1;
        right: 94px;
      }
      .menu__item-icon {
        cursor: pointer;
      }
    }
    
    &--selected {
      .menu__toggle {
        display: none;
      }
      .menu__list {
        right: 0;
        align-items: end;
      }
      .menu__item-label {
        display: none;
      }
    }
    
    &__list {
      transition: all 0.3s;
      align-items: center;
      position: absolute;
      display: flex;
      right: 0;
      bottom: 0;
      opacity: 0;
      gap: 26px;
      z-index: 0;
    }
    
    &__item {
      flex-direction: column;
      transition: all 0.3s;
      align-items: center;
      position: relative;
      display: flex;
      gap: 12px;
      &-label {
        color: #F2F2F2;
      }
      &-icon {
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 1;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        background: #F2F2F2;
      }
      &-overlay {
        background: map-get(colors.$colors, 'primary', '200');
        transition: all 0.3s;
        position: absolute;
        right: 0;
        bottom: 0;
        opacity: 0;
        width: 60px;
        height: 60px;
        border-radius: 100%;
      }
      
      &--active {
        bottom: -2px;
        &.menu__item-inbox .menu__item-icon {
          background: map-get(colors.$colors, 'indicator', '200');
        }
        &.menu__item-task .menu__item-icon {
          background: map-get(colors.$colors, 'indicator', '100');
        }
        .menu__item-icon {
          width: 68px;
          height: 68px;
        }
        .menu__item-overlay {
          opacity: 1;
          width: 68px;
          right: 15px;
          height: 68px;
        }
      }
    }
    
    &__toggle {
      background: map-get(colors.$colors, 'primary', '100');
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;
      display: flex;
      z-index: 10;
      width: 68px;
      height: 68px;
      border-radius: 100%;
    }
  }
</style>