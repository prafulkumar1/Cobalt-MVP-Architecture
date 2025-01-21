import {I18n} from "i18n-js"
import en from "./locales/en.json"
import es from "./locales/es.json"

const i18n = new I18n()
i18n.defaultLocale = "en"
i18n.enableFallback = true
i18n.translations = {en,es}

i18n.missingTranslation.get = (text) => i18n.t(text);

export const translate = (text:string) => i18n.t(text)

export default i18n;