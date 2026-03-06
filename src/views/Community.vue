<template>
  <div class="community">
    <Header />
    
    <div class="container">
      <div class="community-header">
        <h1 class="page-title">互动社区</h1>
        <p class="page-subtitle">分享您的文化之旅，与大家交流心得</p>
      </div>

      <!-- Post Form -->
      <div class="post-form-section">
        <div class="post-form card">
          <h2 class="form-title">分享您的见闻</h2>
          <form @submit.prevent="addPost" class="community-form">
            <div class="form-row">
              <input 
                type="text" 
                v-model="newPost.title"
                placeholder="标题"
                class="form-input"
                required
              />
              <select v-model="newPost.heritage" class="form-select">
                <option value="">选择相关文化遗产</option>
                <option value="陈家祠">陈家祠</option>
                <option value="开平碉楼">开平碉楼</option>
                <option value="光孝寺">光孝寺</option>
                <option value="潮州古城">潮州古城</option>
                <option value="肇庆古城墙">肇庆古城墙</option>
                <option value="梅州松口古镇">梅州松口古镇</option>
                <option value="韶关南华禅寺">韶关南华禅寺</option>
                <option value="中山孙中山故居纪念馆">中山孙中山故居纪念馆</option>
                <option value="清远连南千年瑶寨">清远连南千年瑶寨</option>
                <option value="湛江雷州古城">湛江雷州古城</option>
                <option value="汕头澄海前美古村侨文化旅游区">汕头澄海前美古村侨文化旅游区</option>
                <option value="河源佗城古镇">河源佗城古镇</option>
                <option value="云浮国恩寺">云浮国恩寺</option>
                <option value="汕尾玄武山元山寺">汕尾玄武山元山寺</option>
                <option value="深圳大鹏所城">深圳大鹏所城</option>
                <option value="惠州惠州西湖">惠州惠州西湖</option>
                <option value="东莞东莞可园">东莞东莞可园</option>
                <option value="汕头达濠古城">汕头达濠古城</option>
                <option value="揭阳双峰寺">揭阳双峰寺</option>
                <option value="阳江阳春崆峒岩">阳江阳春崆峒岩</option>
              </select>
            </div>
            <textarea 
              v-model="newPost.content"
              placeholder="分享您的见闻和感受..."
              class="form-textarea"
              rows="4"
              required
            ></textarea>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">发布</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Posts List -->
      <div class="posts-section">
        <div class="posts-header">
          <h2 class="section-title-small">最新动态</h2>
          <div class="sort-options">
            <button 
              class="sort-btn"
              :class="{ active: sortBy === 'time' }"
              @click="sortBy = 'time'"
            >
              最新
            </button>
            <button 
              class="sort-btn"
              :class="{ active: sortBy === 'likes' }"
              @click="sortBy = 'likes'"
            >
              最热
            </button>
          </div>
        </div>

        <transition-group name="post-list" tag="div" class="posts-list">
          <div 
            v-for="post in sortedPosts" 
            :key="post.id"
            class="post-card card"
          >
            <div class="post-header">
              <div class="post-author">
                <div class="author-avatar">{{ post.author.charAt(0) }}</div>
                <div class="author-info">
                  <div class="author-name">{{ post.author }}</div>
                  <div class="post-time">{{ formatTime(post.time) }}</div>
                </div>
              </div>
              <button 
                v-if="post.author === currentUser"
                class="delete-btn"
                @click="deletePost(post.id)"
              >
                删除
              </button>
            </div>
            
            <div class="post-tags">
              <span class="post-tag" v-if="post.heritage">{{ post.heritage }}</span>
            </div>
            
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-content">{{ post.content }}</p>
            
            <div class="post-footer">
              <div class="post-actions">
                <button 
                  class="action-btn"
                  :class="{ liked: post.liked }"
                  @click="toggleLike(post.id)"
                >
                  <span class="action-icon">❤️</span>
                  <span>{{ post.likes }}</span>
                </button>
                <button class="action-btn" @click="toggleComments(post.id)">
                  <span class="action-icon">💬</span>
                  <span>{{ post.comments.length }}</span>
                </button>
              </div>
            </div>

            <!-- Comments Section -->
            <transition name="slide-down">
              <div v-if="post.showComments" class="comments-section">
                <div class="comments-list">
                  <div 
                    v-for="comment in post.comments" 
                    :key="comment.id"
                    class="comment-item"
                  >
                    <div class="comment-author">{{ comment.author }}:</div>
                    <div class="comment-content">{{ comment.content }}</div>
                    <button 
                      v-if="comment.author === currentUser"
                      class="comment-delete"
                      @click="deleteComment(post.id, comment.id)"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <form @submit.prevent="addComment(post.id)" class="comment-form">
                  <input 
                    type="text" 
                    v-model="commentInputs[post.id]"
                    placeholder="写下您的评论..."
                    class="comment-input"
                    required
                  />
                  <button type="submit" class="comment-submit">评论</button>
                </form>
              </div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Community',
  components: {
    Header
  },
  data() {
    return {
      currentUser: '游客',
      sortBy: 'time',
      newPost: {
        title: '',
        content: '',
        heritage: ''
      },
      commentInputs: {},
      posts: [
        {
          id: 1,
          author: '文化爱好者',
          time: new Date('2024-01-15'),
          title: '陈家祠的建筑艺术令人叹为观止',
          content: '今天参观了陈家祠，被其精美的木雕、石雕和陶塑深深震撼。每一处细节都体现了岭南建筑艺术的精湛技艺。',
          heritage: '陈家祠',
          likes: 45,
          liked: false,
          showComments: false,
          comments: [
            { id: 1, author: '游客A', content: '我也去过，确实很震撼！', time: new Date('2024-01-16') },
            { id: 2, author: '游客B', content: '推荐大家一定要去看看', time: new Date('2024-01-17') }
          ]
        },
        {
          id: 2,
          author: '历史探索者',
          time: new Date('2024-01-10'),
          title: '开平碉楼的中西合璧之美',
          content: '开平碉楼融合了中西方建筑风格，每一座碉楼都有其独特的故事。这是华侨文化的珍贵见证。',
          heritage: '开平碉楼',
          likes: 78,
          liked: true,
          showComments: false,
          comments: [
            { id: 1, author: '游客C', content: '世界文化遗产，值得一游', time: new Date('2024-01-11') }
          ]
        },
        {
          id: 3,
          author: '文化探索者',
          time: new Date('2024-01-08'),
          title: '潮州古城的千年韵味',
          content: '漫步在潮州古城的街道上，仿佛穿越回了明清时期。古建筑保存完好，文化氛围浓厚。',
          heritage: '潮州古城',
          likes: 32,
          liked: false,
          showComments: false,
          comments: []
        }
      ],
      nextPostId: 4,
      nextCommentId: 3
    }
  },
  computed: {
    sortedPosts() {
      const posts = [...this.posts]
      if (this.sortBy === 'time') {
        return posts.sort((a, b) => b.time - a.time)
      } else {
        return posts.sort((a, b) => b.likes - a.likes)
      }
    }
  },
  mounted() {
    // 检查登录状态
    const user = localStorage.getItem('user')
    if (user) {
      this.currentUser = JSON.parse(user).username
    }
    
    // 使用jQuery实现动态效果
    if (window.$) {
      $(document).ready(() => {
        $('.post-card').each(function(index) {
          $(this).css('animation-delay', (index * 0.1) + 's')
        })
      })
    }
  },
  methods: {
    addPost() {
      if (!this.newPost.title || !this.newPost.content) return
      
      const post = {
        id: this.nextPostId++,
        author: this.currentUser,
        time: new Date(),
        title: this.newPost.title,
        content: this.newPost.content,
        heritage: this.newPost.heritage,
        likes: 0,
        liked: false,
        showComments: false,
        comments: []
      }
      
      this.posts.unshift(post)
      this.newPost = { title: '', content: '', heritage: '' }
    },
    deletePost(postId) {
      const index = this.posts.findIndex(p => p.id === postId)
      if (index > -1) {
        this.posts.splice(index, 1)
      }
    },
    toggleLike(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.liked = !post.liked
        post.likes += post.liked ? 1 : -1
      }
    },
    toggleComments(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.showComments = !post.showComments
      }
    },
    addComment(postId) {
      const commentText = this.commentInputs[postId]
      if (!commentText) return
      
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.comments.push({
          id: this.nextCommentId++,
          author: this.currentUser,
          content: commentText,
          time: new Date()
        })
        this.commentInputs[postId] = ''
      }
    },
    deleteComment(postId, commentId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        const index = post.comments.findIndex(c => c.id === commentId)
        if (index > -1) {
          post.comments.splice(index, 1)
        }
      }
    },
    formatTime(time) {
      const now = new Date()
      const diff = now - time
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (days === 0) return '今天'
      if (days === 1) return '昨天'
      if (days < 7) return `${days}天前`
      return time.toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.community {
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
  background-color: var(--gray-light);
}

.community-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.page-subtitle {
  font-size: 18px;
  color: var(--gray);
}

/* Post Form */
.post-form-section {
  margin-bottom: 40px;
}

.post-form {
  padding: 30px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-color);
}

