import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { _DeepPartial, defineStore } from "pinia";


export interface State {
  template: Record<string, SheetComponent>,
  selectedComponentId?: string;
}

export const useTemplateEditorStore = defineStore('templateEditor', {
  state: (): State => ({
    template: {},
    selectedComponentId: undefined,
  }),
  getters: {
    selectedComponent: (state) => state.selectedComponentId != undefined ? state.template[state.selectedComponentId] : undefined,
  },
  actions: {
    selectComponentById(id: string) {
      this.selectedComponentId = id
    },
    selectComponentByIdentity(component: SheetComponent) {
      const matchingEntry = Object.entries(this.template).find(([k, v]) => v == component)
      if (matchingEntry) {
        const [id] = matchingEntry
        this.selectedComponentId = id
      } else {
        throw new Error("Selected component not in template")
      }
    },
    unselectComponent() {
      this.selectedComponentId = undefined
    },
    updateComponentByIdentity(component: SheetComponent, updates: _DeepPartial<SheetComponent>) {
      const matchingEntry = Object.entries(this.template).find(([k, v]) => v == component)

      if (matchingEntry) {
        const [id] = matchingEntry
        this.$patch((state: State) => {
          state.template[id] = Object.assign(state.template[id], updates);
        })
      } else {
        console.debug("useTemplateEditorStore: updateComponent: Component not found", component)
        return
      }
    },
    updateComponentById(id: string, updates: _DeepPartial<SheetComponent>) {
      this.$patch({ template: { [id]: updates } })
    },
    addComponents(...components: SheetComponent[]) {
      const entries = components.map(c => ({ id: crypto.randomUUID(), component: c }));
      this.$patch((state: State) => {
        for (const { id, component } of entries) {
          state.template[id] = component;
        }
      })
    }
  }
})
