import { shallowMount } from '@vue/test-utils'
import ProtoScreen from '../../src/components/ProtoScreen.vue'

// 算出プロパティの'isError'がtarget(文字列)の種類に応じて真偽を返すことをテストする
test('ProtoScreen', () => {
  // コンポーネントを描画
  const wrapper = shallowMount(ProtoScreen)

  // `target`がひらがなのとき、エラーメッセージが表示される。
  wrapper.find('#id_search_box').setValue('ひらがな')
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)

  // `target`がカタカナのとき、エラーメッセージが表示される。
  wrapper.find('#id_search_box').setValue('カタカナ')
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)

  // `target`が漢字のとき、パスする。
  wrapper.find('#id_search_box').setValue('漢字')
  expect(wrapper.find('.error-input').exists()).toBe(false)
  expect(wrapper.find('#id_charactertype').exists()).toBe(false)

  // `target`が数字のとき、エラーメッセージが表示される。
  wrapper.find('#id_search_box').setValue('1234')
  expect(wrapper.find('.error-input').exists()).toBe(true)
  expect(wrapper.find('#id_charactertype').exists()).toBe(true)

  // `target`がアルファベットのとき、パスする。
  wrapper.find('#id_search_box').setValue('nihao')
  expect(wrapper.find('.error-input').exists()).toBe(false)
  expect(wrapper.find('#id_charactertype').exists()).toBe(false)

})
