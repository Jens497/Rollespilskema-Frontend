import { createI18n } from 'vue-i18n'
import type { Leaf } from '@/util/TypeKeysUtil'
import daDK from '@/i18n/da-DK.json'

type LocaleSchema = typeof daDK
export type Locale = 'da-DK'
export type LocalizationKey = Leaf<LocaleSchema>

export default createI18n<{ message: LocaleSchema}, Locale>({
  legacy: false,
  locale: 'da-DK',
  messages: {
    'da-DK': daDK,
  },
})
