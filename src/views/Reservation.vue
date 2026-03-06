<template>
  <div class="reservation">
    <Header />
    
    <div class="container">
      <div class="reservation-header">
        <h1 class="page-title">参观预约</h1>
        <p class="page-subtitle">预约您的文化之旅,让历史触手可及</p>
      </div>

      <div class="reservation-content">
        <!-- Left Column - Booking Form -->
        <div class="form-column">
          <div class="form-section">
            <h2 class="form-title">
              <span class="form-icon">📅</span>
              预约信息
            </h2>
            
            <form @submit.prevent="handleSubmit" class="reservation-form">
              <!-- Venue Selection -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">🏛️</span>
                  选择场馆 *
                </label>
                <select 
                  v-model="formData.venue" 
                  class="form-input"
                  :class="{ error: errors.venue }"
                  @blur="validateField('venue')"
                >
                  <option value="">请选择场馆</option>
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
                <span v-if="errors.venue" class="error-message">{{ errors.venue }}</span>
              </div>

              <!-- Visit Date -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">📅</span>
                  参观日期 *
                </label>
                <input 
                  type="date" 
                  v-model="formData.date"
                  class="form-input"
                  :class="{ error: errors.date }"
                  :min="minDate"
                  @blur="validateField('date')"
                />
                <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
              </div>

              <!-- Time Slot -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">🕐</span>
                  参观时间段 *
                </label>
                <select 
                  v-model="formData.timeSlot" 
                  class="form-input"
                  :class="{ error: errors.timeSlot }"
                  @blur="validateField('timeSlot')"
                >
                  <option value="">请选择时间段</option>
                  <option value="09:00-10:30">09:00-10:30</option>
                  <option value="10:30-12:00">10:30-12:00</option>
                  <option value="14:00-15:30">14:00-15:30</option>
                  <option value="15:30-17:00">15:30-17:00</option>
                </select>
                <span v-if="errors.timeSlot" class="error-message">{{ errors.timeSlot }}</span>
              </div>

              <!-- Number of Visitors -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">👥</span>
                  参观人数 *
                </label>
                <div class="number-input">
                  <button 
                    type="button" 
                    class="number-btn"
                    @click="decreaseCount"
                    :disabled="formData.visitors <= 1"
                  >-</button>
                  <input 
                    type="number" 
                    v-model.number="formData.visitors"
                    class="number-field"
                    min="1"
                    max="10"
                    readonly
                  />
                  <button 
                    type="button" 
                    class="number-btn"
                    @click="increaseCount"
                    :disabled="formData.visitors >= 10"
                  >+</button>
                </div>
                <p class="form-hint">单次预约最多10人</p>
                <span v-if="errors.visitors" class="error-message">{{ errors.visitors }}</span>
              </div>

              <!-- Contact Name -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">👤</span>
                  联系人姓名 *
                </label>
                <input 
                  type="text" 
                  v-model="formData.name"
                  class="form-input"
                  :class="{ error: errors.name }"
                  placeholder="请输入姓名"
                  @blur="validateField('name')"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <!-- Contact Phone -->
              <div class="form-group">
                <label class="form-label">
                  <span class="label-icon">📱</span>
                  联系电话 *
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

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary submit-btn">提交预约</button>
            </form>
          </div>
        </div>

        <!-- Right Column - Rules and Hours -->
        <div class="info-column">
          <!-- Booking Rules -->
          <div class="info-section">
            <h2 class="info-title">
              <span class="info-icon">ℹ️</span>
              预约须知
            </h2>
            <ul class="info-list">
              <li class="info-item">✓ 请提前至少1天预约</li>
              <li class="info-item">✓ 每个账号每天最多预约1次</li>
              <li class="info-item">✓ 请携带有效身份证件入馆</li>
              <li class="info-item">✓ 迟到30分钟预约自动取消</li>
              <li class="info-item">✓ 馆内禁止吸烟、饮食</li>
              <li class="info-item">✓ 遵守场馆参观秩序</li>
            </ul>
          </div>

          <!-- Opening Hours -->
          <div class="info-section">
            <h2 class="info-title">
              <span class="info-icon">🕐</span>
              开放时间
            </h2>
            <div class="hours-content">
              <div class="hours-item">
                <span class="hours-day">周二至周日</span>
                <span class="hours-time">9:00 - 17:30</span>
              </div>
              <div class="hours-item closed">
                <span class="hours-day">周一</span>
                <span class="hours-time">闭馆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>预约成功！</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>
          <div class="modal-body">
            <p>您的预约信息已提交成功，预约编号：<strong>{{ reservationNumber }}</strong></p>
            <p>我们已向您的手机发送确认短信，请按时参观。</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="closeModal">确定</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getCurrentUser } from '../utils/userDB.js'

