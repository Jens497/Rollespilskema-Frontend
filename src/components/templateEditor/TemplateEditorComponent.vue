<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4" :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">
          <ComponentSelector :components="templateStore.componentTypes" :on-click-component="onAddComponentType" />
        </VSheet>
      </v-col>
      <v-col cols="4" :md="4" :lg="6">
        <VSheet class="editor-item">
          <Suspense suspensible>
            <EditorSheet />
            <template #fallback>
              <div class="d-flex w-100 h-100 align-center justify-center">
                <v-progress-circular indeterminate />
              </div>
            </template>
          </Suspense>
          <v-btn
            v-if="isEdited"
            class="fab"
            icon="mdi-content-save"
            color="primary"
            @click="onSave"
          />
          <v-snackbar v-model="showSnackbar">
            <template #text>
              {{ snackBarMessage }}
            </template>
            <template #actions>
              <v-btn icon="mdi-close" @click="showSnackbar = false" />
            </template>
          </v-snackbar>
        </VSheet>
      </v-col>
      <v-col cols="4" :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">
          <ComponentSettings />
        </VSheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { templateIdKey } from '@/common/injectionKeys';
  import { SheetComponentType, getDefault } from '@/common/sheetComponentDefinitions';
  import ComponentSelector from '@/components/templateEditor/ComponentSelector.vue';
  import ComponentSettings from '@/components/templateEditor/ComponentSettings.vue';
  import EditorSheet from '@/components/templateEditor/EditorSheet.vue';
  import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import { useTemplateStore } from '@/store/template'
  import { debounceFilter, useRefHistory, watchWithFilter } from '@vueuse/core';
  import { computed, ref } from 'vue';
  import { provide } from 'vue';
  import { useI18n } from 'vue-i18n';

  type Props = {
    templateId: string
  }
  const props = defineProps<Props>()
  const isSaving = ref(false)
  const showSnackbar = ref(false)
  const snackBarMessage = ref<string>()

  const templateStore = useTemplateStore()

  const { t } = useI18n()


  const editorTemplate = useEditorTemplate(props.templateId)
  const templateHistory = useRefHistory(editorTemplate.state, { deep: true, capacity: 25, eventFilter: debounceFilter(500) })
  const saveTime = ref(Date.now())
  const isEdited = computed(() => templateHistory.last.value.timestamp !== saveTime.value)

  provide(templateIdKey, props.templateId)

  function onAddComponentType<T extends SheetComponentType>(componentType: T) {
    const component = getDefault(componentType)
    editorTemplate.addComponents(component)
  }

  async function onSave() {
    isSaving.value = true
    const lastUpdated = templateHistory.last.value.timestamp

    const response = await editorTemplate.saveTemplate()
    snackBarMessage.value = response.success ? t("view.templateEditor.template.save.success") : t("view.templateEditor.template.save.error") + response.response;
    showSnackbar.value = true

    saveTime.value = lastUpdated
    isSaving.value = false
  }
</script>


<style scoped>
  .editor-item {
    flex: 1;
    overflow-y: clip;
    margin: 2px;
    height: 100%;
    position: relative;
  }

  .fab {
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
</style>
