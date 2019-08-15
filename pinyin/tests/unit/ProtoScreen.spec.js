import { shallowMount } from '@vue/test-utils'
import ProtoScreen from '../../src/components/ProtoScreen.vue'

test('ProtoScreen', () => {
// ひらがな、カタカナ、漢字(全角スペース)、数字、アルファベット(半角スペース)、

  // コンポーネントを描画します
  const wrapper = shallowMount(ProtoScreen)

  // `target`がひらがなのとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'ひらがな' })
  expect(wrapper.find('.error-border').exists()).toBe(true)
  expect(wrapper.find('.error-text').exists()).toBe(true)

  // `target`がカタカナのとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'カタカナ' })
  expect(wrapper.find('.error-border').exists()).toBe(true)
  expect(wrapper.find('.error-text').exists()).toBe(true)

  // `target`が漢字(全角スペースあり)のとき、エラーメッセージが表示される。
  wrapper.setData({ target: '漢　字' })
  expect(wrapper.find('.error-border').exists()).toBe(false)
  expect(wrapper.find('.error-text').exists()).toBe(false)

  // `target`が数字のとき、エラーメッセージが表示される。
  wrapper.setData({ target: '1234' })
  expect(wrapper.find('.error-border').exists()).toBe(true)
  expect(wrapper.find('.error-text').exists()).toBe(true)

  // `target`がアルファベット(半角スペース)のとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'ka n ji' })
  expect(wrapper.find('.error-border').exists()).toBe(false)
  expect(wrapper.find('.error-text').exists()).toBe(false)
})
