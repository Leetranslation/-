<template>
  <div class="home">
    <Header />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title fade-in">探索广东文化遗产</h1>
        <p class="hero-subtitle fade-in">穿越时空,感受千年岭南文化的魅力</p>
        <div class="hero-buttons fade-in">
          <button class="btn btn-primary" @click="$router.push('/category')">开始探索</button>
          <button class="btn btn-outline" @click="$router.push('/reservation')">预约参观</button>
        </div>
      </div>
    </section>

    <!-- Hot Recommendations -->
    <section class="hot-recommendations">
      <div class="container">
        <h2 class="section-title">热门推荐</h2>
        <div class="recommendations-grid">
          <div 
            v-for="(item, index) in hotItems" 
            :key="item.id"
            class="recommendation-card card"
            :style="{ animationDelay: index * 0.1 + 's' }"
            @click="$router.push(`/detail/${item.id}`)"
          >
            <div class="card-image">
              <img :src="item.image" :alt="item.title" />
              <span class="card-tag" :class="item.tagClass">{{ item.tag }}</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <div class="card-location">
                <span class="location-icon">📍</span>
                <span>{{ item.location }}</span>
              </div>
              <p class="card-description">{{ item.description }}</p>
              <div class="card-stats">
                <span class="stat-item">
                  <span class="stat-icon">👁️</span>
                  <span>{{ item.views }}</span>
                </span>
                <span class="stat-item">
                  <span class="stat-icon">❤️</span>
                  <span>{{ item.likes }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Heritage Map -->
    <section class="heritage-map">
      <div class="container">
        <h2 class="section-title">广东文化遗产地图</h2>
        <div class="map-container">
          <div id="map-container" class="map-container-inner"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Home',
  components: {
    Header
  },
  data() {
    return {
      map: null,
      markers: [],
      AMap: null,
      heritageLocations: [
        { name: '陈家祠', position: [113.2444, 23.1304], id: 1, city: '广州' },
        { name: '开平碉楼与村落', position: [112.6874, 22.3764], id: 2, city: '江门' },
        { name: '光孝寺', position: [113.2550, 23.1333], id: 3, city: '广州' },
        { name: '潮州古城', position: [116.6226, 23.6617], id: 4, city: '潮州' },
        { name: '佛山祖庙', position: [113.1117, 23.0288], id: 5, city: '佛山' },
        { name: '粤剧艺术', position: [113.2665, 23.1322], id: 6, city: '广州' },
        { name: '肇庆古城墙', position: [112.4650, 23.0515], id: 7, city: '肇庆' },
        { name: '梅州松口古镇', position: [116.3167, 24.3167], id: 8, city: '梅州' },
        { name: '韶关南华禅寺', position: [113.5833, 24.6833], id: 9, city: '韶关' },
        { name: '中山孙中山故居纪念馆', position: [113.5167, 22.4500], id: 10, city: '中山' },
        { name: '清远连南千年瑶寨', position: [112.2833, 24.7167], id: 11, city: '清远' },
        { name: '湛江雷州古城', position: [110.0956, 20.9144], id: 12, city: '湛江' },
        { name: '汕头澄海前美古村侨文化旅游区', position: [116.7633, 23.4667], id: 13, city: '汕头' },
        { name: '河源佗城古镇', position: [115.2567, 23.7333], id: 14, city: '河源' },
        { name: '云浮国恩寺', position: [112.0333, 22.7667], id: 15, city: '云浮' },
        { name: '汕尾玄武山元山寺', position: [115.6500, 22.8167], id: 16, city: '汕尾' },
        { name: '深圳大鹏所城', position: [114.4819, 22.5953], id: 17, city: '深圳' },
        { name: '惠州西湖', position: [114.4000, 23.1000], id: 18, city: '惠州' },
        { name: '东莞可园', position: [113.7500, 23.0333], id: 19, city: '东莞' },
        { name: '汕头达濠古城', position: [116.7167, 23.2833], id: 20, city: '汕头' },
        { name: '揭阳双峰寺', position: [116.3667, 23.5500], id: 21, city: '揭阳' },
        { name: '阳江阳春崆峒岩', position: [111.7833, 22.1667], id: 22, city: '阳江' }
      ],
      hotItems: [
        {
          id: 2,
          title: '开平碉楼',
          location: '江门市开平市',
          description: '中西合璧的乡土建筑,世界文化遗产,独特的侨乡文化见证',
          image: require('@/assets/images/kaipingdiaolou.jpg'),
          tag: '世界遗产',
          tagClass: 'tag-world',
          views: '18.3k',
          likes: '1245'
        },
        {
          id: 1,
          title: '陈家祠',
          location: '广州市荔湾区',
          description: '岭南地区现存规模最大、保存最完整、装饰最精美的清代祠堂建筑',
          image: require('@/assets/images/chenjiaci.jpg'),
          tag: '古建筑',
          tagClass: 'tag-ancient',
          views: '12.5k',
          likes: '856'
        },
        {
          id: 4,
          title: '潮州古城',
          location: '潮州市湘桥区',
          description: '千年古城,潮汕文化发源地,保存完好的明清古建筑群',
          image: require('@/assets/images/chaozhougucheng.jpg'),
          tag: '历史街区',
          tagClass: 'tag-historic',
          views: '15.2k',
          likes: '982'
        },
        {
          id: 17,
          title: '深圳大鹏所城',
          location: '深圳市大鹏新区',
          description: '明清海防军事要塞,深圳地区保存最完整的古建筑群',
          image: require('@/assets/images/shenzhen.jpg'),
          tag: '古建筑',
          tagClass: 'tag-ancient',
          views: '11.1k',
          likes: '768'
        },
        {
          id: 11,
          title: '连南千年瑶寨',
          location: '清远市连南县',
          description: '中国最古老的瑶族村寨之一,保存完整的瑶族传统建筑和民俗文化',
          image: require('@/assets/images/qingyuan.jpg'),
          tag: '历史街区',
          tagClass: 'tag-historic',
          views: '10.2k',
          likes: '712'
        },
        {
          id: 18,
          title: '惠州西湖',
          location: '惠州市惠城区',
          description: '岭南名湖,苏东坡等文人墨客的游览胜地,拥有深厚的历史文化底蕴',
          image: require('@/assets/images/huizhou.jpg'),
          tag: '历史景观',
          tagClass: 'tag-intangible',
          views: '13.8k',
          likes: '905'
        }
      ]
    }
  },
  mounted() {
    try {
    // 使用jQuery实现图片懒加载动画
    if (window.$) {
        $(document).ready(() => {
        $('.recommendation-card').each(function(index) {
          $(this).css('animation-delay', (index * 0.1) + 's')
        })
      })
      }
      // 创建全局跳转方法供信息窗口使用
      const self = this
      window.goToDetail = (id) => {
        if (self && self.$router) {
          self.$router.push(`/detail/${id}`)
        }
      }
      // 等待DOM渲染完成后再初始化地图
      this.$nextTick(() => {
        setTimeout(() => {
          this.initMap()
        }, 300)
      })
    } catch (error) {
      console.error('组件挂载错误:', error)
    }
  },
  beforeUnmount() {
    // 清理全局方法
    if (window.goToDetail) {
      delete window.goToDetail
    }
    // 组件销毁时清理地图
    if (this.map) {
      this.map.destroy()
      this.map = null
    }
  },
  methods: {
    initMap() {
      // 检查DOM元素是否存在
      const mapContainer = document.getElementById('map-container')
      if (!mapContainer) {
        console.warn('地图容器未找到，延迟初始化')
        setTimeout(() => this.initMap(), 100)
        return
      }
      
      // 防止重复初始化
      if (this.map) {
        return
      }
      
      // 配置高德地图安全密钥（必须在load之前设置）
      window._AMapSecurityConfig = {
        securityJsCode: '616df08456d8190c96bd905e4edad711'
      }
      
      AMapLoader.load({
        key: '308a6ce5405956bc22679c4ff50c5a99',
        version: '2.0',
        plugins: ['AMap.Marker', 'AMap.InfoWindow', 'AMap.ToolBar', 'AMap.Scale']
      }).then((AMap) => {
        try {
          this.AMap = AMap
          // 创建地图实例
          this.map = new AMap.Map('map-container', {
            zoom: 8,
            center: [113.2665, 23.1322], // 广东省中心坐标（广州）
            viewMode: '3D',
            mapStyle: 'amap://styles/normal'
          })
          
          // 添加工具栏和比例尺
          this.map.addControl(new AMap.ToolBar({
            position: 'RT'
          }))
          this.map.addControl(new AMap.Scale({
            position: 'LB'
          }))
          
          // 添加标记点
          this.addMarkers()
        } catch (error) {
          console.error('地图初始化失败:', error)
        }
      }).catch((error) => {
        console.error('地图加载失败:', error)
        // 显示友好的错误提示
        const mapContainer = document.getElementById('map-container')
        if (mapContainer && !this.map) {
          mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; flex-direction: column;">
              <p style="font-size: 16px; margin-bottom: 10px;">地图加载失败</p>
              <p style="font-size: 14px; color: #999;">请检查网络连接或刷新页面重试</p>
            </div>
          `
        }
      }).catch((err) => {
        // 捕获所有未处理的错误
        console.error('未处理的错误:', err)
      })
    },
    addMarkers() {
      if (!this.map || !this.AMap) {
        console.warn('地图或AMap对象未初始化')
        return
      }
      
      try {
        this.heritageLocations.forEach(location => {
          try {
            // 验证坐标数据
            if (!location.position || !Array.isArray(location.position) || location.position.length !== 2) {
              console.warn(`位置数据无效: ${location.name}`, location.position)
              return
            }
            
            // 创建标记
            const marker = new this.AMap.Marker({
              position: location.position,
              title: location.name,
              offset: new this.AMap.Pixel(-13, -30)
            })
            
            // 转义HTML特殊字符，防止XSS攻击
            const escapeHtml = (text) => {
              const div = document.createElement('div')
              div.textContent = text
              return div.innerHTML
            }
            
            // 创建信息窗口内容
            const infoWindow = new this.AMap.InfoWindow({
              content: `
                <div style="padding: 10px; min-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${escapeHtml(location.name)}</h3>
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">📍 ${escapeHtml(location.city)}</p>
                  <button 
                    onclick="if(window.goToDetail){window.goToDetail(${location.id})}" 
                    style="
                      background: #c8102e; 
                      color: white; 
                      border: none; 
                      padding: 6px 16px; 
                      border-radius: 4px; 
                      cursor: pointer;
                      font-size: 14px;
                      transition: background 0.3s;
                    "
                    onmouseover="this.style.background='#a00d2a'"
                    onmouseout="this.style.background='#c8102e'"
                  >
                    查看详情
                  </button>
                </div>
              `,
              offset: new this.AMap.Pixel(0, -30)
            })
            
            // 点击标记显示信息窗口
            marker.on('click', () => {
              try {
                infoWindow.open(this.map, location.position)
              } catch (error) {
                console.error('打开信息窗口失败:', error)
              }
            })
            
            // 添加到地图
            this.map.add(marker)
            this.markers.push(marker)
          } catch (error) {
            console.error(`添加标记点失败 [${location.name}]:`, error)
          }
        })
        
        // 自动调整地图视野以包含所有标记点
        if (this.markers.length > 0) {
          try {
            this.map.setFitView(this.markers, false, [50, 50, 50, 50])
          } catch (error) {
            console.warn('调整地图视野失败:', error)
          }
        }
      } catch (error) {
        console.error('添加标记点过程出错:', error)
      }
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  height: 600px;
  background-image: url('https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(200, 16, 46, 0.7) 0%, rgba(44, 62, 80, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 40px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* Hot Recommendations */
.hot-recommendations {
  padding: 80px 0;
  background-color: var(--white);
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.recommendation-card {
  cursor: pointer;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
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

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recommendation-card:hover .card-image img {
  transform: scale(1.1);
}

.card-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  background-color: var(--primary-color);
}

.tag-ancient {
  background-color: #8b4513;
}

.tag-world {
  background-color: #ff6b6b;
}

.tag-intangible {
  background-color: #4ecdc4;
}

.tag-historic {
  background-color: #95a5a6;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.card-location {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--gray);
  font-size: 14px;
  margin-bottom: 10px;
}

.location-icon {
  color: var(--primary-color);
}

.card-description {
  color: var(--gray);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-stats {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--gray);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stat-icon {
  font-size: 16px;
}

/* Heritage Map */
.heritage-map {
  padding: 80px 0;
  background-color: var(--gray-light);
}

.map-container {
  margin-top: 40px;
}

.map-container-inner {
  height: 500px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

