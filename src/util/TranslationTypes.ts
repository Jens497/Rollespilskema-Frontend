import { type PropertyFieldTranslation, ObjectSheetComponentProperty } from "@/common/sheetComponent"
import { ComponentTypeFieldsMap } from "@/common/sheetComponentTypes";

type EmptyProperties = {
  [key in keyof ComponentTypeFieldsMap as `${keyof ComponentTypeFieldsMap[key]["propertyTypes"] extends never ? key : never}`]: string
};
type WithProperties = {
  [key in keyof ComponentTypeFieldsMap as `${keyof ComponentTypeFieldsMap[key]["propertyTypes"] extends never ? never : key}`]: ObjectSheetComponentProperty<ComponentTypeFieldsMap[key]["propertyTypes"]>
};

type KeyTranslation = PropertyFieldTranslation<WithProperties> & EmptyProperties;

export type ComponentsTranslation<T extends KeyTranslation = KeyTranslation> = T extends any ? { [key in keyof T]: T[key] } : never // { [key in keyof ComponentTypeFields]: PropertyFieldTranslation<ComponentTypeFields[key]["propertyTypes"]> }
type Test = ComponentsTranslation<KeyTranslation>
const test: Test = {
  Label: "",
  Box: "",
  "Text Input": "",
  Line: "",
  Image: "",
  "Info Circle": "",
  _Label: {
    "font": "",
    "text": "",
    "_font": {
      "bold": "",
      "italic": "",
      "size": ""
    }
  }
}
