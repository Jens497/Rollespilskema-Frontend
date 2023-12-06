<template>
  <v-container class="bg-surface-variant selector-container">
    <v-row dense >
      <v-col v-for="component in components" :key="component.name" :cols="12" :sm="12" :md="6" :xl="4">
        <SheetComponentCard class="templateComponentCard" :component="component"  @click="() => onClickComponent(component)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { SheetComponentType } from '@/common/sheetComponent.js';
import SheetComponentCard from './SheetComponentCard.vue';


type Props = {
  components: SheetComponentType[],
  onClickComponent: (component: SheetComponentType) => void | Promise<void>
};

withDefaults(defineProps<Props>(), {
  onClickComponent: (component: SheetComponentType) => console.log("onClickComponent: Method default: component clicked", component)
});
</script>

<style>
.selector-container{
  height: 100%
}
.templateComponentCard {
  height: 100px;
  widows: 100px;
}
</style>
