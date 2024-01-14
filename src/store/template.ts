import { SheetComponent, SheetComponentType, componentTypesToModels, isSheetComponentProperties } from "@/common/sheetComponent";
import { defineStore } from "pinia";
import imgUrl from '@/assets/logo.png';
import labelProperties from "@/common/Label.json"

export const useTemplateStore = defineStore('template', {
  state: () => ({
    componentTypes: [] as SheetComponentType[],
    templates: {} as { [key: string ]: SheetComponent[] },
  }),
  actions: {
    createDummyData(): SheetComponent[] {
      // TODO fix propertyTypes being empty
      this.componentTypes = [
        {
          name: "Box",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
        {
          name: "Label",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
        {
          name: "Text Input",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
        {
          name: "Line",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
        {
          name: "Image",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
        {
          name: "Info Circle",
          image: imgUrl,
          propertyTypes: isSheetComponentProperties(labelProperties) ? labelProperties : {},
        },
      ]

      return componentTypesToModels(this.componentTypes).map((comp, i) => { comp.pos.x += 100 * i; comp.pos.y += 100 * i; return comp})
    }

  }
})
