import { componentTypesToModels, COMPONENT_TYPES } from "@/common/sheetComponentDefinitions";
import { defineStore } from "pinia";
import { type State as TemplateEditorState } from "@/store/templateEditor"

type Template = TemplateEditorState["template"]
interface State {
  templates: { [key: string]: Template },
}

export const useTemplateStore = defineStore('template', {
  state: (): State => ({
    templates: {},
  }),
  getters: {
    componentTypes: () => COMPONENT_TYPES
  },
  actions: {
    createDummyData(): Template {
      return componentTypesToModels(this.componentTypes).reduce((acc, comp, i) => {
        comp.properties.common.pos.value.x.value += 100 * i;
        comp.properties.common.pos.value.y.value += 100 * i;
        const id = crypto.randomUUID();
        return { ...acc, ...{ [id]: comp } };
      }, {})
    }

  }
})
