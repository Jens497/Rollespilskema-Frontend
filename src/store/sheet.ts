import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { defineStore } from "pinia";
import { useTemplateStore } from "./template";
import { deepClone } from "@/util/tsUtils";

export type Sheet = { name: string, components: Record<string, SheetComponent> }

interface State {
  sheets: Record<string, Sheet>
}

export const useSheetStore = defineStore('sheet', {
  state: (): State => ({
    sheets: {},
  }),
  getters: {
  },
  actions: {
    addSheet(sheet: Sheet, id?: string): string {
      if (id == undefined) {
        id = crypto.randomUUID()
      }

      if (this.sheets[id] != undefined) throw new Error("Id already exists", { cause: { id } });

      this.$patch({ sheets: { [id]: sheet } })
      return id;
    },
    addSheetFromTemplate(templateId: string, sheetId?: string): string {
      const templateStore = useTemplateStore()
      const sheet = deepClone(templateStore.templates[templateId])

      if (sheet == undefined) throw new Error("Template not found", { "cause": { templateId } })

      return this.addSheet(sheet, sheetId)
    },
  },
  persist: {
    storage: sessionStorage
  }
})
