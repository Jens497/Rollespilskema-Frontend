import { type PropertyFieldTranslation, ObjectSheetComponentProperty } from "@/common/sheetComponent"
import { type ComponentTypeFieldsMap, type SheetComponentType, type SheetComponent } from "@/common/sheetComponentDefinitions";
import { CommonProperties } from "@/common/sheetComponentProperties/Common";

type InternalProperties<T extends { "propertyTypes": SheetComponentType["propertyTypes"] }> = T["propertyTypes"]["internal"];

type EmptyProperties = {
  [key in keyof ComponentTypeFieldsMap as `${keyof InternalProperties<ComponentTypeFieldsMap[key]> extends never ? key : never}`]: string
};
type WithProperties = {
  [key in keyof ComponentTypeFieldsMap as
  `${keyof InternalProperties<ComponentTypeFieldsMap[key]> extends never ? never : key}`]: ObjectSheetComponentProperty<InternalProperties<ComponentTypeFieldsMap[key]>>
};

type KeyTranslation = PropertyFieldTranslation<WithProperties> & EmptyProperties;

type ComponentsTranslation<T extends KeyTranslation = KeyTranslation> = T extends any ? { [key in keyof T]: T[key] } : never;
type CommonPropertyTranslation = PropertyFieldTranslation<CommonProperties>

type PropertyKeyed<T> = T extends { [key in keyof SheetComponent["properties"]]: unknown } ? T : never;

export type PropertyTranslations = PropertyKeyed<{
  internal: ComponentsTranslation,
  common: CommonPropertyTranslation
}>
