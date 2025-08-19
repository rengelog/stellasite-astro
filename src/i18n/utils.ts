import {en} from './en'
import {ja} from './ja'
import {config} from "@/config";
const ui = {
  ja, en
}
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    return ui[lang][key];
  }
}

export const t = useTranslations(config.lang)
