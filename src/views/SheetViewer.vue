<template>
  <v-container class="fill-height w-100" style="max-width: none;">
    <v-row dense class="fill-height w-100 ">
      <v-col cols="4" :md="4" :lg="3" />
      <v-col cols="4" :md="4" :lg="6">
        <VSheet class="sheet-view-item">
          <Sheet />
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
</script>

<style scoped>
  .sheet-view-item {
    flex: 1;
    overflow-y: clip;
    margin: 2px;
    height: 100%;
  }
</style>
