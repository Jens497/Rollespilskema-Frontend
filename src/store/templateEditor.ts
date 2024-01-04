import { SheetComponent } from "@/common/sheetComponent";
import { defineStore } from "pinia";


interface State {
  template: SheetComponent[],
  selectedComponent: SheetComponent | undefined,
}

export const useTemplateEditorStore = defineStore('templateEditor', {
  state: (): State => ({
    template: [],
    selectedComponent: undefined,
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
    },
    updateComponent(component: SheetComponent, updates: Partial<SheetComponent>) {
      const index = this.template.indexOf(component)
      if (index != -1) {
        this.$patch((state: State) => {
          state.template[index] = Object.assign(state.template[index], updates);
        })
      } else {
        console.debug("useTemplateEditorStore: updateComponent: Component not found", component)
        return
      }
    }
  }
})