export default {
  name: 'Reservation',
  components: {
    Header
  },
  data() {
    return {
      formData: {
        venue: '',
        date: '',
        timeSlot: '',
        visitors: 1,
        name: '',
        phone: ''
      },
      errors: {},
      showSuccessModal: false,
      reservationNumber: ''
    }
  },
  computed: {
    minDate() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    }
  },
  methods: {
    validateField(field) {
      this.errors[field] = ''
      
      switch(field) {
        case 'venue':
          if (!this.formData.venue) {
            this.errors.venue = '请选择场馆'
          }
          break
        case 'date':
          if (!this.formData.date) {
            this.errors.date = '请选择参观日期'
          } else {
            const selectedDate = new Date(this.formData.date)
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            if (selectedDate < tomorrow) {
              this.errors.date = '请至少提前1天预约'
            }
          }
          break
        case 'timeSlot':
          if (!this.formData.timeSlot) {
            this.errors.timeSlot = '请选择参观时间段'
          }
          break
        case 'visitors':
          if (this.formData.visitors < 1 || this.formData.visitors > 10) {
            this.errors.visitors = '参观人数应在1-10人之间'
          }
          break
        case 'name':
          const nameRegex = /^[\u4e00-\u9fa5]{2,10}$/
          if (!this.formData.name) {
            this.errors.name = '请输入联系人姓名'
          } else if (!nameRegex.test(this.formData.name)) {
            this.errors.name = '姓名应为2-10个汉字'
          }
          break
        case 'phone':
          const phoneRegex = /^1\d{10}$/
          if (!this.formData.phone) {
            this.errors.phone = '请输入联系电话'
          } else if (!phoneRegex.test(this.formData.phone)) {
            this.errors.phone = '手机号需为1开头的11位数字'
          }
          break
      }
    },
    validateForm() {
      Object.keys(this.formData).forEach(key => {
        this.validateField(key)
      })
      return Object.keys(this.errors).every(key => !this.errors[key])
    },
    increaseCount() {
      if (this.formData.visitors < 10) {
        this.formData.visitors++
      }
    },
    decreaseCount() {
      if (this.formData.visitors > 1) {
        this.formData.visitors--
      }
    },
    handleSubmit() {
      if (!this.validateForm()) return

      const user = getCurrentUser()
      if (!user) {
        alert('请先登录后再预约')
        this.$router.push('/login')
        return
      }

        // 生成预约编号
        this.reservationNumber = 'RES' + Date.now()

      // 保存预约信息到 localStorage，绑定用户
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
      reservations.push({
        ...this.formData,
        id: Date.now(),
        userId: user.id,
        number: this.reservationNumber
      })
      localStorage.setItem('reservations', JSON.stringify(reservations))
        
        // 显示成功模态框
        this.showSuccessModal = true
        
        // 使用jQuery实现表单提交动画
        if (window.$) {
          $('.reservation-form').addClass('submitted')
      }
    },
    closeModal() {
      this.showSuccessModal = false
      // 重置表单
      this.formData = {
        venue: '',
        date: '',
        timeSlot: '',
        visitors: 1,
        name: '',
        phone: ''
      }
      this.errors = {}
    }
  }
}
</script>

<style scoped>
.reservation {
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
  background-color: var(--gray-light);
}

.reservation-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: var(--primary-color);
}

.page-subtitle {
  font-size: 18px;
  color: var(--gray);
  margin-top: 20px;
}

.reservation-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Form Column */
.form-column {
  background-color: var(--white);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  animation: fadeIn 0.6s ease-out;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
}

.form-icon {
  font-size: 28px;
}

.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
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

.number-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background-color: var(--white);
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: var(--primary-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

.number-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.number-field {
  flex: 1;
  text-align: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
}

.form-hint {
  font-size: 12px;
  color: var(--gray);
  margin-top: -5px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  margin-top: 10px;
}

/* Info Column */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-section {
  background-color: var(--white);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.6s ease-out;
}

.info-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
}

.info-icon {
  color: var(--primary-color);
  font-size: 24px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.6;
}

.hours-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--gray-light);
  border-radius: 4px;
}

.hours-item.closed {
  background-color: #ffe5e5;
}

.hours-day {
  font-weight: 500;
  color: var(--text-color);
}

.hours-time {
  font-weight: bold;
  color: var(--primary-color);
}

.hours-item.closed .hours-time {
  color: #dc3545;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background-color: var(--white);
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 24px;
  color: var(--text-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 30px;
  color: var(--gray);
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  margin-bottom: 20px;
  line-height: 1.8;
  color: var(--text-color);
}

.modal-footer {
  text-align: right;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

