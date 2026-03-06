<template>
  <div class="profile">
    <Header />
    <div class="container" v-if="user">
      <div class="profile-header card">
        <div>
          <h1 class="page-title">个人中心</h1>
          <p class="page-subtitle">欢迎，{{ user.username }}</p>
        </div>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>

      <div class="profile-grid">
        <!-- 我的收藏 -->
        <div class="card">
          <h2 class="section-title">我的收藏</h2>
          <div v-if="favorites.length === 0" class="empty">暂无收藏</div>
          <div v-else class="grid">
            <div
              v-for="item in favorites"
              :key="item.id"
              class="fav-card"
            >
              <div class="fav-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="fav-body">
                <h3 class="fav-title">{{ item.title }}</h3>
                <p class="fav-meta">{{ item.location }}</p>
                <p class="fav-tag">{{ item.tag }}</p>
                <button class="btn-primary" @click="goDetail(item.id)">查看详情</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 我的预约 -->
        <div class="card">
          <h2 class="section-title">我的预约</h2>
          <div v-if="reservations.length === 0" class="empty">暂无预约</div>
          <div v-else class="list">
            <div
              v-for="item in reservations"
              :key="item.id"
              class="reservation-item"
            >
              <div class="reservation-row">
                <span class="label">场馆</span>
                <span class="value">{{ item.venue }}</span>
              </div>
              <div class="reservation-row">
                <span class="label">日期</span>
                <span class="value">{{ item.date }}</span>
              </div>
              <div class="reservation-row">
                <span class="label">时间段</span>
                <span class="value">{{ item.timeSlot }}</span>
              </div>
              <div class="reservation-row">
                <span class="label">人数</span>
                <span class="value">{{ item.people }}</span>
              </div>
              <div class="reservation-row">
                <span class="label">联系人</span>
                <span class="value">{{ item.name }} / {{ item.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <div class="card empty-state">
        <h2>请先登录</h2>
        <p>登录后可查看个人收藏与预约</p>
        <button class="btn-primary" @click="$router.push('/login')">去登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getCurrentUser, logout } from '../utils/userDB.js'
import { getFavorites } from '../utils/favorites.js'

export default {
  name: 'Profile',
  components: { Header },
  data() {
    return {
      user: null,
      favorites: [],
      reservations: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const user = getCurrentUser()
      this.user = user
      if (!user) return
      this.favorites = getFavorites(user.id)
      this.reservations = this.getUserReservations(user.id)
    },
    getUserReservations(userId) {
      const all = JSON.parse(localStorage.getItem('reservations') || '[]')
      return all.filter(item => item.userId === userId)
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    handleLogout() {
      logout()
      window.dispatchEvent(new Event('userLoginStatusChanged'))
      this.user = null
      this.favorites = []
      this.reservations = []
      alert('已退出登录')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.profile {
  min-height: 100vh;
  background: var(--gray-light);
  padding-bottom: 40px;
}

.profile-header {
  margin: 20px 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-color);
}

.page-subtitle {
  color: var(--gray);
  margin-top: 6px;
}

.logout-btn {
  padding: 10px 16px;
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  background: var(--white);
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: var(--primary-color);
  color: var(--white);
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.empty, .empty-state {
  text-align: center;
  color: var(--gray);
}

.empty-state {
  padding: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.fav-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--white);
}

.fav-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.fav-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fav-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fav-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

.fav-meta {
  color: var(--gray);
  font-size: 13px;
}

.fav-tag {
  font-size: 12px;
  color: var(--primary-color);
}

.btn-primary {
  margin-top: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reservation-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
}

.reservation-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
}

.label {
  color: var(--gray);
}

.value {
  color: var(--text-color);
  font-weight: 600;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>

