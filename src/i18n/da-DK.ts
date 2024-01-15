import { ComponentsTranslation } from "@/util/TranslationTypes"


const components: ComponentsTranslation = {
  "Box": "Boks",
  "Label": "Tekst",
  "_Label": {
    "font": "font",
    "text": "tekst",
    "_font": {
      "bold": "fed",
      "italic": "kursiv",
      "size": "størrelse",
    }
  },
  "Text Input": "Tekstfelt",
  "Image": "Billede",
  "Line": "Linje",
  "Info Circle": "Informationscirkel"
}

const translations = {
  "view": {
    "home": {
      "title": "Hjem"
    },
    "empty": {
      "title": "Tom test side"
    },
    "templateEditor": {
      "title": "Skabelon"
    }
  },
  "Components": components
} as const
export default translations

translations.Components._Label
