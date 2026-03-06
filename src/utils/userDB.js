// 用户数据库管理（使用localStorage模拟数据库）

// 获取所有用户
export function getAllUsers() {
  const users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

// 保存所有用户
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

// 根据用户名查找用户
export function findUserByUsername(username) {
  const users = getAllUsers()
  return users.find(user => user.username === username)
}

// 根据邮箱查找用户
export function findUserByEmail(email) {
  const users = getAllUsers()
  return users.find(user => user.email === email)
}

// 注册新用户
export function registerUser(userData) {
  const users = getAllUsers()
  
  // 检查用户名是否已存在
  if (findUserByUsername(userData.username)) {
    return { success: false, message: '用户名已存在' }
  }
  
  // 检查邮箱是否已存在
  if (findUserByEmail(userData.email)) {
    return { success: false, message: '邮箱已被注册' }
  }
  
  // 创建新用户
  const newUser = {
    id: Date.now().toString(), // 使用时间戳作为ID
    username: userData.username,
    password: userData.password, // 实际项目中应该加密
    email: userData.email,
    phone: userData.phone,
    registerTime: new Date().toISOString()
  }
  
  users.push(newUser)
  saveUsers(users)
  
  return { success: true, message: '注册成功', user: newUser }
}

// 用户登录验证
export function loginUser(username, password) {
  const user = findUserByUsername(username)
  
  if (!user) {
    return { success: false, message: '用户名不存在' }
  }
  
  if (user.password !== password) {
    return { success: false, message: '密码错误' }
  }
  
  // 登录成功，保存当前用户信息（不包含密码）
  const currentUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
  
  return { success: true, message: '登录成功', user: currentUser }
}

// 获取当前登录用户
export function getCurrentUser() {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

// 退出登录
export function logout() {
  localStorage.removeItem('currentUser')
  return { success: true, message: '已退出登录' }
}

// 检查是否已登录
export function isLoggedIn() {
  return getCurrentUser() !== null
}




