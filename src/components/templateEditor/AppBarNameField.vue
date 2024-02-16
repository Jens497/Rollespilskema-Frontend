<template>
  <v-text-field
    ref="target"
    class="app-bar-txt-field text-h5"
    single-line
    hide-details="auto"
    :density="isActive ? 'compact' : 'compact'"
    :variant="isActive ? 'outlined' : 'plain'"
    :model-value="templateName"
    @update:model-value="editorTemplate.state.value.template.name = $event"
    @update:focused="isActive = $event"
  />
</template>

<script setup lang="ts">
  import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import { onKeyDown } from '@vueuse/core';
  import { computed } from 'vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { VTextField } from 'vuetify/lib/components/index.mjs';

  const target = ref<InstanceType<typeof VTextField> | null>(null)
  const isActive = ref<boolean>(false)

  const route = useRoute()
  const templateId = route.params["templateId"] as string
  const editorTemplate = await useEditorTemplate(templateId)

  const templateName = computed<string | undefined>(() => editorTemplate.state.value?.template?.name)

  onKeyDown('Enter', () => target.value?.blur())
</script>

<style>
  .app-bar-txt-field {
    height: 100%;
    width: 100%;
    text-align: center;
  }
</style>
