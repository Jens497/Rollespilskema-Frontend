import { SheetComponent } from "@/common/sheetComponentDefinitions";
import { useEditorTemplate } from "./useEditorTemplate";
import { Position, useDraggable } from "@vueuse/core";
import { MaybeRefOrGetter, Ref, ref, toValue } from "vue";


type Arguments = {
  corners: {
    topLeft?: MaybeRefOrGetter<HTMLElement | null>
    topRight?: MaybeRefOrGetter<HTMLElement | null>
    bottomLeft?: MaybeRefOrGetter<HTMLElement | null>
    bottomRight?: MaybeRefOrGetter<HTMLElement | null>
  }
  componentId: string
  component: SheetComponent
  containerElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>
  scroll?: { x: Ref<number>, y: Ref<number> }
  initialValue?: MaybeRefOrGetter<Position>
  offset?: MaybeRefOrGetter<{ x: number, y: number }>
}


export default function useResizeCorners(args: Arguments) {
  const templateEditor = useEditorTemplate()
  const initialValue = toValue(args.initialValue) ?? {
    x: args.component.properties.common.size.value.width.value,
    y: args.component.properties.common.size.value.height.value,
  }
  const offset = toValue(args.offset) ?? { x: 0, y: 0 }

  useDraggable(args.corners.topLeft, {
    initialValue: initialValue,
    onMove: (pos, event) => patchSize(true, true, pos, event),
    containerElement: args.containerElement,
    draggingElement: args.containerElement,
  })
  useDraggable(args.corners.topRight, {
    initialValue: initialValue,
    onMove: (pos, event) => patchSize(true, false, pos, event),
    containerElement: args.containerElement,
    draggingElement: args.containerElement,
  })
  useDraggable(args.corners.bottomLeft, {
    initialValue: initialValue,
    onMove: (pos, event) => patchSize(false, true, pos, event),
    containerElement: args.containerElement,
    draggingElement: args.containerElement,
  })
  useDraggable(args.corners.bottomRight, {
    initialValue: initialValue,
    onMove: (pos, event) => patchSize(false, false, pos, event),
    containerElement: args.containerElement,
    draggingElement: args.containerElement,
  })


  function patchSize(isTop: boolean, isLeft: boolean, position: Position, _event: PointerEvent) {
    const scrollValue = {
      x: args?.scroll?.x ?? ref(0),
      y: args?.scroll?.y ?? ref(0),
    }
    const oldPos = {
      x: args.component.properties.common.pos.value.x.value,
      y: args.component.properties.common.pos.value.y.value
    }
    const oldSize = {
      width: args.component.properties.common.size.value.width.value,
      height: args.component.properties.common.size.value.height.value,
    }

    const newSize = {
      width: Math.max(
        isLeft
          ? (oldSize.width - offset.x) - (position.x + scrollValue.x.value - oldPos.x)
          : position.x + scrollValue.x.value - oldPos.x - offset.x,
        0),
      height: Math.max(
        isTop
          ? (oldSize.height - offset.y) - (position.y + scrollValue.y.value - oldPos.y)
          : position.y + scrollValue.y.value - oldPos.y - offset.y,
        0),
    }
    const newPos = {
      x: !isLeft ?
        oldPos.x
        : newSize.width == 0
          ? oldPos.x + oldSize.width
          : position.x + scrollValue.x.value + offset.x,
      y: !isTop ?
        oldPos.y
        : newSize.height == 0
          ? oldPos.y + oldSize.height
          : position.y + scrollValue.y.value + offset.y,
    }
    templateEditor.updateComponentById(
      args.componentId,
      {
        properties: {
          common: {
            size: {
              value: {
                width: { value: newSize.width },
                height: { value: newSize.height }
              }
            },
            pos: {
              value: {
                x: { value: newPos.x },
                y: { value: newPos.y },
              }
            }
          }
        }
      }
    )
  }
}
