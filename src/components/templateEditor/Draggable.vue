<template>
  <div
    ref="target"
    :style="{
      top: component.pos.y + 'px',
      left: component.pos.x + 'px',
    }"
    :class="{ selected: isSelected }"
    class="drag-component"
    @click="onClick"
  >
    <slot :component="component" />
  </div>
</template>

<script setup lang="ts">
  import { SheetComponent } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { Position, useDraggable, useParentElement, useScroll } from '@vueuse/core';
  import { ref } from 'vue';
  type Props = {
    component: SheetComponent,
    isSelected?: boolean
  }
  const props = withDefaults(
    defineProps<Props>(),
    { isSelected: false }
  )

  const templateEditorStore = useTemplateEditorStore()
  const target = ref<HTMLElement | null>(null)
  const parent = useParentElement()
  const scroll = useScroll(parent)
  const previousEvent = ref<'onMove' | 'onEnd' | 'onClick' | undefined>()

  useDraggable(target, {
    initialValue: props.component.pos,
    onMove: patchPosition,
    onEnd: onEnd,
    containerElement: parent,
    draggingElement: parent,
  })
  function onEnd(_pos: Position, _event: PointerEvent) {
    if (previousEvent.value == 'onMove') {
      previousEvent.value = 'onEnd'
    }
  }

  function patchPosition(position: Position, _event: PointerEvent) {
    templateEditorStore.updateComponent(
      props.component,
      {
        pos: {
          x: position.x + scroll.x.value,
          y: position.y + scroll.y.value
        }
      }
    )
    previousEvent.value = 'onMove';
  }

  function onClick(_event: MouseEvent) {
    if (previousEvent.value != 'onEnd') {
      templateEditorStore.selectedComponent != props.component
        ? templateEditorStore.selectComponentByIdentity(props.component)
        : templateEditorStore.unselectComponent()
    }

    previousEvent.value = 'onClick'
  }
</script>

<style scoped>
  .drag-component {
    width: fit-content;
    height: fit-content;
    border-style: none;
    --border-width: 2px;
    margin: var(--border-width);
  }

  .drag-component.selected {
    border: var(--border-width) solid;
    margin: 0;
  }
</style>
