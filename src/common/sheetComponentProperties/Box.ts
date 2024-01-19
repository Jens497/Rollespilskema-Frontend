import { enumProperty, numberProperty, objectProperty } from "@/common/sheetComponent";
import { CommonPropertiesOverrides } from "./Common";

export const properties = {
  border: objectProperty({
    width: numberProperty(4),
    style: enumProperty({
      Solid: "solid",
      Dotted: "dotted",
      Dashed: "dashed",
      Double: "double",
      Groove: "groove",
      Ridge: "ridge",
      Inset: "inset",
      Outset: "outset"
    })
  })
}
export const commonOverrides: CommonPropertiesOverrides = {
  size: objectProperty({
    height: numberProperty(100),
    width: numberProperty(100),
  }),
}

export type Properties = typeof properties
