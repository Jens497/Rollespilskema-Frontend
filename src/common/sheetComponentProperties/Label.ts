import { PropertyTypeKinds as Kind, SheetComponentPropertyTypeDefinition } from "@/common/sheetComponent";

export const properties = {
  text: {
    kind: Kind.String,
    defaultValue: "Empty Label"
  },
  font: {
    kind: Kind.Object,
    defaultValue: {
      size: {
        kind: Kind.Number,
        defaultValue: 14
      },
      bold: {
        kind: Kind.Boolean,
        defaultValue: false
      },
      italic: {
        kind: Kind.Boolean,
        defaultValue: false
      },
    }
  }
} as const;

type _Properties = typeof properties;
export interface Properties extends SheetComponentPropertyTypeDefinition, _Properties { }