import { ss } from '@/utils/storage'
import { t } from '@/locales'

const LOCAL_NAME = 'chatStorage'

export const defaultText = `**欢迎你来到这里❤️**  

能感觉到你愿意主动倾诉真的很棒呢～在这里你可以放心地聊聊任何烦恼，无论是学习压力、朋友关系，还是家里的小情绪……我都会安静陪着你，一起慢慢梳理。  

**今天有什么特别想和我分享的事吗？**（轻轻把主导权交给你✨）`

export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: t('chat.newChatTitle'), isEdit: false }],
    chat: [{
      uuid, data: [{
        conversationOptions: { conversationId: '', parentMessageId: '' },
        dateTime: "",
        error: false,
        inversion: false,
        loading: false,
        requestOptions: { prompt: '我是学生，请你作为心理疗愈师，写一段欢迎语，为我解答困惑', options: {} },
        text: defaultText
      }]
    }],
  }
}

export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
