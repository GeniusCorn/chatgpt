type ScrollElement = HTMLElement | null

interface ScrollReturn {
  scrollRef: Ref<ScrollElement>
  scrollToBottom: () => Promise<void>
}

export function useScroll(): ScrollReturn {
  const scrollRef = ref<ScrollElement>(null)

  const scrollToBottom = async (): Promise<void> => {
    await nextTick()

    if (scrollRef.value !== null) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  }

  return { scrollRef, scrollToBottom }
}
