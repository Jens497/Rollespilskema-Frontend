import { enumProperty, numberProperty, objectProperty } from "@/common/sheetComponent";

export const properties = {
  size: objectProperty({
    height: numberProperty(100),
    width: numberProperty(100),
  }),
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

export type Properties = typeof properties
