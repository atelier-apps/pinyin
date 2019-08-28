import { shallowMount } from '@vue/test-utils'
import ProtoScreen from '../../src/components/ProtoScreen.vue'

// 算出プロパティの"isError"がtarget(文字列)の種類に応じて真偽を返すことをテストする
test('ProtoScreen', () => {
  // コンポーネントを描画
  const wrapper = shallowMount(ProtoScreen)

  // `target`がひらがなのとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'ひらがな' })
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)
  console.log("ひらがな");

  // `target`がカタカナのとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'カタカナ' })
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)
  console.log("カタカナ");

  // `target`が漢字(全角スペースあり)のとき、エラーメッセージが表示される。
  wrapper.setData({ target: '漢　字' })
  expect(wrapper.find('.error-input').exists()).toBe(false)
  expect(wrapper.find('#id_charactertype').exists()).toBe(false)
  console.log("漢字");

  // `target`が数字のとき、エラーメッセージが表示される。
  wrapper.setData({ target: '1234' })
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)
  console.log("1234");

  // `target`がアルファベット(半角スペース)のとき、エラーメッセージが表示される。
  wrapper.setData({ target: 'ka n ji' })
  expect(wrapper.find('.error-input').exists()).toBe(false)
  expect(wrapper.find('#id_charactertype').exists()).toBe(false)
  console.log("ka n ji");
})
