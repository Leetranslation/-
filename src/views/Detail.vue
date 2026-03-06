<template>
  <div class="detail">
    <Header />
    
    <div class="container">
      <div class="detail-content" v-if="heritage">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <span @click="$router.push('/')" class="breadcrumb-link">首页</span>
          <span class="breadcrumb-separator">/</span>
          <span @click="$router.push('/category')" class="breadcrumb-link">分类浏览</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ heritage.title }}</span>
        </div>

        <!-- Main Content Layout -->
        <div class="detail-layout">
          <!-- Left Column -->
          <div class="detail-left">
            <!-- Title and Tags -->
            <div class="detail-header">
              <h1 class="heritage-title">{{ heritage.title }}</h1>
              <div class="heritage-tags">
                <span class="tag" :class="heritage.tagClass">{{ heritage.tag }}</span>
                <span class="tag" :class="heritage.tagClass">{{ heritage.tag }}</span>
                <span class="tag tag-year">{{ heritage.year }}</span>
              </div>
              <div class="engagement-stats">
                <span class="stat-item">
                  <span class="stat-icon">👁️</span>
                  <span>{{ heritage.views }} 浏览</span>
                </span>
                <span class="stat-item">
                  <span class="stat-icon">❤️</span>
                  <span>{{ heritage.likes }} 收藏</span>
                </span>
                <span class="stat-item">
                  <span class="stat-icon">📤</span>
                  <span>{{ heritage.shares }} 分享</span>
                </span>
              </div>
            </div>

            <!-- Main Image with 360° Button -->
            <div class="main-image-section">
              <div class="main-image-wrapper">
                <img :src="heritage.images[currentImageIndex]" :alt="heritage.title" />
                <button class="panorama-btn-overlay" @click="showPanorama">
                  <span class="panorama-icon">🔄</span>
                  360°全景
                </button>
              </div>
              <div class="thumbnail-list">
                <div 
                  v-for="(img, index) in heritage.images" 
                  :key="index"
                  class="thumbnail"
                  :class="{ active: currentImageIndex === index }"
                  @click="changeImage(index)"
                >
                  <img :src="img" :alt="`${heritage.title} ${index + 1}`" />
                </div>
              </div>
            </div>

            <!-- Introduction Section -->
            <div class="info-panel">
              <h2 class="panel-title">简介</h2>
              <p class="panel-content">{{ heritage.introduction }}</p>
            </div>

            <!-- Historical Background -->
            <div class="info-panel">
              <h2 class="panel-title">历史背景</h2>
              <div class="timeline-items">
                <div 
                  v-for="(event, index) in heritage.history" 
                  :key="index"
                  class="timeline-item"
                >
                  <span class="timeline-year">{{ event.year }}</span>
                  <span class="timeline-event">{{ event.event }}</span>
                </div>
              </div>
            </div>

            <!-- Cultural Value Cards -->
            <div class="value-cards">
              <div class="value-card">
                <h3 class="value-title">文化价值</h3>
                <p class="value-content">{{ heritage.introduction }}</p>
              </div>
              <div class="value-card">
                <h3 class="value-title">历史价值</h3>
                <p class="value-content">{{ heritage.historicalValue }}</p>
              </div>
              <div class="value-card">
                <h3 class="value-title">艺术价值</h3>
                <p class="value-content">{{ heritage.artisticValue }}</p>
              </div>
            </div>

            <!-- Visitor Reviews -->
            <div class="reviews-section">
              <h2 class="panel-title">访客评论</h2>
              <div class="comment-form-section">
                <textarea 
                  v-model="newComment.content"
                  class="comment-textarea"
                  placeholder="分享你的感想..."
                  rows="3"
                ></textarea>
                <div class="comment-form-row">
                  <input 
                    type="text" 
                    v-model="newComment.author"
                    class="comment-author-input"
                    placeholder="您的昵称"
                  />
                  <button class="btn btn-primary comment-submit-btn" @click="addComment">发表评论</button>
                </div>
              </div>
              <div class="comments-list">
                <div 
                  v-for="comment in heritage.comments" 
                  :key="comment.id"
                  class="comment-item"
                >
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.author }}</span>
                    <span class="comment-date">{{ formatDate(comment.date) }}</span>
                  </div>
                  <p class="comment-content">{{ comment.content }}</p>
                  <div class="comment-actions">
                    <button class="comment-like-btn" @click="toggleLike(comment.id)">
                      <span>❤️</span>
                      <span>{{ comment.likes }}</span>
                    </button>
                    <button class="comment-reply-btn">回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="detail-right">
            <!-- Basic Information -->
            <div class="info-card">
              <h3 class="card-title">基本信息</h3>
              <div class="info-item">
                <span class="info-label">所在地:</span>
                <span class="info-value">{{ heritage.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">遗产类型:</span>
                <span class="info-value">{{ heritage.tag }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">保护级别:</span>
                <span class="info-value">{{ heritage.protectionLevel }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">建成年代:</span>
                <span class="info-value">{{ heritage.year }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">开放时间:</span>
                <span class="info-value">{{ heritage.openingHours }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <button 
                class="action-btn btn-collect" 
                :class="{ active: isFavorite }" 
                @click="handleToggleFavorite"
              >
                <span class="btn-icon">❤️</span>
                {{ isFavorite ? '已收藏' : '收藏' }}
              </button>
              <button class="action-btn btn-reserve" @click="$router.push('/reservation')">
                <span class="btn-icon">📅</span>
                预约参观
              </button>
              <button class="action-btn btn-share" @click="shareHeritage">
                <span class="btn-icon">📤</span>
                分享
              </button>
            </div>

            <!-- Related Recommendations -->
            <div class="related-section">
              <h3 class="card-title">相关推荐</h3>
              <div class="related-list">
                <div 
                  v-for="item in relatedItems" 
                  :key="item.id"
                  class="related-item"
                  @click="$router.push(`/detail/${item.id}`)"
                >
                  <img :src="item.image" :alt="item.title" class="related-image" />
                  <div class="related-info">
                    <h4 class="related-title">{{ item.title }}</h4>
                    <p class="related-city">{{ item.city }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 360° Panorama Modal -->
    <transition name="modal">
      <div v-if="showPanoramaModal" class="panorama-modal" @click="closePanorama">
        <div class="panorama-modal-content" @click.stop>
          <button class="modal-close" @click="closePanorama">×</button>
          <h2>360°全景展示</h2>
          <div class="panorama-viewer">
            <!-- 陈家祠使用真实360全景iframe -->
            <div v-if="heritage && heritage.id === 1" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.kuleiman.com/128424/355709"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 开平碉楼使用720云真实360全景 -->
            <div v-else-if="heritage && heritage.id === 2" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.720yun.com/t/62fj5pufra2?scene_id=10833922"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 潮州古城使用720云真实360全景 -->
            <div v-else-if="heritage && heritage.id === 4" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.720yun.com/t/6evkce8h0iw?scene_id=59824558"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 清远连南千年瑶寨使用720云真实360全景 -->
            <div v-else-if="heritage && heritage.id === 11" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.720yun.com/t/adejOzkkvk2?scene_id=3099611"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 深圳大鹏所城使用720云真实360全景 -->
            <div v-else-if="heritage && heritage.id === 17" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.720yun.com/t/2dvkO7dqpfm?scene_id=55406457"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 惠州西湖使用720云真实360全景 -->
            <div v-else-if="heritage && heritage.id === 18" class="panorama-iframe-container">
              <iframe 
                width="100%" 
                height="600" 
                frameborder="0" 
                scrolling="no" 
                src="https://www.720yun.com/t/0aa24qiOy4f?scene_id=980173"
                allowfullscreen
              ></iframe>
            </div>
            <!-- 其他文化遗产使用图片旋转效果 -->
            <div v-else>
            <div class="panorama-controls">
              <button class="panorama-btn" @click="rotatePanorama('left')">←</button>
              <button class="panorama-btn" @click="rotatePanorama('right')">→</button>
            </div>
            <div class="panorama-view" :style="{ transform: `rotateY(${panoramaRotation}deg)` }">
              <img :src="heritage.panoramaImage" :alt="heritage.title" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getCurrentUser } from '../utils/userDB.js'
import { isFavorite, toggleFavorite } from '../utils/favorites.js'

export default {
  name: 'Detail',
  components: {
    Header
  },
  data() {
    return {
      panoramaRotation: 0,
      currentImageIndex: 0,
      showPanoramaModal: false,
      isFavorite: false,
      newComment: {
        author: '',
        content: ''
      },
      heritage: null,
      heritageData: {
        1: {
          id: 1,
          title: '陈家祠',
          location: '广州荔湾区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '1894年',
          views: '12.5k',
          likes: '856',
          shares: '234',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '9:00-17:30 (具体时间请提前咨询)',
          introduction: '陈氏书院,俗称陈家祠,是广东规模最大、装饰华丽、保存完好的传统岭南祠堂式建筑。',
          historicalValue: '岭南建筑',
          artisticValue: '三雕三塑',
          panoramaImage: require('@/assets/images/chenjiaci.jpg'),
          images: [
            require('@/assets/images/chenjiaci.jpg')
          ],
          history: [
            { year: '1894年', event: '陈家祠建立' },
            { year: '现代', event: '成为重要文化遗产保护对象' }
          ],
          comments: [
            {
              id: 1,
              author: '文化爱好者',
              content: '陈家祠的建筑艺术令人叹为观止，每一处细节都体现了岭南建筑的精湛技艺，值得细细品味。',
              date: new Date('2024-12-01'),
              likes: 23
            },
            {
              id: 2,
              author: '历史研究者',
              content: '作为岭南建筑的代表作，陈家祠对于研究岭南文化具有重要的历史价值。',
              date: new Date('2024-11-28'),
              likes: 15
            }
          ]
        },
        2: {
          id: 2,
          title: '开平碉楼',
          location: '江门开平市',
          tag: '世界遗产',
          tagClass: 'tag-world',
          year: '明清时期',
          views: '18.3k',
          likes: '1245',
          shares: '456',
          protectionLevel: '世界文化遗产',
          openingHours: '8:00-18:00',
          introduction: '开平碉楼是中国乡土建筑的特殊类型,是集防卫、居住和中西建筑艺术于一体的多层塔楼式建筑。现存1833座,是中国华侨文化的纪念碑。',
          historicalValue: '华侨文化',
          artisticValue: '中西合璧',
          panoramaImage: require('@/assets/images/kaipingdiaolou.jpg'),
          images: [
            require('@/assets/images/kaipingdiaolou.jpg')
          ],
          history: [
            { year: '明清时期', event: '碉楼建筑兴起' },
            { year: '2007年', event: '列入世界文化遗产名录' }
          ],
          comments: [
            {
              id: 1,
              author: '建筑爱好者',
              content: '开平碉楼融合了中西方建筑风格，每一座都有独特的故事，是华侨文化的珍贵见证。',
              date: new Date('2024-12-02'),
              likes: 45
            }
          ]
        },
        3: {
          id: 3,
          title: '光孝寺',
          location: '广州越秀区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '唐代',
          views: '9.8k',
          likes: '674',
          shares: '189',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:00-17:00',
          introduction: '广州最古老的佛教寺院,禅宗六祖惠能在此受戒,有"未有羊城,先有光孝"之说。',
          historicalValue: '佛教文化',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/guangxiaosi.jpg'),
          images: [
            require('@/assets/images/guangxiaosi.jpg')
          ],
          history: [
            { year: '唐代', event: '光孝寺建立' },
            { year: '现代', event: '成为重要佛教文化保护单位' }
          ],
          comments: []
        },
        4: {
          id: 4,
          title: '潮州古城',
          location: '潮州湘桥区',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '明清时期',
          views: '15.2k',
          likes: '982',
          shares: '312',
          protectionLevel: '历史文化名城',
          openingHours: '全天开放',
          introduction: '千年古城,潮汕文化发源地,保存完好的明清古建筑群。',
          historicalValue: '潮汕文化',
          artisticValue: '古建筑群',
          panoramaImage: require('@/assets/images/chaozhougucheng.jpg'),
          images: [
            require('@/assets/images/chaozhougucheng.jpg')
          ],
          history: [
            { year: '明清时期', event: '古城建筑群形成' },
            { year: '现代', event: '成为历史文化名城' }
          ],
          comments: []
        },
        5: {
          id: 5,
          title: '佛山祖庙',
          location: '佛山禅城区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '北宋时期',
          views: '10.5k',
          likes: '723',
          shares: '198',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:30-18:00',
          introduction: '佛山祖庙是供奉北帝的神庙,因居佛山诸庙之首,故称祖庙。是岭南地区保存最完整的古建筑群之一。',
          historicalValue: '岭南建筑',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/foshanzumiao.jpg'),
          images: [
            require('@/assets/images/foshanzumiao.jpg')
          ],
          history: [
            { year: '北宋时期', event: '祖庙建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        6: {
          id: 6,
          title: '粤剧艺术',
          location: '广东省',
          tag: '非物质文化遗产',
          tagClass: 'tag-intangible',
          year: '清末民初',
          views: '9.8k',
          likes: '674',
          shares: '210',
          protectionLevel: '世界非物质文化遗产',
          openingHours: '演出时间依场馆而定',
          introduction: '粤剧是起源于广东的传统戏曲艺术,以唱腔婉转、表演细腻著称,被誉为\"南国红豆\"。2009年,粤剧被列入联合国教科文组织人类非物质文化遗产代表作名录。',
          historicalValue: '反映岭南地区社会生活与民间信仰,是研究近代岭南文化的重要资料。',
          artisticValue: '集唱、做、念、打于一体,融会服饰、音乐、舞美等多种艺术形式,具有鲜明的地域特色。',
          panoramaImage: require('@/assets/images/yuejuyishu.jpg'),
          images: [
            require('@/assets/images/yuejuyishu.jpg')
          ],
          history: [
            { year: '清末', event: '粤剧在广州、佛山一带逐渐成熟' },
            { year: '近现代', event: '粤剧在香港、海外华人社会广泛传播' },
            { year: '2009年', event: '被列入人类非物质文化遗产代表作名录' }
          ],
          comments: []
        },
        7: {
          id: 7,
          title: '肇庆古城墙',
          location: '肇庆端州区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '宋代',
          views: '8.2k',
          likes: '567',
          shares: '145',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '全天开放',
          introduction: '肇庆古城墙是广东省唯一保存完整的宋代城墙,具有重要的历史价值和建筑艺术价值,是研究古代城市防御体系的重要实物。',
          historicalValue: '古代城市防御',
          artisticValue: '城墙建筑艺术',
          panoramaImage: require('@/assets/images/zhaoqingguchengqiang.jpg'),
          images: [
            require('@/assets/images/zhaoqingguchengqiang.jpg')
          ],
          history: [
            { year: '宋代', event: '古城墙建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        8: {
          id: 8,
          title: '梅州松口古镇',
          location: '梅州梅县区',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '明清时期',
          views: '7.5k',
          likes: '489',
          shares: '123',
          protectionLevel: '历史文化名镇',
          openingHours: '全天开放',
          introduction: '松口古镇是著名的侨乡古镇,保存了大量明清时期的古建筑,是客家文化的重要载体,见证了客家人下南洋的历史。',
          historicalValue: '客家文化',
          artisticValue: '传统建筑群',
          panoramaImage: require('@/assets/images/meizhou.jpg'),
          images: [
            require('@/assets/images/meizhou.jpg')
          ],
          history: [
            { year: '明清时期', event: '古镇形成' },
            { year: '现代', event: '成为历史文化名镇' }
          ],
          comments: []
        },
        9: {
          id: 9,
          title: '韶关南华禅寺',
          location: '韶关曲江区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '南北朝',
          views: '12.8k',
          likes: '892',
          shares: '234',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:00-17:00',
          introduction: '南华禅寺是禅宗六祖惠能弘扬"南宗禅法"的发源地,被誉为"禅宗祖庭",是中国佛教名寺之一,具有深厚的佛教文化底蕴。',
          historicalValue: '佛教文化',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/shaoguan.jpg'),
          images: [
            require('@/assets/images/shaoguan.jpg')
          ],
          history: [
            { year: '南北朝', event: '南华禅寺建立' },
            { year: '唐代', event: '六祖惠能在此弘法' }
          ],
          comments: []
        },
        10: {
          id: 10,
          title: '中山孙中山故居纪念馆',
          location: '中山翠亨村',
          tag: '历史建筑',
          tagClass: 'tag-ancient',
          year: '1866年',
          views: '15.6k',
          likes: '1123',
          shares: '456',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '9:00-17:00',
          introduction: '孙中山故居纪念馆是伟大的民主革命先行者孙中山先生的出生地,是重要的爱国主义教育基地,展现了孙中山先生的革命历程。',
          historicalValue: '革命历史',
          artisticValue: '传统建筑',
          panoramaImage: require('@/assets/images/zhongshan.jpg'),
          images: [
            require('@/assets/images/zhongshan.jpg')
          ],
          history: [
            { year: '1866年', event: '孙中山先生出生' },
            { year: '现代', event: '成为爱国主义教育基地' }
          ],
          comments: []
        },
        11: {
          id: 11,
          title: '清远连南千年瑶寨',
          location: '清远连南县',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '宋代',
          views: '9.3k',
          likes: '678',
          shares: '189',
          protectionLevel: '历史文化名村',
          openingHours: '8:00-18:00',
          introduction: '连南千年瑶寨是中国最古老的瑶族村寨之一,保存了完整的瑶族传统建筑和民俗文化,是研究瑶族文化的重要基地。',
          historicalValue: '瑶族文化',
          artisticValue: '传统建筑',
          panoramaImage: require('@/assets/images/qingyuan.jpg'),
          images: [
            require('@/assets/images/qingyuan.jpg')
          ],
          history: [
            { year: '宋代', event: '瑶寨形成' },
            { year: '现代', event: '成为历史文化名村' }
          ],
          comments: []
        },
        12: {
          id: 12,
          title: '湛江雷州古城',
          location: '湛江雷州市',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '唐代',
          views: '6.8k',
          likes: '445',
          shares: '112',
          protectionLevel: '历史文化名城',
          openingHours: '全天开放',
          introduction: '雷州古城是雷州半岛的历史文化名城,保存了丰富的古建筑和传统文化,是雷州文化的重要载体,展现了雷州半岛的历史变迁。',
          historicalValue: '雷州文化',
          artisticValue: '古建筑群',
          panoramaImage: require('@/assets/images/zhanjiang.jpg'),
          images: [
            require('@/assets/images/zhanjiang.jpg')
          ],
          history: [
            { year: '唐代', event: '雷州古城建立' },
            { year: '现代', event: '成为历史文化名城' }
          ],
          comments: []
        },
        13: {
          id: 13,
          title: '汕头澄海前美古村侨文化旅游区',
          location: '汕头澄海区',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '明清时期',
          views: '5.9k',
          likes: '389',
          shares: '98',
          protectionLevel: '历史文化名村',
          openingHours: '8:00-18:00',
          introduction: '前美古村是著名的侨乡古村落,保存了大量精美的潮汕传统建筑,展现了侨乡文化的独特魅力,是研究侨乡文化的重要基地。',
          historicalValue: '侨乡文化',
          artisticValue: '潮汕建筑',
          panoramaImage: require('@/assets/images/shantou.jpg'),
          images: [
            require('@/assets/images/shantou.jpg')
          ],
          history: [
            { year: '明清时期', event: '古村形成' },
            { year: '现代', event: '成为侨文化旅游区' }
          ],
          comments: []
        },
        14: {
          id: 14,
          title: '河源佗城古镇',
          location: '河源龙川县',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '秦代',
          views: '7.2k',
          likes: '512',
          shares: '134',
          protectionLevel: '历史文化名镇',
          openingHours: '全天开放',
          introduction: '佗城古镇是岭南地区保存最完整的古城之一,有着2000多年的历史,是客家文化的重要发源地,见证了岭南地区的历史变迁。',
          historicalValue: '客家文化',
          artisticValue: '古建筑群',
          panoramaImage: require('@/assets/images/heyuan.jpg'),
          images: [
            require('@/assets/images/heyuan.jpg')
          ],
          history: [
            { year: '秦代', event: '佗城建立' },
            { year: '现代', event: '成为历史文化名镇' }
          ],
          comments: []
        },
        15: {
          id: 15,
          title: '云浮国恩寺',
          location: '云浮新兴县',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '唐代',
          views: '11.4k',
          likes: '756',
          shares: '201',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:00-17:30',
          introduction: '国恩寺是禅宗六祖惠能的出生地和圆寂地,是中国禅宗的重要祖庭,具有深厚的佛教文化底蕴,是研究禅宗文化的重要场所。',
          historicalValue: '佛教文化',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/yunfu.jpg'),
          images: [
            require('@/assets/images/yunfu.jpg')
          ],
          history: [
            { year: '唐代', event: '国恩寺建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        16: {
          id: 16,
          title: '汕尾玄武山元山寺',
          location: '汕尾陆丰市',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '明代',
          views: '8.7k',
          likes: '623',
          shares: '167',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '7:00-18:00',
          introduction: '玄武山元山寺是粤东地区重要的宗教文化圣地,集佛教、道教、儒教于一体,是潮汕地区重要的文化遗产,展现了多元宗教文化的融合。',
          historicalValue: '宗教文化',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/shanwei.jpg'),
          images: [
            require('@/assets/images/shanwei.jpg')
          ],
          history: [
            { year: '明代', event: '元山寺建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        17: {
          id: 17,
          title: '深圳大鹏所城',
          location: '深圳大鹏新区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '明代',
          views: '13.5k',
          likes: '987',
          shares: '312',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '9:00-17:30',
          introduction: '大鹏所城是明清两代中国海防的军事要塞,是深圳地区保存最完整的古建筑群,具有重要的历史价值,是研究古代海防体系的重要实物。',
          historicalValue: '海防历史',
          artisticValue: '军事建筑',
          panoramaImage: require('@/assets/images/shenzhen.jpg'),
          images: [
            require('@/assets/images/shenzhen.jpg')
          ],
          history: [
            { year: '明代', event: '大鹏所城建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        18: {
          id: 18,
          title: '惠州西湖',
          location: '惠州惠城区',
          tag: '历史景观',
          tagClass: 'tag-historic',
          year: '宋代',
          views: '14.2k',
          likes: '1056',
          shares: '389',
          protectionLevel: '国家重点风景名胜区',
          openingHours: '全天开放',
          introduction: '惠州西湖是广东著名的风景名胜区,有着深厚的历史文化底蕴,是苏东坡等文人墨客的游览胜地,被誉为"岭南名湖"。',
          historicalValue: '历史文化',
          artisticValue: '园林艺术',
          panoramaImage: require('@/assets/images/huizhou.jpg'),
          images: [
            require('@/assets/images/huizhou.jpg')
          ],
          history: [
            { year: '宋代', event: '西湖形成' },
            { year: '现代', event: '成为国家重点风景名胜区' }
          ],
          comments: []
        },
        19: {
          id: 19,
          title: '东莞可园',
          location: '东莞莞城区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '清代',
          views: '9.6k',
          likes: '689',
          shares: '198',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:30-17:30',
          introduction: '可园是广东四大名园之一,是清代岭南园林建筑的典型代表,以其精巧的布局和精美的建筑艺术著称,是研究岭南园林的重要实例。',
          historicalValue: '园林文化',
          artisticValue: '园林建筑',
          panoramaImage: require('@/assets/images/donguan.jpg'),
          images: [
            require('@/assets/images/donguan.jpg')
          ],
          history: [
            { year: '清代', event: '可园建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        20: {
          id: 20,
          title: '汕头达濠古城',
          location: '汕头濠江区',
          tag: '历史街区',
          tagClass: 'tag-historic',
          year: '清代',
          views: '5.3k',
          likes: '356',
          shares: '89',
          protectionLevel: '历史文化名城',
          openingHours: '全天开放',
          introduction: '达濠古城是潮汕地区保存较为完整的古城之一,展现了潮汕传统建筑风格和历史文化特色,是研究潮汕文化的重要载体。',
          historicalValue: '潮汕文化',
          artisticValue: '传统建筑',
          panoramaImage: require('@/assets/images/haodagucheng.jpg'),
          images: [
            require('@/assets/images/haodagucheng.jpg')
          ],
          history: [
            { year: '清代', event: '达濠古城建立' },
            { year: '现代', event: '成为历史文化名城' }
          ],
          comments: []
        },
        21: {
          id: 21,
          title: '揭阳双峰寺',
          location: '揭阳榕城区',
          tag: '古建筑',
          tagClass: 'tag-ancient',
          year: '宋代',
          views: '7.8k',
          likes: '534',
          shares: '145',
          protectionLevel: '全国重点文物保护单位',
          openingHours: '8:00-17:00',
          introduction: '双峰寺是潮汕地区重要的佛教寺院,有着悠久的历史和深厚的文化底蕴,是潮汕佛教文化的重要载体,展现了潮汕地区的宗教文化特色。',
          historicalValue: '佛教文化',
          artisticValue: '古建筑艺术',
          panoramaImage: require('@/assets/images/jieyang.jpg'),
          images: [
            require('@/assets/images/jieyang.jpg')
          ],
          history: [
            { year: '宋代', event: '双峰寺建立' },
            { year: '现代', event: '成为重要文物保护单位' }
          ],
          comments: []
        },
        22: {
          id: 22,
          title: '阳江阳春崆峒岩',
          location: '阳江阳春市',
          tag: '历史景观',
          tagClass: 'tag-historic',
          year: '明代',
          views: '6.5k',
          likes: '478',
          shares: '123',
          protectionLevel: '国家重点风景名胜区',
          openingHours: '8:00-17:30',
          introduction: '崆峒岩是阳春著名的风景名胜区,以其独特的喀斯特地貌和丰富的历史文化遗迹而闻名,是岭南地区重要的自然文化遗产,展现了自然与人文的完美结合。',
          historicalValue: '历史文化',
          artisticValue: '自然景观',
          panoramaImage: require('@/assets/images/yangjiang.jpg'),
          images: [
            require('@/assets/images/yangjiang.jpg')
          ],
          history: [
            { year: '明代', event: '崆峒岩开发' },
            { year: '现代', event: '成为国家重点风景名胜区' }
          ],
          comments: []
        }
      },
      relatedItems: [
        {
          id: 5,
          title: '佛山祖庙',
          city: '佛山市',
          image: require('@/assets/images/foshanzumiao.jpg')
        },
        {
          id: 2,
          title: '开平碉楼',
          city: '江门市',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200'
        },
        {
          id: 4,
          title: '潮州古城',
          city: '潮州市',
          image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200'
        }
      ]
    }
  },
  mounted() {
    const id = parseInt(this.$route.params.id)
    this.heritage = this.heritageData[id] || this.heritageData[1]
    this.refreshFavoriteStatus()

    // 进入详情页时滚动到页面顶端
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    }
    
    // 使用jQuery实现图片轮播
    if (window.$) {
      $(document).ready(() => {
        $('.thumbnail').on('click', function() {
          $('.thumbnail').removeClass('active')
          $(this).addClass('active')
        })
      })
    }
  },
  methods: {
    refreshFavoriteStatus() {
      const user = getCurrentUser()
      if (!user || !this.heritage) {
        this.isFavorite = false
        return
      }
      this.isFavorite = isFavorite(user.id, this.heritage.id)
    },
    handleToggleFavorite() {
      const user = getCurrentUser()
      if (!user) {
        alert('请先登录后再收藏')
        this.$router.push('/login')
        return
      }
      if (!this.heritage) return
      const result = toggleFavorite(user.id, {
        id: this.heritage.id,
        title: this.heritage.title,
        location: this.heritage.location,
        image: this.heritage.images?.[0],
        tag: this.heritage.tag
      })
      if (result.success) {
        this.isFavorite = result.isFavorite
        alert(this.isFavorite ? '已加入收藏' : '已取消收藏')
      } else {
        alert(result.message || '操作失败')
      }
    },
    changeImage(index) {
      this.currentImageIndex = index
    },
    showPanorama() {
      this.showPanoramaModal = true
    },
    closePanorama() {
      this.showPanoramaModal = false
    },
    rotatePanorama(direction) {
      if (direction === 'left') {
        this.panoramaRotation -= 30
      } else {
        this.panoramaRotation += 30
      }
    },
    toggleCollect() {
      // 保留旧接口，内部调用新的收藏逻辑
      this.handleToggleFavorite()
    },
    shareHeritage() {
      alert('分享功能')
    },
    addComment() {
      if (!this.newComment.author || !this.newComment.content) {
        alert('请填写昵称和评论内容')
        return
      }
      const comment = {
        id: Date.now(),
        author: this.newComment.author,
        content: this.newComment.content,
        date: new Date(),
        likes: 0
      }
      this.heritage.comments.unshift(comment)
      this.newComment = { author: '', content: '' }
    },
    toggleLike(commentId) {
      const comment = this.heritage.comments.find(c => c.id === commentId)
      if (comment) {
        comment.likes++
      }
    },
    formatDate(date) {
      return date.toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.detail {
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
  background-color: var(--gray-light);
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--gray);
}

.breadcrumb-link {
  color: var(--primary-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #a00d25;
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
}

.breadcrumb-current {
  color: var(--text-color);
}

/* Detail Layout */
.detail-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

/* Left Column */
.detail-left {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-header {
  background-color: var(--white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.heritage-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-color);
}

.heritage-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  background-color: var(--primary-color);
}

.tag-ancient {
  background-color: #8b4513;
}

.tag-world {
  background-color: #ff6b6b;
}

.tag-year {
  background-color: var(--gray);
}

.engagement-stats {
  display: flex;
  gap: 30px;
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

/* Main Image Section */
.main-image-section {
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-image-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.main-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panorama-btn-overlay {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.panorama-btn-overlay:hover {
  background-color: #a00d25;
  transform: translateY(-2px);
}

.panorama-icon {
  font-size: 18px;
}

.thumbnail-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.thumbnail:hover {
  border-color: var(--primary-color);
  transform: scale(1.1);
}

.thumbnail.active {
  border-color: var(--primary-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Panels */
.info-panel {
  background-color: var(--white);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-color);
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary-color);
}

.panel-content {
  line-height: 1.8;
  color: var(--text-color);
  font-size: 15px;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background-color: var(--gray-light);
  border-radius: 4px;
}

.timeline-year {
  font-weight: bold;
  color: var(--primary-color);
  min-width: 100px;
}

.timeline-event {
  color: var(--text-color);
}

/* Value Cards */
.value-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.value-card {
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.value-content {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.6;
}

/* Reviews Section */
.reviews-section {
  background-color: var(--white);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.comment-form-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--gray-light);
  border-radius: 8px;
}

.comment-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 10px;
}

.comment-form-row {
  display: flex;
  gap: 10px;
}

.comment-author-input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.comment-submit-btn {
  padding: 10px 20px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  padding: 15px;
  background-color: var(--gray-light);
  border-radius: 8px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: 600;
  color: var(--primary-color);
}

.comment-date {
  font-size: 12px;
  color: var(--gray);
}

.comment-content {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 10px;
}

.comment-actions {
  display: flex;
  gap: 15px;
}

.comment-like-btn,
.comment-reply-btn {
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
}

.comment-like-btn:hover,
.comment-reply-btn:hover {
  color: var(--primary-color);
}

/* Right Column */
.detail-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background-color: var(--white);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-color);
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary-color);
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--gray);
  font-size: 14px;
}

.info-value {
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-collect {
  background-color: var(--primary-color);
  color: white;
}

.btn-collect.active {
  background-color: #a00d25;
  box-shadow: 0 4px 10px rgba(200, 16, 46, 0.2);
}

.btn-collect:hover {
  background-color: #a00d25;
}

.btn-reserve {
  background-color: var(--primary-color);
  color: white;
}

.btn-reserve:hover {
  background-color: #a00d25;
}

.btn-share {
  background-color: var(--gray);
  color: white;
}

.btn-share:hover {
  background-color: #5a6268;
}

.btn-icon {
  font-size: 18px;
}

/* Related Section */
.related-section {
  background-color: var(--white);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-item {
  display: flex;
  gap: 15px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.related-item:hover {
  background-color: var(--gray-light);
}

.related-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.related-info {
  flex: 1;
}

.related-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-color);
}

.related-city {
  font-size: 13px;
  color: var(--gray);
}

/* Panorama Modal */
.panorama-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panorama-modal-content {
  position: relative;
  background-color: var(--white);
  padding: 30px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  color: var(--gray);
  cursor: pointer;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.panorama-viewer {
  position: relative;
  width: 800px;
  height: 500px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.panorama-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
}

.panorama-btn {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
}

.panorama-btn:hover {
  background-color: var(--white);
  transform: scale(1.1);
}

.panorama-view {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.panorama-view img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panorama-iframe-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
}

.panorama-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 968px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  
  .value-cards {
    grid-template-columns: 1fr;
  }
}
</style>
