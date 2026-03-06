<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🏛️</span>
          <span class="logo-text">广东文化遗产博物馆</span>
        </div>
        <nav class="nav">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </nav>
        <div class="header-actions">
          <span v-if="!isLoggedIn" class="login-btn" @click="$router.push('/login')">登录</span>
          <div v-else class="user-menu">
            <span class="user-info">{{ username }}</span>
            <button class="profile-btn" @click="$router.push('/profile')">个人中心</button>
            <button class="logout-btn" @click="handleLogout">退出</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getCurrentUser, logout, isLoggedIn } from '../utils/userDB.js'

export default {
  name: 'Header',
  data() {
    return {
      navItems: [
        { path: '/', name: '首页' },
        { path: '/category', name: '分类浏览' },
        { path: '/virtual-tour', name: '虚拟游览' },
        { path: '/reservation', name: '参观预约' },
        { path: '/community', name: '互动社区' }
      ],
      isLoggedIn: false,
      username: ''
    }
  },
  mounted() {
    this.checkLoginStatus()
    // 监听路由变化，更新登录状态
    this.$watch(() => this.$route.path, () => {
      this.checkLoginStatus()
    })
    // 监听localStorage变化（跨标签页同步）
    window.addEventListener('storage', this.checkLoginStatus)
    // 监听自定义事件（同标签页内同步）
    window.addEventListener('userLoginStatusChanged', this.checkLoginStatus)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkLoginStatus)
    window.removeEventListener('userLoginStatusChanged', this.checkLoginStatus)
  },
  methods: {
    checkLoginStatus() {
      const user = getCurrentUser()
    if (user) {
      this.isLoggedIn = true
        this.username = user.username
      } else {
        this.isLoggedIn = false
        this.username = ''
    }
  },
    handleLogout() {
      if (confirm('确定要退出登录吗？')) {
        logout()
        this.isLoggedIn = false
        this.username = ''
        // 触发事件通知其他组件
        window.dispatchEvent(new Event('userLoginStatusChanged'))
        // 如果当前在需要登录的页面，跳转到首页
        if (this.$route.path === '/community' || this.$route.path === '/reservation') {
          this.$router.push('/')
        }
        alert('已退出登录')
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
}

.logo-icon {
  font-size: 28px;
  margin-right: 10px;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: var(--text-color);
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login-btn {
  color: var(--primary-color);
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
}

.profile-btn {
  background: none;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

.logout-btn {
  background: none;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: var(--primary-color);
  color: var(--white);
}
</style>










