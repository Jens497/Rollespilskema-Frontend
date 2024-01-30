<template>
  <div
    :style="{
      top: px(component.properties.common.pos.value.y.value - totalBorderWidth),
      left: px(component.properties.common.pos.value.x.value - totalBorderWidth),
      padding: px(cornerSize),
      margin: px(-cornerSize)
    }"
  >
    <div style="position: relative; ">
      <template v-if="isSelected">
        <div ref="cornerTL" class="corner" :style="{ top: px(cornerOffset), left: px(cornerOffset) }" />
        <div ref="cornerTR" class="corner" :style="{ top: px(cornerOffset), right: px(cornerOffset) }" />
        <div ref="cornerBL" class="corner" :style="{ bottom: px(cornerOffset), left: px(cornerOffset) }" />
        <div ref="cornerBR" class="corner" :style="{ bottom: px(cornerOffset), right: px(cornerOffset) }" />
      </template>
      <div
        ref="target"
        :class="{ selected: isSelected }"
        class="drag-component"
        @click="onClick"
      >
        <slot :component="component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import { Position, useDraggable, useParentElement, useScroll } from '@vueuse/core';
  import { computed, ref } from 'vue';
  import { useTheme } from 'vuetify/lib/framework.mjs';
  import { px } from '@/util/CssUnits'
  import useResizeCorners from '@/composables/useResizeCorners';

  type Props = {
    component: SheetComponent,
    componentId: string,
    isSelected?: boolean,
    borderWidth?: number,
    paddingWidth?: number,
    cornerSize?: number,
  }
  const props = withDefaults(defineProps<Props>(), {
    isSelected: false,
    borderWidth: 3,
    paddingWidth: 6,
    cornerSize: 10,
  })

  const totalBorderWidth = computed(() => props.borderWidth + props.paddingWidth)
  const cornerOffset = computed(() => -(props.cornerSize * 0.5))

  const theme = useTheme()
  const borderColor = computed(() => theme.current.value.colors.primary)
  const editorTemplate = useEditorTemplate()
  const cornerTL = ref<HTMLElement | null>(null)
  const cornerTR = ref<HTMLElement | null>(null)
  const cornerBL = ref<HTMLElement | null>(null)
  const cornerBR = ref<HTMLElement | null>(null)
  const target = ref<HTMLElement | null>(null)
  const parent = useParentElement()
  const scroll = useScroll(parent)
  const previousEvent = ref<'onMove' | 'onEnd' | 'onClick' | 'onResize' | undefined>()

  useDraggable(target, {
    initialValue: {
      x: props.component.properties.common.pos.value.x.value,
      y: props.component.properties.common.pos.value.y.value,
    },
    onMove: patchPosition,
    onEnd: onEnd,
    containerElement: parent,
    draggingElement: parent,
  })

  useResizeCorners({
    corners: {
      topLeft: cornerTL,
      topRight: cornerTR,
      bottomLeft: cornerBL,
      bottomRight: cornerBR
    },
    componentId: props.componentId,
    component: props.component,
    scroll: scroll,
    containerElement: parent,
    offset: () => ({ x: props.cornerSize, y: props.cornerSize }),
  })

  function onEnd(_pos: Position, _event: PointerEvent) {
    if (previousEvent.value == 'onMove') {
      previousEvent.value = 'onEnd'
    }
  }

  function patchPosition(position: Position, _event: PointerEvent) {
    editorTemplate.updateComponentById(
      props.componentId,
      {
        properties: {
          common: {
            pos: {
              value: {
                x: { value: position.x + scroll.x.value },
                y: { value: position.y + scroll.y.value }
              }
            }
          }
        }
      }
    )
    previousEvent.value = 'onMove';
  }

  function onClick(_event: MouseEvent) {
    if (previousEvent.value != 'onEnd') {
      editorTemplate.selectedComponent.value != props.component
        ? editorTemplate.selectComponentByIdentity(props.component)
        : editorTemplate.unselectComponent()
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

  .corner {
    position: absolute;
    background-color: v-bind(borderColor);
    height: v-bind('px(cornerSize)');
    width: v-bind('px(cornerSize)');
  }
</style>
