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
    <slot :ref="child" :component="component" />
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
  const child = ref<HTMLElement | null>(null)
  const parent = useParentElement()
  const scroll = useScroll(parent)

  useDraggable(target, {
    initialValue: props.component.pos,
    onMove: patchPosition,
    containerElement: parent,
    draggingElement: parent,
  })

  function patchPosition(position: Position, event: PointerEvent) {
    templateEditorStore.updateComponent(
      props.component,
      {
        pos: {
          x: position.x + scroll.x.value,
          y: position.y + scroll.y.value
        }
      }
    )
  }

  function onClick(event: MouseEvent) {
    templateEditorStore.selectedComponent != props.component
      ? templateEditorStore.selectComponentByIdentity(props.component)
      : templateEditorStore.unselectComponent()
  }
</script>

<style>
  .drag-component {
    width: fit-content;
    height: fit-content;
    border-style: none;
  }

  .drag-component.selected {
    width: fit-content;
    height: fit-content;
    border: 2px solid
  }
</style>
