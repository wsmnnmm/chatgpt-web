import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, post2 } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'
import { parseQueryString } from '@/utils/functions';

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  let data: Record<string, any> = {
    // prompt: params.prompt,
    // options: params.options,
    "messages": [
      {
        "role": "user",
        "content": params.prompt
      }
    ],
    stream: true,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
      withCredentials: true
    }
  }
  // 获取完整的查询字符串（包含开头的 "?"）
  const search = window.location.search; // "?chat_id=default&open_id=4VYg2gcHG8Z2RZKZ"

  // 创建 URLSearchParams 实例（自动忽略开头的 "?"）
  const urlParams = new URLSearchParams(search);

  // 获取具体参数值
  const chatId = urlParams.get('chat_id') || parseQueryString(search)?.chat_id || 'default'; // "default"
  const openId = urlParams.get('open_id') || parseQueryString(search)?.open_id || '4VYg2gcHG8Z2RZKZ'; // "4VYg2gcHG8Z2RZKZ"

  console.log(window.location, Location, 'chatId', chatId, 'openId', openId, parseQueryString(search))

  return post<T>({
    url: '/api/v1/chat/completions',
    data,
    signal: params.signal,
    headers: {
      'chat_id': chatId || 'default',
      'open_id': openId || '4VYg2gcHG8Z2RZKZ',
    },
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

export function chatLimit<T>(params: { userId: string }) {
  return post2<T>({
    url: '/smart-user-api/bs-ai-chat-limit/setLimit',
    data: params,
  })
}
