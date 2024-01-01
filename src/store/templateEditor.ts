import { SheetComponent } from "@/common/sheetComponent";
import { defineStore } from "pinia";

export const useTemplateEditorStore = defineStore('templateEditor', {
  state: () => ({
    template: [] as SheetComponent[],
    selectedComponent: undefined as SheetComponent | undefined,
  }),
  actions: {
    selectComponentByIndex(index: number) {
      this.selectedComponent = this.template[index]
    },
    selectComponentByIdentity(component: SheetComponent) {
      if (this.template.includes(component)) {
        this.selectedComponent = component
      } else {
        throw new Error("Selected component not in template")
      }
    },
    unselectComponent() {
      this.selectedComponent = undefined
    }
  }
})
