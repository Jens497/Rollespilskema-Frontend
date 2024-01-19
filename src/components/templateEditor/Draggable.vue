<template>
  <div
    ref="target"
    :style="{
      top: component.properties.pos.value.y.value - totalBorderWidth + 'px',
      left: component.properties.pos.value.x.value - totalBorderWidth + 'px',
    }"
    :class="{ selected: isSelected }"
    class="drag-component"
    @click="onClick"
  >
    <slot :component="component" />
  </div>
</template>

<script setup lang="ts">
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { Position, useDraggable, useParentElement, useScroll } from '@vueuse/core';
  import { computed, ref } from 'vue';
  import { useTheme } from 'vuetify/lib/framework.mjs';
  type Props = {
    component: SheetComponent,
    componentId: string,
    isSelected?: boolean
  }
  const props = withDefaults(
    defineProps<Props>(),
    { isSelected: false }
  )

  const borderWidth = 2
  const paddingWidth = 2
  const totalBorderWidth = borderWidth + paddingWidth

  function px(n: number): string {
    return `${n}px`
  }

  const theme = useTheme()
  const borderColor = computed(() => theme.current.value.colors.primary)
  const templateEditorStore = useTemplateEditorStore()
  const target = ref<HTMLElement | null>(null)
  const parent = useParentElement()
  const scroll = useScroll(parent)
  const previousEvent = ref<'onMove' | 'onEnd' | 'onClick' | undefined>()

  useDraggable(target, {
    initialValue: {
      x: props.component.properties.pos.value.x.value,
      y: props.component.properties.pos.value.y.value,
    },
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
    templateEditorStore.updateComponentById(
      props.componentId,
      {
        properties: {
          pos: {
            value: {
              x: { value: position.x + scroll.x.value },
              y: { value: position.y + scroll.y.value }
            }
          }
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
    padding: calc(v-bind(px(borderWidth)) + v-bind(px(paddingWidth)));
  }

  .drag-component.selected {
    border: v-bind('px(borderWidth)') solid v-bind(borderColor);
    padding: v-bind('px(paddingWidth)');
  }
</style>
