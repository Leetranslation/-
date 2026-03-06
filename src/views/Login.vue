<template>
  <div class="login">
    <Header />
    
    <div class="login-container">
      <div class="login-box card">
        <div class="login-header">
          <h1 class="login-title">{{ isLogin ? '用户登录' : '用户注册' }}</h1>
          <p class="login-subtitle">{{ isLogin ? '欢迎回来' : '创建新账号' }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">
          <!-- Username -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">👤</span>
              用户名 *
            </label>
            <input 
              type="text" 
              v-model="formData.username"
              class="form-input"
              :class="{ error: errors.username }"
              placeholder="请输入用户名"
              @blur="validateField('username')"
            />
            <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🔒</span>
              密码 *
            </label>
            <input 
              type="password" 
              v-model="formData.password"
              class="form-input"
              :class="{ error: errors.password }"
              placeholder="请输入密码"
              @blur="validateField('password')"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <!-- Confirm Password (Register only) -->
          <div v-if="!isLogin" class="form-group">
            <label class="form-label">
              <span class="label-icon">🔒</span>
              确认密码 *
            </label>
            <input 
              type="password" 
              v-model="formData.confirmPassword"
              class="form-input"
              :class="{ error: errors.confirmPassword }"
              placeholder="请再次输入密码"
              @blur="validateField('confirmPassword')"
            />
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <!-- Email (Register only) -->
          <div v-if="!isLogin" class="form-group">
            <label class="form-label">
              <span class="label-icon">📧</span>
              邮箱 *
            </label>
            <input 
              type="email" 
              v-model="formData.email"
              class="form-input"
              :class="{ error: errors.email }"
              placeholder="请输入邮箱地址"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <!-- Phone (Register only) -->
          <div v-if="!isLogin" class="form-group">
            <label class="form-label">
              <span class="label-icon">📱</span>
              手机号 *
            </label>
            <input 
              type="tel" 
              v-model="formData.phone"
              class="form-input"
              :class="{ error: errors.phone }"
              placeholder="请输入手机号码"
              @blur="validateField('phone')"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <!-- Remember Me (Login only) -->
          <div v-if="isLogin" class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-link">忘记密码？</a>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary submit-btn">
            {{ isLogin ? '登录' : '注册' }}
          </button>

          <!-- Toggle Login/Register -->
          <div class="form-footer">
            <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
            <button type="button" class="toggle-btn" @click="toggleMode">
              {{ isLogin ? '立即注册' : '立即登录' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { registerUser, loginUser } from '../utils/userDB.js'

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      isLogin: true,
      rememberMe: false,
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
      },
      errors: {}
    }
  },
  methods: {
    validateField(field) {
      this.errors[field] = ''
      
      switch(field) {
        case 'username':
          const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/
          if (!this.formData.username) {
            this.errors.username = '请输入用户名'
          } else if (!usernameRegex.test(this.formData.username)) {
            this.errors.username = '用户名应为2-10个字符（字母、数字、下划线或中文）'
          }
          break
        case 'password':
          const passwordRegex = /^\d{6}$/
          if (!this.formData.password) {
            this.errors.password = '请输入密码'
          } else if (!passwordRegex.test(this.formData.password)) {
            this.errors.password = '密码需为6位数字'
          }
          break
        case 'confirmPassword':
          if (!this.formData.confirmPassword) {
            this.errors.confirmPassword = '请确认密码'
          } else if (this.formData.password !== this.formData.confirmPassword) {
            this.errors.confirmPassword = '两次输入的密码不一致'
          }
          break
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!this.formData.email) {
            this.errors.email = '请输入邮箱地址'
          } else if (!emailRegex.test(this.formData.email)) {
            this.errors.email = '请输入正确的邮箱格式'
          }
          break
        case 'phone':
          const phoneRegex = /^1\d{10}$/
          if (!this.formData.phone) {
            this.errors.phone = '请输入联系方式'
          } else if (!phoneRegex.test(this.formData.phone)) {
            this.errors.phone = '手机号需为1开头的11位数字'
          }
          break
      }
    },
    validateForm() {
      if (this.isLogin) {
        this.validateField('username')
        this.validateField('password')
      } else {
        Object.keys(this.formData).forEach(key => {
          this.validateField(key)
        })
      }
      return Object.keys(this.errors).every(key => !this.errors[key])
    },
    handleSubmit() {
      if (this.validateForm()) {
        if (this.isLogin) {
          // 登录逻辑
          const result = loginUser(this.formData.username, this.formData.password)
          if (result.success) {
            alert('登录成功！')
            // 触发Header组件更新登录状态
            window.dispatchEvent(new Event('userLoginStatusChanged'))
          this.$router.push('/')
          } else {
            alert(result.message)
          }
        } else {
          // 注册逻辑
          const result = registerUser({
            username: this.formData.username,
            password: this.formData.password,
            email: this.formData.email,
            phone: this.formData.phone
          })
          if (result.success) {
            alert('注册成功！请登录')
          this.isLogin = true
          this.formData = {
              username: this.formData.username, // 保留用户名
            password: '',
            confirmPassword: '',
            email: '',
            phone: ''
            }
          } else {
            alert(result.message)
          }
        }
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin
      this.errors = {}
      this.formData = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
      }
    }
  },
  mounted() {
    // 使用jQuery实现表单动画
    if (window.$) {
      $(document).ready(() => {
        $('.form-input').on('focus', function() {
          $(this).parent().addClass('focused')
        }).on('blur', function() {
          $(this).parent().removeClass('focused')
        })
      })
    }
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.login-container {
  max-width: 500px;
  margin: 0 auto;
}

.login-box {
  padding: 40px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.login-subtitle {
  font-size: 16px;
  color: var(--gray);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 500;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  color: var(--primary-color);
  font-size: 18px;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
}

.form-input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.forgot-link {
  color: var(--primary-color);
  font-size: 14px;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  margin-top: 10px;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  color: var(--gray);
  font-size: 14px;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
}

.toggle-btn:hover {
  text-decoration: underline;
}
</style>

