import { PropertyTypeKinds as Kind, SheetComponentPropertyTypeDefinition } from "@/common/sheetComponent";

export const properties = {
  pos: {
    kind: Kind.Object,
    defaultValue: {
      x: {
        kind: Kind.Number,
        defaultValue: 0
      },
      y: {
        kind: Kind.Number,
        defaultValue: 0
      }
    }
  },
  size: {
    kind: Kind.Object,
    defaultValue: {
      height: {
        kind: Kind.Number,
        defaultValue: 0
      },
      width: {
        kind: Kind.Number,
        defaultValue: 0
      }
    }
  }
} as const;

type _Properties = typeof properties;
export interface Properties extends SheetComponentPropertyTypeDefinition, _Properties { }
