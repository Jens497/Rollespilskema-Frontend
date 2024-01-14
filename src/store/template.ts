import { SheetComponent, SheetComponentType, componentTypesToModels } from "@/common/sheetComponent";
import { defineStore } from "pinia";
import imgUrl from '@/assets/logo.png';
import { properties as labelProperties } from "@/common/Label"

export const useTemplateStore = defineStore('template', {
  state: () => ({
    componentTypes: [] as SheetComponentType[],
    templates: {} as { [key: string]: SheetComponent[] },
  }),
  actions: {
    createDummyData(): SheetComponent[] {
      // TODO fix propertyTypes being empty
      this.componentTypes = [
        {
          name: "Box",
          image: imgUrl,
          propertyTypes: {},
        },
        {
          name: "Label",
          image: imgUrl,
          propertyTypes: labelProperties,
        },
        {
          name: "Text Input",
          image: imgUrl,
          propertyTypes: {},
        },
        {
          name: "Line",
          image: imgUrl,
          propertyTypes: {},
        },
        {
          name: "Image",
          image: imgUrl,
          propertyTypes: {},
        },
        {
          name: "Info Circle",
          image: imgUrl,
          propertyTypes: {},
        },
      ]

      return componentTypesToModels(this.componentTypes).map((comp, i) => { comp.pos.x += 100 * i; comp.pos.y += 100 * i; return comp })
    }

  }
})
