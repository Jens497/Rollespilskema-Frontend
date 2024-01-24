import { componentTypesToModels, COMPONENT_TYPES, SheetComponent } from "@/common/sheetComponentDefinitions";
import { defineStore } from "pinia";
import { type State as TemplateEditorState } from "@/store/templateEditor"

interface State {
  sheet: Record<string, SheetComponent>
}

export const useSheetStore = defineStore('sheet', {
  state: (): State => ({
    sheet: {},
  }),
  getters: {
  },
})
