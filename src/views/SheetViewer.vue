<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4" :md="4" :lg="3" />
      <v-col cols="4" :md="4" :lg="6">
        <VSheet class="sheet-view-item">
          <SheetVue :sheet="sheet" :patch-sheet="patchSheet" />
        </VSheet>
      </v-col>
      <v-col cols="4" :md="4" :lg="3">
        <VSheet class="sheet-view-item" rounded :elevation="8">
          <!-- sidebar component -->
        </VSheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import SheetVue from "@/components/sheetViewer/Sheet.vue";
  import { type Sheet, useSheetStore } from "@/store/sheet";
  import { _DeepPartial } from "pinia";
  import { computed } from "vue";

  type Props = {
    sheetId: string
  }

  const props = defineProps<Props>()
  const sheetStore = useSheetStore()

  const sheet = computed(() => sheetStore.sheets[props.sheetId])
  const patchSheet = (updates: _DeepPartial<Sheet>) => sheetStore.$patch({ sheets: { [props.sheetId]: updates } })

</script>

<style scoped>
  .sheet-view-item {
    flex: 1;
    overflow-y: clip;
    margin: 2px;
    height: 100%;
  }
</style>
