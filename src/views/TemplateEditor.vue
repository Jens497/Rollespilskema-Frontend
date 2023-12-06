<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4"  :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">
          <ComponentSelector :components="testComponents" :on-click-component="onAddComponentType"/>
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
  import { SheetComponent, SheetComponentType } from '@/common/sheetComponent';
  import ComponentSelector from '@/components/templateEditor/ComponentSelector.vue';
  import imgUrl from '@/assets/logo.png';
  import EditorSheet from '@/components/templateEditor/EditorSheet.vue';
import { ref } from 'vue';

  const editorModel = ref<SheetComponent[]>([])

  function onAddComponentType(component: SheetComponentType) {
    editorModel.value.splice(0,0,{name: component.name, pos: {x: 0, y:0}})
  }
  const testComponents: SheetComponentType[] = [
      {
        name: "Box",
        image: imgUrl
      },
      {
        name: "Label",
        image: imgUrl
      },
      {
        name: "Text Input",
        image: imgUrl
      },
      {
        name: "Line",
        image: imgUrl
      },
      {
        name: "Image",
        image: imgUrl
      },
      {
        name: "Info Circle",
        image: imgUrl
      },
  ]
</script>


<style>
  .editor-item {
    flex: 1;
    overflow-y: auto;
    margin: 2px;
    height: 100%;
  }
</style>
