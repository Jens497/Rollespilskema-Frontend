import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { defineStore } from "pinia";
import { useTemplateStore } from "./template";
import { deepClone } from "@/util/tsUtils";
import useBackend, { SheetDto } from "@/composables/useBackend";

export type Sheet = { name: string, components: Record<string, SheetComponent> }

interface State {
  sheets: Record<string, Sheet>
  sheetNames: { id: string, name: string }[]
}

export const useSheetStore = defineStore('sheet', {
  state: (): State => ({
    sheets: {},
    sheetNames: []
  }),
  actions: {
    addSheet(sheet: Sheet, id?: string): string {
      if (id == undefined) {
        id = crypto.randomUUID()
      }

      if (this.sheets[id] != undefined) throw new Error("Id already exists", { cause: { id } });

      this.$patch({ sheets: { [id]: sheet } })
      this.sheetNames.push({ id: id, name: sheet.name })
      return id;
    },
    addSheetFromTemplate(templateId: string, sheetId?: string): string {
      const normalizedTemplateId = templateId.toLowerCase()
      const templateStore = useTemplateStore()
      const sheet = deepClone(templateStore.templates[normalizedTemplateId])

      if (sheet == undefined) throw new Error("Template not found", { "cause": { templateId } })

      return this.addSheet(sheet, sheetId)
    },
    async fetchSheetNames() {
      const sheetNamesResult = await useBackend()
        .get<{ id: string, name: string }[]>("/sheet")
        .catch(reason => { console.log("SheetStore: fetchSheetNames: ", reason); return undefined })

      if (sheetNamesResult != undefined) {
        const sheetNames = sheetNamesResult.data
        this.$patch({ sheetNames: sheetNames })
      }
    },
    async fetchSheetsAsync(...ids: string[]) {
      const response = await useBackend().get<SheetDto[]>("sheet/sheets", { params: { Ids: ids } })
      const templatesObject = response.data.reduce((acc, t) => {
        acc[t.templateId] = {
          name: t.name,
          components: t.components.reduce((comps, v) => {
            comps[v.componentId] = { name: v.name as SheetComponent["name"], properties: JSON.parse(v.properties) };
            return comps
          }, {} as State["sheets"][string]["components"])
        }; return acc
      }, {} as State["sheets"])

      this.$patch({ sheets: templatesObject })
    }
  },
  persist: {
    storage: sessionStorage
  }
})
