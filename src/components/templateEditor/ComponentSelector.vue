<template>
  <v-container class="bg-surface-variant selector-container">
    <v-row dense >
      <v-col v-for="component in components" :key="component.name" :cols="12" :sm="12" :md="6" :xl="4">
        <SheetComponentCard class="templateComponentCard" :component="component" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { SheetComponent } from '@/common/sheetComponent.js';
import SheetComponentCard from './SheetComponentCard.vue';


type Props = {
  components: SheetComponent[]
};

defineProps<Props>();
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
