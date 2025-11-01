import axios, { type AxiosResponse } from 'axios'
import { parseQueryString } from '../functions';
// import { useAuthStore } from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL_2,
})

// 获取完整的查询字符串（包含开头的 "?"）
const search = window.location.search; // "?chat_id=default&open_id=4VYg2gcHG8Z2RZKZ"

// 创建 URLSearchParams 实例（自动忽略开头的 "?"）
const urlParams = new URLSearchParams(search);

// 获取具体参数值
var chatId = (urlParams && urlParams.get('chat_id')) || (parseQueryString(search) && parseQueryString(search).chat_id) || 'default';
var openId = (urlParams && urlParams.get('open_id')) || (parseQueryString(search) && parseQueryString(search).open_id) || '4VYg2gcHG8Z2RZKZ'; 


console.log('chat_id:', chatId);
console.log('open_id:', openId);

service.interceptors.request.use(
  (config) => {
    // const token = useAuthStore().token
    config.headers['Content-Type'] = 'application/json'
    config.headers['open_id'] = openId || '4VYg2gcHG8Z2RZKZ'
    config.headers['chat_id'] = chatId || 'default'
    config.headers['org_id'] = 'sslns'
    // if (token)
    // config.headers.Authorization = `Bearer ${token}`
    // config.headers['Cookie'] = 'renren_token=a39f8196bb4707fc2d2380019ecfb9e8; Admin-Token=a39f8196bb4707fc2d2380019ecfb9e8; sidebarStatus=0; sensorsdata2015jssdkcrossZQSensorsObj=%7B%22distinct_id%22%3A%221987d10fe12e95-0c905447a34acc8-26011151-2073600-1987d10fe1314f7%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Fwww.clovsoft.com%2F%22%7D%2C%22%24device_id%22%3A%221987d10fe12e95-0c905447a34acc8-26011151-2073600-1987d10fe1314f7%22%7D'
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
