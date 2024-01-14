import { SheetComponentType, componentTypesToModels } from "@/common/sheetComponent";
import { defineStore } from "pinia";
import imgUrl from '@/assets/logo.png';
import { properties as labelProperties } from "@/common/Label"
import { type State as TemplateEditorState } from "@/store/templateEditor"

type Template = TemplateEditorState["template"]
interface State {
  componentTypes: SheetComponentType[],
  templates: { [key: string]: Template },
}

export const useTemplateStore = defineStore('template', {
  state: (): State => ({
    componentTypes: [],
    templates: {},
  }),
  actions: {
    createDummyData(): Template {
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

      return componentTypesToModels(this.componentTypes).reduce((acc, comp, i) => {
        comp.pos.x += 100 * i;
        comp.pos.y += 100 * i;
        const id = crypto.randomUUID();
        return { ...acc, ...{ [id]: comp } };
      }, {})
    }

  }
})
