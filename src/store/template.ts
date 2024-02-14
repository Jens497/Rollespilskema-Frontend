import { componentTypesToModels, COMPONENT_TYPES, SheetComponent } from "@/common/sheetComponentDefinitions";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export type Template = { name: string, components: Record<string, SheetComponent> }
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
    createDummyData(id: string): Template {
      if (this.templates[id] == undefined) {
        const components = componentTypesToModels(this.componentTypes).reduce((acc, comp, i) => {
          comp.properties.common.pos.value.x.value += 100 * i;
          comp.properties.common.pos.value.y.value += 100 * i;
          const id = crypto.randomUUID();
          return { ...acc, ...{ [id]: comp } };
        }, {})

        this.templates[id] = { name: "dummy", components }
      }

      return this.templates[id]
    },
    createTemplate(templateId: string) {
      if (this.templates[templateId] != undefined) {
        throw new Error("Cannot create template: Duplicate keys not allowed")
      }
      const { t } = useI18n()
      this.$patch({ templates: { [templateId]: { name: t("view.templateEditor.template.defaultName"), components: {} } } })
    },
  },
  persist: {
    storage: sessionStorage
  }
})