.community-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
}

.form-input,
.form-select {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-textarea {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-actions {
  text-align: right;
}

/* Posts Section */
.posts-section {
  max-width: 900px;
  margin: 0 auto;
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title-small {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-color);
}

.sort-options {
  display: flex;
  gap: 10px;
}

.sort-btn {
  padding: 8px 20px;
  border: 1px solid var(--border-color);
  background-color: var(--white);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.sort-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.sort-btn.active {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  padding: 25px;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #4ecdc4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.author-name {
  font-weight: 600;
  color: var(--text-color);
}

.post-time {
  font-size: 12px;
  color: var(--gray);
}

.delete-btn {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

.post-tags {
  margin-bottom: 10px;
}

.post-tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--gray-light);
  border-radius: 12px;
  font-size: 12px;
  color: var(--text-color);
}

.post-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.post-content {
  color: var(--text-color);
  line-height: 1.8;
  margin-bottom: 15px;
}

.post-footer {
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}

.post-actions {
  display: flex;
  gap: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background-color: var(--gray-light);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.action-btn:hover {
  background-color: var(--border-color);
}

.action-btn.liked {
  background-color: #ffe5e5;
  color: var(--primary-color);
}

.action-icon {
  font-size: 16px;
}

/* Comments */
.comments-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.comments-list {
  margin-bottom: 15px;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background-color: var(--gray-light);
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
}

.comment-author {
  font-weight: 600;
  color: var(--primary-color);
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  color: var(--text-color);
}

.comment-delete {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 6px;
}

.comment-form {
  display: flex;
  gap: 10px;
}

.comment-input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.comment-submit {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.comment-submit:hover {
  background-color: #a00d25;
}

/* Transitions */
.post-list-enter-active {
  transition: all 0.5s ease;
}

.post-list-leave-active {
  transition: all 0.3s ease;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>

