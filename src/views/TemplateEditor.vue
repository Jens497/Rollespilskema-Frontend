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
          <EditorSheet />
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
  import { provide } from 'vue';

  type Props = {
    templateId: string
  }
  const props = defineProps<Props>()

  const templateStore = useTemplateStore()

  if (templateStore.templates[props.templateId] == undefined) {
    templateStore.createTemplate(props.templateId)
  }

  const editorTemplate = useEditorTemplate(props.templateId)

  provide(templateIdKey, props.templateId)

  function onAddComponentType<T extends SheetComponentType>(componentType: T) {
    const component = getDefault(componentType)
    editorTemplate.addComponents(component)
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
</style>
