<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4"  :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">
          <ComponentSelector :components="templateStore.componentTypes" :on-click-component="onAddComponentType"/>
        </VSheet>
      </v-col>
      <v-col cols="4"  :md="4" :lg="6">
        <VSheet class="editor-item" >
          <EditorSheet v-model:components="editorModel"/>
        </VSheet>
      </v-col>
      <v-col cols="4"  :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">

        </VSheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { SheetComponentType } from '@/common/sheetComponent';
  import ComponentSelector from '@/components/templateEditor/ComponentSelector.vue';
  import EditorSheet from '@/components/templateEditor/EditorSheet.vue';
  import { useTemplateStore } from '@/store/template'
  import { reactive, ref } from 'vue';

  type Props = {
    templateId?: string
  }
  const props = defineProps<Props>()

  const templateStore = useTemplateStore()

  const editorModel = props.templateId ? templateStore.templates[props.templateId] : reactive(templateStore.createDummyData())
  const counter = ref(0)

  function onAddComponentType(component: SheetComponentType) {
    editorModel.splice(0,0,{name: component.name, pos: {x: counter.value++ * 50, y: counter.value * 100}})
  }
</script>


<style>
  .editor-item {
    flex: 1;
    overflow-y: auto;
    margin: 2px;
    height: 100%;
  }
</style>
