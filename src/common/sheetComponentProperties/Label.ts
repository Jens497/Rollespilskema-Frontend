import { PropertyTypeKinds as Kind, SheetComponentProperties, SheetComponentPropertyTypeDefinition } from "@/common/sheetComponent";

export const properties = {
  text: {
    kind: Kind.String,
    default: "Empty Label"
  },
  font: {
    kind: Kind.Object,
    default: {
      size: {
        kind: Kind.Number,
        default: 14
      },
      bold: {
        kind: Kind.Boolean,
        default: false
      },
      italic: {
        kind: Kind.Boolean,
        default: false
      },
    }
  }
} as const;

type _Properties = typeof properties;
export interface Properties extends SheetComponentPropertyTypeDefinition, _Properties { }
