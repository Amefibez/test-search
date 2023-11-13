import { debounce } from "lodash"
import { computed, ComputedRef, ref, Ref, watch } from "vue"

export interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

declare type ComputedGetter<T> = (ctx?: never) => T

export function useDebounce<T>(
  value: Ref<T> | ComputedGetter<T>,
  options?: DebounceOptions
) {
  let targetValue: Ref<T> | ComputedRef<T>
  if (typeof value === "function") {
    targetValue = computed(value)
  } else {
    targetValue = value
  }

  const debouncedValue = ref<T>(targetValue.value)

  const setValue = debounce(
    () => {
      debouncedValue.value = targetValue.value as never
    },
    options?.wait ?? 1000,
    options
  )

  watch(targetValue, setValue)

  return debouncedValue
}
