import {
  booleanProperty,
  enumProperty,
  numberProperty,
  objectProperty,
  stringProperty
} from "@/common/sheetComponent";
import { CommonPropertiesOverrides } from "./Common";

export const properties = {
  contents: objectProperty({
    text: stringProperty(),
    label: stringProperty(),
    hint: stringProperty(),
  }),
  behavior: objectProperty({
    inputType: enumProperty({
      number: "number",
      text: "text",
    }, "text"),
    multiLine: booleanProperty(),
  }),
  appearance: objectProperty({
    style: enumProperty({
      Filled: "filled",
      Outlined: "outlined",
      Plain: "plain",
      Underlined: "underlined",
      Solo: "solo",
      SoloInverted: "solo-inverted",
      SoloFilled: "solo-filled",
    }, "outlined"),
    font: objectProperty({
      size: numberProperty(14),
      bold: booleanProperty(false),
      italic: booleanProperty(false),
    }),
  }),
};

export const commonOverrides: CommonPropertiesOverrides = {
  size: objectProperty({
    height: numberProperty(85),
    width: numberProperty(100),
  }),
}


export type Properties = typeof properties;
