import { templateIdKey } from "@/common/injectionKeys";
import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { Template, useTemplateStore } from "@/store/template";
import { createSharedComposable, isDef } from "@vueuse/core";
import { _DeepPartial } from "pinia";
import { computed, inject, ref } from "vue";
import useBackend, { ComponentDto, TemplateDescriptionDto, TemplateDto } from "./useBackend";

export interface State {
  template: Template | undefined,
  selectedComponentId?: string,
}

function _useEditorTemplate(templateId?: string) {
  const templateStore = useTemplateStore()
  templateId ??= inject(templateIdKey)

  if (!isDef(templateId)) {
    throw new Error("Couldn't determine a templateId to use in composable")
  }


  try {
    if (!templateStore.templateNames.some(t => t.id == templateId)) {
      templateStore.fetchTemplateNames()
        .then(() => {
          if (!templateStore.templateNames.some(t => t.id == templateId)) {
            templateStore.createTemplate(templateId as string);
          }
        })
    }
  } catch (err) {
    console.log("useEditorTemplate: ", err)
  }


  const state = ref<State>({
    template: templateStore.templates[templateId],
    selectedComponentId: undefined,
  })


  const getters = {
    selectedComponent: computed(() => state.value.selectedComponentId != undefined ? state.value.template?.components[state.value.selectedComponentId] : undefined),
  }

  // Actions
  const actions = {
    selectComponentById(id: string) {
      state.value.selectedComponentId = id
    },
    selectComponentByIdentity(component: SheetComponent) {
      const matchingEntry = Object.entries(state.value.template?.components ?? []).find(([k, v]) => v == component)
      if (matchingEntry) {
        const [id] = matchingEntry
        state.value.selectedComponentId = id
      } else {
        throw new Error("Selected component not in template")
      }
    },
    unselectComponent() {
      state.value.selectedComponentId = undefined
    },
    updateComponentByIdentity(component: SheetComponent, updates: _DeepPartial<SheetComponent>) {
      const matchingEntry = Object.entries(state.value.template?.components ?? []).find(([k, v]) => v == component)

      if (matchingEntry) {
        const [id] = matchingEntry
        templateStore.$patch({
          templates: { [templateId as string]: { components: { [id]: updates } } }
        })
      } else {
        console.debug("useTemplateEditorStore: updateComponent: Component not found", component)
        return
      }
    },
    updateComponentById(id: string, updates: _DeepPartial<SheetComponent>) {
      templateStore.$patch({
        templates: { [templateId as string]: { components: { [id]: updates } } }
      })
    },
    addComponents(...components: SheetComponent[]) {
      const entries = components.map(c => ({ id: crypto.randomUUID(), component: c }));
      templateStore.$patch((state) => {
        for (const { id, component } of entries) {
          state.templates[templateId as string].components[id] = component;
        }
      })
    },
    async saveTemplate() {
      if (state.value.template == undefined) {
        throw new Error("template cannot be null or undefined")
      }
      const backend = useBackend()

      const components: ComponentDto[] = Object.entries(state.value.template.components)
        .map(([id, component]) => ({
          componentId: id,
          name: component.name,
          properties: JSON.stringify(component.properties)
        }))

      const data: TemplateDto = { templateId: templateId as string, name: state.value.template.name, components: components }
      return await backend.post("/template/update", data)
        .then(
          value => {
            return { success: true, response: value }
          },
          reason => ({ success: false, response: reason })
        )
    },
  }

  return { state, ...getters, ...actions }
}

export const useEditorTemplate = createSharedComposable(_useEditorTemplate)
