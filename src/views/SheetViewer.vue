<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4" :md="4" :lg="3" />
      <v-col cols="4" :md="4" :lg="6">
        <VSheet class="sheet-view-item">
          <Sheet :sheet="sheet" />
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
  import Sheet from "@/components/sheetViewer/Sheet.vue"
  import { useSheetStore } from "@/store/sheet";
  import { useTemplateStore } from "@/store/template";
  import { computed } from "vue";

  type Props = {
    sheetId: string
  }

  const props = defineProps<Props>()
  const sheetStore = useSheetStore()
  const templateStore = useTemplateStore()

  const sheet = computed(() => sheetStore.sheets[props.sheetId])

</script>

<style scoped>
  .sheet-view-item {
    flex: 1;
    overflow-y: clip;
    margin: 2px;
    height: 100%;
  }
</style>
