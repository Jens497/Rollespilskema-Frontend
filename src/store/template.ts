import { componentTypesToModels, COMPONENT_TYPES, SheetComponent } from "@/common/sheetComponentDefinitions";
import useBackend, { TemplateDto } from "@/composables/useBackend";
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
      const template = { name: t("view.templateEditor.template.defaultName"), components: {} }

      this.$patch({ templates: { [templateId]: template } })

      const backend = useBackend()

      const data: TemplateDto = { templateId: templateId, name: template.name, components: [] }

      backend.post("/template", data)
        .then(value => value.data, reason => reason)
        .then(value => console.log("createTemplate: Save in db: ", value))
    },
  },
  persist: {
    storage: sessionStorage
  }
})
