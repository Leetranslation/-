<template>
  <div class="category">
    <Header />
    
    <div class="container">
      <!-- Search and Filter Section -->
      <section class="search-section">
        <div class="search-bar">
          <div class="filter-group">
            <label>遗产类别:</label>
            <select v-model="selectedCategory" class="filter-select">
              <option value="">全部类别</option>
              <option value="古建筑">古建筑</option>
              <option value="非物质文化遗产">非物质文化遗产</option>
              <option value="历史街区">历史街区</option>
              <option value="历史建筑">历史建筑</option>
              <option value="历史景观">历史景观</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>所在城市:</label>
            <select v-model="selectedCity" class="filter-select">
              <option value="">全部城市</option>
              <option value="广州">广州</option>
              <option value="江门">江门</option>
              <option value="潮州">潮州</option>
              <option value="佛山">佛山</option>
              <option value="肇庆">肇庆</option>
              <option value="梅州">梅州</option>
              <option value="韶关">韶关</option>
              <option value="中山">中山</option>
              <option value="清远">清远</option>
              <option value="湛江">湛江</option>
              <option value="汕头">汕头</option>
              <option value="河源">河源</option>
              <option value="云浮">云浮</option>
              <option value="汕尾">汕尾</option>
              <option value="深圳">深圳</option>
              <option value="惠州">惠州</option>
              <option value="东莞">东莞</option>
              <option value="揭阳">揭阳</option>
              <option value="阳江">阳江</option>
            </select>
          </div>
          
          <div class="search-input-group">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              v-model="searchKeyword"
              placeholder="输入关键词搜索..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
          </div>
          
          <button class="btn btn-outline" @click="resetFilters">重置</button>
        </div>
      </section>

      <!-- Results Section -->
      <section class="results-section">
        <div class="results-header">
          <h2 class="results-count">共找到 {{ filteredItems.length }} 个文化遗产</h2>
          <div class="view-toggle">
            <span 
              class="toggle-icon" 
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >⊞</span>
            <span 
              class="toggle-icon" 
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >☰</span>
          </div>
        </div>

        <!-- Grid/List View -->
        <transition name="fade" mode="out-in">
          <div 
            :key="viewMode"
            :class="['items-container', viewMode === 'grid' ? 'grid-view' : 'list-view']"
          >
            <div 
              v-for="item in filteredItems" 
              :key="item.id"
              class="heritage-item card"
              @click="$router.push(`/detail/${item.id}`)"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="item-content">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-title-en">{{ item.titleEn }}</p>
                <div class="item-meta">
                  <span class="meta-item">
                    <span class="meta-icon">🏛️</span>
                    <span>{{ item.category }}</span>
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">📍</span>
                    <span>{{ item.city }}</span>
                  </span>
                </div>
                <p class="item-description">{{ item.description }}</p>
                <button class="btn btn-primary btn-sm">查看详情 →</button>
              </div>
            </div>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Category',
  components: {
    Header
  },
  data() {
    return {
      selectedCategory: '',
      selectedCity: '',
      searchKeyword: '',
      viewMode: 'grid',
      items: [
        {
          id: 2,
          title: '开平碉楼与村落',
          titleEn: 'Kaiping Diaolou',
          category: '世界文化遗产',
          city: '江门',
          description: '开平碉楼是中国乡土建筑的特殊类型,是集防卫、居住和中西建筑艺术于一体的多层塔楼式建筑。现存1833座,是中国华侨文化的纪念碑。',
          image: require('@/assets/images/kaipingdiaolou.jpg')
        },
        {
          id: 1,
          title: '陈家祠',
          titleEn: 'Chen Clan Ancestral Hall',
          category: '古建筑',
          city: '广州',
          description: '陈氏书院,俗称陈家祠,是广东规模最大、装饰华丽、保存完好的传统岭南祠堂式建筑。',
          image: require('@/assets/images/chenjiaci.jpg')
        },
        {
          id: 3,
          title: '光孝寺',
          titleEn: 'Guangxiao Temple',
          category: '古建筑',
          city: '广州',
          description: '广州最古老的佛教寺院,禅宗六祖惠能在此受戒,有"未有羊城,先有光孝"之说。',
          image: require('@/assets/images/guangxiaosi.jpg')
        },
        {
          id: 4,
          title: '潮州古城',
          titleEn: 'Chaozhou Ancient City',
          category: '历史街区',
          city: '潮州',
          description: '千年古城,潮汕文化发源地,保存完好的明清古建筑群。',
          image: require('@/assets/images/chaozhougucheng.jpg')
        },
        {
          id: 6,
          title: '粤剧艺术',
          titleEn: 'Cantonese Opera',
          category: '非物质文化遗产',
          city: '广州',
          description: '岭南文化瑰宝,世界非物质文化遗产,南国红豆的艺术魅力。',
          image: require('@/assets/images/yuejuyishu.jpg')
        },
        {
          id: 5,
          title: '佛山祖庙',
          titleEn: 'Foshan Ancestral Temple',
          category: '古建筑',
          city: '佛山',
          description: '佛山祖庙是供奉北帝的神庙,因居佛山诸庙之首,故称祖庙。',
          image: require('@/assets/images/foshanzumiao.jpg')
        },
        {
          id: 7,
          title: '肇庆古城墙',
          titleEn: 'Zhaoqing Ancient City Wall',
          category: '古建筑',
          city: '肇庆',
          description: '肇庆古城墙是广东省唯一保存完整的宋代城墙,具有重要的历史价值和建筑艺术价值。',
          image: require('@/assets/images/zhaoqingguchengqiang.jpg')
        },
        {
          id: 8,
          title: '梅州松口古镇',
          titleEn: 'Meizhou Songkou Ancient Town',
          category: '历史街区',
          city: '梅州',
          description: '松口古镇是著名的侨乡古镇,保存了大量明清时期的古建筑,是客家文化的重要载体。',
          image: require('@/assets/images/meizhou.jpg')
        },
        {
          id: 9,
          title: '韶关南华禅寺',
          titleEn: 'Shaoguan Nanhua Temple',
          category: '古建筑',
          city: '韶关',
          description: '南华禅寺是禅宗六祖惠能弘扬"南宗禅法"的发源地,被誉为"禅宗祖庭",是中国佛教名寺之一。',
          image: require('@/assets/images/shaoguan.jpg')
        },
        {
          id: 10,
          title: '中山孙中山故居纪念馆',
          titleEn: 'Sun Yat-sen Memorial House',
          category: '历史建筑',
          city: '中山',
          description: '孙中山故居纪念馆是伟大的民主革命先行者孙中山先生的出生地,是重要的爱国主义教育基地。',
          image: require('@/assets/images/zhongshan.jpg')
        },
        {
          id: 11,
          title: '清远连南千年瑶寨',
          titleEn: 'Qingyuan Liannan Millennium Yao Village',
          category: '历史街区',
          city: '清远',
          description: '连南千年瑶寨是中国最古老的瑶族村寨之一,保存了完整的瑶族传统建筑和民俗文化。',
          image: require('@/assets/images/qingyuan.jpg')
        },
        {
          id: 12,
          title: '湛江雷州古城',
          titleEn: 'Zhanjiang Leizhou Ancient City',
          category: '历史街区',
          city: '湛江',
          description: '雷州古城是雷州半岛的历史文化名城,保存了丰富的古建筑和传统文化,是雷州文化的重要载体。',
          image: require('@/assets/images/zhanjiang.jpg')
        },
        {
          id: 13,
          title: '汕头澄海前美古村侨文化旅游区',
          titleEn: 'Shantou Chenghai Qianmei Ancient Village',
          category: '历史街区',
          city: '汕头',
          description: '前美古村是著名的侨乡古村落,保存了大量精美的潮汕传统建筑,展现了侨乡文化的独特魅力。',
          image: require('@/assets/images/shantou.jpg')
        },
        {
          id: 14,
          title: '河源佗城古镇',
          titleEn: 'Heyuan Tuocheng Ancient Town',
          category: '历史街区',
          city: '河源',
          description: '佗城古镇是岭南地区保存最完整的古城之一,有着2000多年的历史,是客家文化的重要发源地。',
          image: require('@/assets/images/heyuan.jpg')
        },
        {
          id: 15,
          title: '云浮国恩寺',
          titleEn: 'Yunfu Guoen Temple',
          category: '古建筑',
          city: '云浮',
          description: '国恩寺是禅宗六祖惠能的出生地和圆寂地,是中国禅宗的重要祖庭,具有深厚的佛教文化底蕴。',
          image: require('@/assets/images/yunfu.jpg')
        },
        {
          id: 16,
          title: '汕尾玄武山元山寺',
          titleEn: 'Shanwei Xuanwu Mountain Yuanshan Temple',
          category: '古建筑',
          city: '汕尾',
          description: '玄武山元山寺是粤东地区重要的宗教文化圣地,集佛教、道教、儒教于一体,是潮汕地区重要的文化遗产。',
          image: require('@/assets/images/shanwei.jpg')
        },
        {
          id: 17,
          title: '深圳大鹏所城',
          titleEn: 'Shenzhen Dapeng Fortress',
          category: '古建筑',
          city: '深圳',
          description: '大鹏所城是明清两代中国海防的军事要塞,是深圳地区保存最完整的古建筑群,具有重要的历史价值。',
          image: require('@/assets/images/shenzhen.jpg')
        },
        {
          id: 18,
          title: '惠州西湖',
          titleEn: 'Huizhou West Lake',
          category: '历史景观',
          city: '惠州',
          description: '惠州西湖是广东著名的风景名胜区,有着深厚的历史文化底蕴,是苏东坡等文人墨客的游览胜地。',
          image: require('@/assets/images/huizhou.jpg')
        },
        {
          id: 19,
          title: '东莞可园',
          titleEn: 'Dongguan Keyuan Garden',
          category: '古建筑',
          city: '东莞',
          description: '可园是广东四大名园之一,是清代岭南园林建筑的典型代表,以其精巧的布局和精美的建筑艺术著称。',
          image: require('@/assets/images/donguan.jpg')
        },
        {
          id: 20,
          title: '汕头达濠古城',
          titleEn: 'Shantou Dahu Ancient City',
          category: '历史街区',
          city: '汕头',
          description: '达濠古城是潮汕地区保存较为完整的古城之一,展现了潮汕传统建筑风格和历史文化特色。',
          image: require('@/assets/images/haodagucheng.jpg')
        },
        {
          id: 21,
          title: '揭阳双峰寺',
          titleEn: 'Jieyang Shuangfeng Temple',
          category: '古建筑',
          city: '揭阳',
          description: '双峰寺是潮汕地区重要的佛教寺院,有着悠久的历史和深厚的文化底蕴,是潮汕佛教文化的重要载体。',
          image: require('@/assets/images/jieyang.jpg')
        },
        {
          id: 22,
          title: '阳江阳春崆峒岩',
          titleEn: 'Yangjiang Yangchun Kongtong Cave',
          category: '历史景观',
          city: '阳江',
          description: '崆峒岩是阳春著名的风景名胜区,以其独特的喀斯特地貌和丰富的历史文化遗迹而闻名,是岭南地区重要的自然文化遗产。',
          image: require('@/assets/images/yangjiang.jpg')
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      let result = this.items
      
      if (this.selectedCategory) {
        result = result.filter(item => item.category.includes(this.selectedCategory))
      }
      
      if (this.selectedCity) {
        result = result.filter(item => item.city === this.selectedCity)
      }
      
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(item => 
          item.title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword)
        )
      }
      
      return result
    }
  },
  methods: {
    handleSearch() {
      // 搜索逻辑已在computed中实现
    },
    resetFilters() {
      this.selectedCategory = ''
      this.selectedCity = ''
      this.searchKeyword = ''
    }
  },
  mounted() {
    // 使用jQuery实现搜索框动画
    if (window.$) {
      $(document).ready(function() {
        $('.search-input').on('focus', function() {
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
.category {
  min-height: 100vh;
  padding-top: 20px;
}

/* Search Section */
.search-section {
  background-color: var(--white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
  color: var(--text-color);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.search-input-group.focused {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
}

.search-icon {
  color: var(--gray);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

/* Results Section */
.results-section {
  margin-top: 30px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.results-count {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
}

.view-toggle {
  display: flex;
  gap: 10px;
}

.toggle-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 20px;
}

.toggle-icon:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.toggle-icon.active {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

/* Grid View */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

/* List View */
.list-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-view .heritage-item {
  display: flex;
  flex-direction: row;
}

.list-view .item-image {
  width: 300px;
  height: 200px;
  flex-shrink: 0;
}

.list-view .item-content {
  flex: 1;
}

/* Heritage Item */
.heritage-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.heritage-item:hover {
  transform: translateY(-5px);
}

.item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.heritage-item:hover .item-image img {
  transform: scale(1.1);
}

.item-content {
  padding: 20px;
}

.item-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-color);
}

.item-title-en {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 15px;
}

.item-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  color: var(--gray);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.meta-icon {
  color: var(--primary-color);
}

.item-description {
  color: var(--gray);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-sm {
  padding: 8px 20px;
  font-size: 14px;
}
</style>

