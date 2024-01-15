import { componentTypesToModels } from "@/common/sheetComponent";
import { defineStore } from "pinia";
import { type State as TemplateEditorState } from "@/store/templateEditor"
import { DEFAULT_COMPONENT_TYPES } from "@/common/sheetComponentTypes";

type Template = TemplateEditorState["template"]
interface State {
  templates: { [key: string]: Template },
}

export const useTemplateStore = defineStore('template', {
  state: (): State => ({
    templates: {},
  }),
  getters: {
    componentTypes: () => DEFAULT_COMPONENT_TYPES
  },
  actions: {
    createDummyData(): Template {
      return componentTypesToModels(this.componentTypes).reduce((acc, comp, i) => {
        comp.pos.x += 100 * i;
        comp.pos.y += 100 * i;
        const id = crypto.randomUUID();
        return { ...acc, ...{ [id]: comp } };
      }, {})
    }

  }
})
