import { type PropertyTranslations } from "@/util/TranslationTypes"


const components: PropertyTranslations = {
  internal: {
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
  },
  common: {
    "pos": "position",
    "_pos": {
      "x": "x",
      "y": "y",
    },
    "size": "størrelse",
    "_size": {
      "height": "højde",
      "width": "brede"
    }
  }
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
  "Properties": components,
} as const
export default translations
