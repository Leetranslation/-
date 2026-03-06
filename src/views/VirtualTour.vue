<template>
  <div class="virtual-tour">
    <Header />
    
    <div class="container">
      <h1 class="page-title">虚拟游览</h1>
      <p class="page-subtitle">通过时间轴探索广东文化遗产的历史变迁</p>

      <!-- Timeline -->
      <div class="timeline-container">
        <div class="timeline">
          <div 
            v-for="(period, index) in timelinePeriods" 
            :key="index"
            class="timeline-item"
            :class="{ active: currentPeriod === index }"
            @click="selectPeriod(index)"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ period.year }}</div>
              <div class="timeline-title">{{ period.title }}</div>
              <div class="timeline-description">{{ period.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Period Content -->
      <transition name="slide-fade" mode="out-in">
        <div :key="currentPeriod" class="period-content">
          <div class="period-header">
            <h2 class="period-title">{{ currentPeriodData.title }}</h2>
            <div class="period-year">{{ currentPeriodData.year }}</div>
          </div>
          
          <div class="period-grid">
            <div 
              v-for="(item, index) in currentPeriodData.items" 
              :key="index"
              class="period-item card"
              :style="{ animationDelay: index * 0.1 + 's' }"
            >
              <div class="period-item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="period-item-content">
                <h3 class="period-item-name">{{ item.name }}</h3>
                <p class="period-item-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Navigation Controls -->
      <div class="tour-controls">
        <button 
          class="btn btn-outline" 
          @click="prevPeriod"
          :disabled="currentPeriod === 0"
        >
          ← 上一时期
        </button>
        <button 
          class="btn btn-primary" 
          @click="nextPeriod"
          :disabled="currentPeriod === timelinePeriods.length - 1"
        >
          下一时期 →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'VirtualTour',
  components: {
    Header
  },
  data() {
    return {
      currentPeriod: 0,
      timelinePeriods: [
        {
          year: '唐代',
          title: '岭南文化初兴',
          description: '佛教文化与山水胜境逐渐繁盛,奠定岭南文明根基',
          items: [
            {
              name: '光孝寺',
              description: '广州最古老的佛教寺院,见证禅宗南传',
              image: require('@/assets/images/guangxiaosi.jpg')
            },
            {
              name: '韶关南华禅寺',
              description: '禅宗祖庭,六祖惠能弘法之地',
              image: require('@/assets/images/shaoguan.jpg')
            },
            {
              name: '云浮国恩寺',
              description: '六祖出生与圆寂之处,禅宗重镇',
              image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400'
            },
            {
              name: '汕尾玄武山元山寺',
              description: '佛道儒合一的宗教圣地',
              image: require('@/assets/images/shanwei.jpg')
            },
            {
              name: '揭阳双峰寺',
              description: '潮汕佛教文化的重要载体',
              image: require('@/assets/images/jieyang.jpg')
            },
            {
              name: '阳江阳春崆峒岩',
              description: '喀斯特奇观与宗教遗迹交织的岭南秘境',
              image: require('@/assets/images/yangjiang.jpg')
            }
          ]
        },
        {
          year: '宋代',
          title: '文化繁荣期',
          description: '城市防御、民俗村落与商贸港口共同繁荣',
          items: [
            {
              name: '肇庆古城墙',
              description: '广东唯一保存完整的宋代城墙',
              image: require('@/assets/images/zhaoqingguchengqiang.jpg')
            },
            {
              name: '潮州古城',
              description: '千年古城,潮汕文化的摇篮',
              image: require('@/assets/images/chaozhougucheng.jpg')
            },
            {
              name: '佛山祖庙',
              description: '北帝崇拜中心,岭南民俗信仰象征',
              image: require('@/assets/images/foshanzumiao.jpg')
            },
            {
              name: '河源佗城古镇',
              description: '岭南地区保存最完整的古城之一',
              image: require('@/assets/images/heyuan.jpg')
            },
            {
              name: '连南千年瑶寨',
              description: '瑶族传统聚落,延续千年的山地部落文化',
              image: require('@/assets/images/qingyuan.jpg')
            },
            {
              name: '梅州松口古镇',
              description: '侨乡古镇,客家文化的重要载体',
              image: require('@/assets/images/meizhou.jpg')
            }
          ]
        },
        {
          year: '明清',
          title: '建筑艺术巅峰',
          description: '祠堂园林与海防城池展现岭南审美与匠心',
          items: [
            {
              name: '陈家祠',
              description: '岭南祠堂建筑艺术的杰作',
              image: require('@/assets/images/chenjiaci.jpg')
            },
            {
              name: '东莞可园',
              description: '岭南四大名园之一,园林艺术典范',
              image: require('@/assets/images/donguan.jpg')
            },
            {
              name: '深圳大鹏所城',
              description: '明清海防军事要塞,深圳历史之根',
              image: require('@/assets/images/shenzhen.jpg')
            },
            {
              name: '汕头达濠古城',
              description: '潮汕地区保存较完整的海防古城',
              image: require('@/assets/images/haodagucheng.jpg')
            },
            {
              name: '澄海前美古村',
              description: '潮汕传统建筑群,侨乡文化缩影',
              image: require('@/assets/images/shantou.jpg')
            },
            {
              name: '湛江雷州古城',
              description: '雷州文化名城,古建筑丰富',
              image: require('@/assets/images/zhanjiang.jpg')
            },
            {
              name: '惠州西湖',
              description: '岭南名湖,文人墨客的诗意天地',
              image: require('@/assets/images/huizhou.jpg')
            }
          ]
        },
        {
          year: '近现代',
          title: '中西文化融合',
          description: '华侨建筑、革命记忆与非遗艺术交相辉映',
          items: [
            {
              name: '开平碉楼',
              description: '中西合璧的侨乡建筑群,世界文化遗产',
              image: require('@/assets/images/kaipingdiaolou.jpg')
            },
            {
              name: '孙中山故居纪念馆',
              description: '民主革命先行者的出生地与精神象征',
              image: require('@/assets/images/zhongshan.jpg')
            },
            {
              name: '粤剧艺术',
              description: '世界级非遗,南国红豆的艺术魅力',
              image: require('@/assets/images/yuejuyishu.jpg')
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentPeriodData() {
      return this.timelinePeriods[this.currentPeriod]
    }
  },
  methods: {
    selectPeriod(index) {
      this.currentPeriod = index
    },
    prevPeriod() {
      if (this.currentPeriod > 0) {
        this.currentPeriod--
      }
    },
    nextPeriod() {
      if (this.currentPeriod < this.timelinePeriods.length - 1) {
        this.currentPeriod++
      }
    }
  },
  mounted() {
    // 使用jQuery实现时间轴动画
    if (window.$) {
      $(document).ready(() => {
        $('.timeline-item').on('click', function() {
          $('.timeline-item').removeClass('active')
          $(this).addClass('active')
        })
      })
    }
  }
}
</script>

<style scoped>
.virtual-tour {
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
}

.page-title {
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: var(--text-color);
}

.page-subtitle {
  text-align: center;
  font-size: 18px;
  color: var(--gray);
  margin-bottom: 60px;
}

/* Timeline */
.timeline-container {
  margin: 60px 0;
  padding: 40px 0;
  overflow-x: auto;
}

.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-width: 1000px;
  padding: 0 50px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 50px;
  left: 50px;
  right: 50px;
  height: 3px;
  background: linear-gradient(to right, var(--primary-color), #4ecdc4);
  z-index: 1;
}

.timeline-item {
  position: relative;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--white);
  border: 4px solid var(--primary-color);
  margin: 0 auto 20px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
}

.timeline-item.active .timeline-marker {
  width: 30px;
  height: 30px;
  background-color: var(--primary-color);
  box-shadow: 0 0 0 8px rgba(200, 16, 46, 0.2);
}

.timeline-content {
  text-align: center;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.timeline-item.active .timeline-content {
  background-color: var(--primary-color);
  color: var(--white);
}

.timeline-year {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.timeline-item.active .timeline-year {
  color: var(--white);
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-description {
  font-size: 14px;
  color: var(--gray);
  line-height: 1.5;
}

.timeline-item.active .timeline-description {
  color: rgba(255, 255, 255, 0.9);
}

/* Period Content */
.period-content {
  margin: 60px 0;
}

.period-header {
  text-align: center;
  margin-bottom: 40px;
}

.period-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.period-year {
  font-size: 20px;
  color: var(--primary-color);
  font-weight: 600;
}

.period-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.period-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  cursor: pointer;
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

.period-item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.period-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.period-item:hover .period-item-image img {
  transform: scale(1.1);
}

.period-item-content {
  padding: 20px;
}

.period-item-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.period-item-desc {
  color: var(--gray);
  font-size: 14px;
  line-height: 1.6;
}

/* Tour Controls */
.tour-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
}

.tour-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

