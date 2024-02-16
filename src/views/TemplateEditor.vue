<template>
  <Suspense>
    <TemplateEditorComponent :template-id="templateId" />
    <template #fallback>
      <div  class="d-flex w-100 h-100 align-center justify-center">
        <v-progress-circular indeterminate />
      </div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
  import TemplateEditorComponent from '@/components/templateEditor/TemplateEditorComponent.vue'

  type Props = {
    templateId: string
  }
  defineProps<Props>()
</script>
