import { componentTypesToModels, COMPONENT_TYPES, SheetComponent } from "@/common/sheetComponentDefinitions";
import { properties } from "@/common/sheetComponentProperties/Label";
import useBackend, { TemplateDto } from "@/composables/useBackend";
import { PiniaPluginContext, Store, defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export type Template = { name: string, components: Record<string, SheetComponent> }
interface State {
  templateNames: { [key: string]: string }
  templates: { [key: string]: Template },
}

export const useTemplateStore = defineStore('template', {
  state: (): State => ({
    templates: {},
    templateNames: {}
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
      const template: Template = { name: t("view.templateEditor.template.defaultName"), components: {} }

      this.$patch({ templates: { [templateId]: template }, templateNames: { [templateId]: template.name } })

      const backend = useBackend()

      const data: TemplateDto = { templateId: templateId, name: template.name, components: [] }

      backend.post("/template", data)
        .then(value => value.data, reason => reason)
        .then(value => console.log("createTemplate: Save in db: ", value))
    },
    async fetchTemplatesAsync(...ids: string[]) {
      const response = await useBackend().get<TemplateDto[]>("template/templates", { params: { Ids: ids } })
      const templatesObject = response.data.reduce((acc, t) => {
        acc[t.templateId] = {
          name: t.name,
          components: t.components.reduce((comps, v) => {
            comps[v.componentId] = { name: v.name as SheetComponent["name"], properties: JSON.parse(v.properties) };
            return comps
          }, {} as State["templates"][string]["components"])
        }; return acc
      }, {} as State["templates"])

      this.$patch({ templates: templatesObject })
    }
  },
  persist: {
    storage: sessionStorage,
  }
})
