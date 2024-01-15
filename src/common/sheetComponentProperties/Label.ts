import { PropertyTypeKinds as Kind, SheetComponentPropertyTypeDefinition, SheetComponentType } from "@/common/sheetComponent";

export const properties = {
  text: {
    kind: Kind.String,
    default: "Empty Label"
  },
  font: {
    kind: Kind.Object,
    // "color": {
    //     "kind": "kind_enum",
    //     "values": {
    //         "Red": "#ff0000",
    //         "Green": "#00ff00",
    //         "Blue": "#0000ff"
    //     },
    //     "default": "#ff0000"
    // },
    default: {
      size: {
        kind: Kind.Number,
        default: 40
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
