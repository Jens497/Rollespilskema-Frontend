<template>
  <div ref="target" :style="{
      top: component.pos.y + 'px',
      left: component.pos.x + 'px',
    }"
    style="background: crimson; padding: 5px;"
    class="sheet-component"
  >
    <VCard
      ref="el"
      :title="component.name"
      class="sheet-component"
      :style="{
        borderStyle: isSelected ? 'solid' : 'none',
        borderWidth: '2px',
      }"
    />

  </div>
</template>

<script lang=ts setup>
  import { SheetComponent, componentTypesToModels } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { Position, useDraggable, useParentElement, useScroll } from '@vueuse/core';
  import { ref } from 'vue';
  type Props = {
    component: SheetComponent,
    isSelected: boolean
  }
  const props = withDefaults(
    defineProps<Props>(),
    { isSelected: false }
    )
    useParentElement
    const templateEditorStore = useTemplateEditorStore()
    const target = ref<HTMLElement | null>(null)
    const parent = useParentElement(target)
    const scroll = useScroll(parent)

    useDraggable(target, {
      initialValue: props.component.pos,
      onMove: patchPosition,
      containerElement: parent,
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
  </script>


<style>
  .sheet-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
  }
</style>
