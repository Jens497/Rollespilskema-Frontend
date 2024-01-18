import {
  booleanProperty,
  numberProperty,
  objectProperty,
  stringProperty
} from "@/common/sheetComponent";

export const properties = {
  text: stringProperty("Empty Label"),
  font: objectProperty({
    size: numberProperty(14),
    bold: booleanProperty(false),
    italic: booleanProperty(false),
  })
};


export type Properties = typeof properties;
