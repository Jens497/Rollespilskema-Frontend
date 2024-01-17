import { PropertyTypeKinds as Kind, SheetComponentPropertyTypeDefinition } from "@/common/sheetComponent";



export const properties = {
  size: {
    kind: Kind.Object,
    defaultValue: {
      height: {
        kind: Kind.Number,
        defaultValue: 100
      },
      // width: {
      //   kind: Kind.Number,
      //   default: 100
      // }
    }
  },
  border: {
    kind: Kind.Object,
    defaultValue: {
      width: {
        kind: Kind.Number,
        defaultValue: 14
      },
      style: {
        kind: Kind.Enum,
        values: {
          None: "none",
          Hidden: "hidden",
          Dotted: "dotted",
          Dashed: "dashed",
          Solid: "solid",
          Double: "double",
          Groove: "groove",
          Ridge: "ridge",
          Inset: "inset",
          Outset: "outset",
        },
        defaultValue: "solid"
      },
    }
  }
} as const;

type _Properties = typeof properties
export interface Properties extends SheetComponentPropertyTypeDefinition, _Properties {

}
