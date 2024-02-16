<template>
  <Suspense suspensible>
    <TemplateEditorComponent :template-id="templateId" />
    <template #fallback>
      <div class="w-100 h-100">
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
