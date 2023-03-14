import { type RenderResult, fireEvent, render } from '@testing-library/vue'
import Counter from './Counter.vue'

function view(): RenderResult {
  const view = render(Counter, {
    props: {
      count: 0
    }
  })

  return view
}

it('test', async () => {
  const { getByText } = view()

  getByText('count: 0')

  const button = getByText('add')

  await fireEvent.click(button)

  getByText('count: 1')
})
