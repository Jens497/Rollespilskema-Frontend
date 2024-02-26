import { templateIdKey } from "@/common/injectionKeys";
import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { Template, useTemplateStore } from "@/store/template";
import { createSharedComposable, isDef } from "@vueuse/core";
import { _DeepPartial } from "pinia";
import { Ref, computed, inject, ref } from "vue";
import useBackend, { ComponentDto, TemplateDto } from "./useBackend";
import { ComposerTranslation } from "vue-i18n";
import { randomUUID } from "@/util/Crypto";

export interface State {
  template: Ref<Template | undefined>,
  selectedComponentId: Ref<string | undefined>,
}

function _useEditorTemplate(templateId?: string, t?: ComposerTranslation) {
  const templateStore = useTemplateStore()
  templateId ??= inject(templateIdKey)

  if (!isDef(templateId)) {
    throw new Error("Couldn't determine a templateId to use in composable")
  }
  const normalizedId: string = templateId.toLowerCase()



  const state: State = {
    template: ref(templateStore.templates[normalizedId]),
    selectedComponentId: ref<string>(),
  }

  try {
    if (templateStore.templateNames.some(t => t.id == normalizedId)) {

      if (templateStore.templates[normalizedId] == undefined) {
        templateStore.fetchTemplatesAsync(normalizedId).then(() => {
          state.template.value = templateStore.templates[normalizedId]
        })
      }
    } else {
      templateStore.fetchTemplateNames().then(() => {
        if (!templateStore.templateNames.some(t => t.id == normalizedId)) {
          templateStore.createTemplate(normalizedId, t ? t("view.templateEditor.template.defaultName") : "New Template");
          state.template.value = templateStore.templates[normalizedId]
        }
      })
    }
  } catch (err) {
    console.log("useEditorTemplate: ", err)
  }

  const getters = {
    selectedComponent: computed(() => state.selectedComponentId.value != undefined ? state.template.value?.components[state.selectedComponentId.value] : undefined),
  }

  // Actions
  const actions = {
    selectComponentById(id: string) {
      state.selectedComponentId.value = id
    },
    selectComponentByIdentity(component: SheetComponent) {
      const matchingEntry = Object.entries(state.template.value?.components ?? []).find(([k, v]) => v == component)
      if (matchingEntry) {
        const [id] = matchingEntry
        state.selectedComponentId.value = id
      } else {
        throw new Error("Selected component not in template")
      }
    },
    unselectComponent() {
      state.selectedComponentId.value = undefined
    },
    updateComponentByIdentity(component: SheetComponent, updates: _DeepPartial<SheetComponent>) {
      const matchingEntry = Object.entries(state.template.value?.components ?? []).find(([k, v]) => v == component)

      if (matchingEntry) {
        const [id] = matchingEntry
        templateStore.$patch({
          templates: { [normalizedId as string]: { components: { [id]: updates } } }
        })
      } else {
        console.debug("useTemplateEditorStore: updateComponent: Component not found", component)
        return
      }
    },
    updateComponentById(id: string, updates: _DeepPartial<SheetComponent>) {
      templateStore.$patch({
        templates: { [normalizedId as string]: { components: { [id]: updates } } }
      })
    },
    addComponents(...components: SheetComponent[]) {
      const entries = components.map(c => ({ id: randomUUID(), component: c }));
      templateStore.$patch((state) => {
        for (const { id, component } of entries) {
          state.templates[normalizedId as string].components[id] = component;
        }
      })
    },
    async saveTemplate() {
      if (state.template.value == undefined) {
        throw new Error("template cannot be null or undefined")
      }
      const backend = useBackend()

      const components: ComponentDto[] = Object.entries(state.template.value.components)
        .map(([id, component]) => ({
          componentId: id,
          name: component.name,
          properties: JSON.stringify(component.properties)
        }))

      const data: TemplateDto = { templateId: normalizedId as string, name: state.template.value.name, components: components }
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
