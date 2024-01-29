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
        "_style": {
          "Solid": "Solid",
          "Dashed": "Striber",
          "Dotted": "Prikker",
          "Double": "Dobbelt",
          "Groove": "Rillet",
          "Inset": "Indsat",
          "Outset": "Udsat",
          "Ridge": "Bakket"
        },
        "width": "brede"
      },
    },
    "_Text Input": {
      "hint": "Forklarende tekst",
      "text": "tekst",
      "multiLine": "Flerelinjestekst",
      "label": "Felt navn",
      "font": "Font",
      "_font": {
        "bold": "Fed",
        "italic": "Kursiv",
        "size": "Størrelse"
      },
      "inputType": "indput type",
      "_inputType": {
        "number": "tal",
        "text": "tekst"
      },
      "style": "Stil",
      "_style": {
        "Filled": "Fyldt",
        "Outlined": "Outlined",
        "Plain": "Simpel",
        "Solo": "Enkel",
        "SoloFilled": "Enkel Fyldt",
        "SoloInverted": "Enkel omvendt",
        "Underlined": "Understreget"
      }
    }
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
    },
    "sheetViewer": {
      "title": "Skema"
    },
  },
  "Properties": components,
} as const
export default translations
