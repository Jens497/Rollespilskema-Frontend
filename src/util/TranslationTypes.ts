import { type PropertyFieldTranslation, ObjectSheetComponentProperty } from "@/common/sheetComponent"
import { ComponentTypeFieldsMap } from "@/common/sheetComponentDefinitions";

type EmptyProperties = {
  [key in keyof ComponentTypeFieldsMap as `${keyof ComponentTypeFieldsMap[key]["propertyTypes"] extends never ? key : never}`]: string
};
type WithProperties = {
  [key in keyof ComponentTypeFieldsMap as `${keyof ComponentTypeFieldsMap[key]["propertyTypes"] extends never ? never : key}`]: ObjectSheetComponentProperty<ComponentTypeFieldsMap[key]["propertyTypes"]>
};

type KeyTranslation = PropertyFieldTranslation<WithProperties> & EmptyProperties;

export type ComponentsTranslation<T extends KeyTranslation = KeyTranslation> = T extends any ? { [key in keyof T]: T[key] } : never;
