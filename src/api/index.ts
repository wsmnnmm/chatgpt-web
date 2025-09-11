import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

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
      "content": "我被同学欺负了"
    }
  ],
    // messages: [
    //   {
    //     "type": "text",
    //     "text": "这是一个义务教育阶段的小孩，请对这些数据进行分析：[{\"subjectName\":\"数学\",\"score\":87},{\"subjectName\":\"语文\",\"score\":90},{\"subjectName\":\"英语\",\"score\":74.27},{\"subjectName\":\"物理\",\"score\":97},{\"subjectName\":\"生物\",\"score\":95},{\"subjectName\":\"地理\",\"score\":76},{\"subjectName\":\"体育\",\"score\":60},{\"subjectName\":\"总分\",\"score\":579.27}]"
    //   }
    // ],
    // model :"doubao",
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

  return post<T>({
    url: '/api/v1/chat/completions',
    data,
    signal: params.signal,
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
