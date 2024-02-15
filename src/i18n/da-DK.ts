import { type PropertyTranslations } from "@/util/TranslationTypes"


const components: PropertyTranslations = {
  internal: {
    "Label": "Tekst",
    "_Label": {
      "text": "Tekst",
      "font": "Font",
      "_font": {
        "bold": "Fed",
        "italic": "Kursiv",
        "size": "Størrelse",
      }
    },
    "Image": "Billede",
    "Line": "Linje",
    "Info Circle": "Informationscirkel",
    "Box": "Boks",
    "_Box": {
      "border": "Kant",
      "_border": {
        "style": "Stil",
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
    "Text Input": "Tekstfelt",
    "_Text Input": {
      "contents": "Indhold",
      "_contents": {
        "hint": "Forklarende tekst",
        "text": "Tekst",
        "label": "Felt navn",
      },
      "appearance": "Udseende",
      "_appearance": {

        "font": "Font",
        "_font": {
          "bold": "Fed",
          "italic": "Kursiv",
          "size": "Størrelse"
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
      },
      "behavior": "Opførsel",
      "_behavior": {
        "multiLine": "Flerelinjestekst",
        "inputType": "Input type",
        "_inputType": {
          "number": "Tal",
          "text": "Tekst"
        },
      },
    }
  },
  common: {
    "pos": "Position",
    "_pos": {
      "x": "X",
      "y": "Y",
    },
    "size": "Størrelse",
    "_size": {
      "height": "Højde",
      "width": "Brede"
    }
  }
}

const translations = {
  "view": {
    "home": {
      "title": "Hjem",
      "templates": {
        "emptyText": "Der er endnu ikke oprettet en skabelon",
        "new": "Ny skabelon",
      },
      "sheets": {
        "emptyText": "Der er endnu ikke oprettet et skema",
        "new": "Nyt skema",
      }
    },
    "empty": {
      "title": "Tom test side"
    },
    "templateEditor": {
      "title": "Skabelon",
      "template": {
        "defaultName": "Ny Skabelon",
        "save": {
          "success": "Gemt Succesfult",
          "error": "Mislykkedes i at gemme"
        }
      },
    },
    "sheetViewer": {
      "title": "Skema"
    },
    "Login": {
      "title": "Login"
    },
    "CreateUser": {
      "title": "Opret Bruger"
    },
    "EditUser": {
      "title": "Opdater Bruger"
    }
  },
  "Properties": components,
} as const

export default translations
