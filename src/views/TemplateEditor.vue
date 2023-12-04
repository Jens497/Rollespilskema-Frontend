<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4"  :md="4" :lg="3">
        <VSheet class="editor-item" rounded :elevation="8">
          <ComponentSelector :components="testComponents" />
        </VSheet>
      </v-col>
      <v-col cols="4"  :md="4" :lg="6">
        <VSheet class="editor-item" >

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
  import { SheetComponent } from '@/common/sheetComponent';
  import ComponentSelector from '@/components/templateEditor/ComponentSelector.vue';
  import imgUrl from '@/assets/logo.png';

  const testComponents: SheetComponent[] = [
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
