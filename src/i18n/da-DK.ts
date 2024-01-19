import { type ComponentsTranslation } from "@/util/TranslationTypes"


const components: ComponentsTranslation = {
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
  "Info Circle": "Informationscirkel",
  "Box": "Boks",
  "_Box": {
    "border": "kant",
    "_border": {
      "style": "stil",
      "width": "brede"
    },
  },
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
  "Components": components,
} as const
export default translations
