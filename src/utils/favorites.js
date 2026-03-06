// 用户收藏管理（使用 localStorage 按用户存储）

// 获取某用户的收藏列表
export function getFavorites(userId) {
  if (!userId) return []
  const data = localStorage.getItem(`favorites_${userId}`)
  return data ? JSON.parse(data) : []
}

function saveFavorites(userId, list) {
  if (!userId) return
  localStorage.setItem(`favorites_${userId}`, JSON.stringify(list))
}

// 判断是否已收藏
export function isFavorite(userId, heritageId) {
  if (!userId) return false
  const list = getFavorites(userId)
  return list.some(item => item.id === heritageId)
}

// 切换收藏状态
export function toggleFavorite(userId, heritageItem) {
  if (!userId) {
    return { success: false, message: '请先登录' }
  }
  const list = getFavorites(userId)
  const index = list.findIndex(item => item.id === heritageItem.id)

  if (index >= 0) {
    list.splice(index, 1)
    saveFavorites(userId, list)
    return { success: true, isFavorite: false, favorites: list }
  } else {
    // 只保存必要信息
    const item = {
      id: heritageItem.id,
      title: heritageItem.title,
      location: heritageItem.location,
      image: heritageItem.image,
      tag: heritageItem.tag,
    }
    list.push(item)
    saveFavorites(userId, list)
    return { success: true, isFavorite: true, favorites: list }
  }
}


