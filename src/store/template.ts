import { SheetComponent, SheetComponentType, componentTypesToModels } from "@/common/sheetComponent";
import { defineStore } from "pinia";
import imgUrl from '@/assets/logo.png';

export const useTemplateStore = defineStore('template', {
  state: () => ({
    componentTypes: [] as SheetComponentType[],
    templates: {} as { [key: string ]: SheetComponent[] }
  }),
  actions: {
    createDummyData(): SheetComponent[] {
      this.componentTypes = [
        {
          name: "Box",
          image: imgUrl
        },
        {
          name: "Label",
          image: imgUrl
        },
        {
          name: "Text Input",
          image: imgUrl
        },
        {
          name: "Line",
          image: imgUrl
        },
        {
          name: "Image",
          image: imgUrl
        },
        {
          name: "Info Circle",
          image: imgUrl
        },
      ]

      return componentTypesToModels(this.componentTypes).map((comp, i) => { comp.pos.x += 100 * i; comp.pos.y += 100 * i; return comp})
    }
  }
})
