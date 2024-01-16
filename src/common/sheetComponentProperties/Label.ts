import { PropertyTypeKinds as Kind } from "@/common/sheetComponent";



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

export type Properties = typeof properties;
