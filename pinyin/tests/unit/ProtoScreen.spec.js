import { shallowMount } from '@vue/test-utils'
import ProtoScreen from '../../src/components/ProtoScreen.vue'

// 算出プロパティの'isError'がtarget(文字列)の種類に応じて真偽を返すことをテストする
describe('ProtoScreen', () => {
  const idSearchBox = '#id_search_box'
  const classErrorInput = '.error-input'
  const idCharacterType = '#id_charactertype'
  // コンポーネントを描画
  const wrapper = shallowMount(ProtoScreen)

  // `target`がひらがなのとき、エラーメッセージが表示される。
  it('Enter ひらがな in search box, then error message is displayed.', () => {
    wrapper.find(idSearchBox).setValue('ひらがな')
    expect(wrapper.find(classErrorInput).exists()).toBe(true)
    expect(wrapper.find(idCharacterType).exists()).toBe(true)
  })

  // `target`がカタカナのとき、エラーメッセージが表示される。
  it('Enter カタカナ in search box, then error message is displayed.', () => {
    wrapper.find(idSearchBox).setValue('カタカナ')
    expect(wrapper.find(classErrorInput).exists()).toBe(true)
    expect(wrapper.find(idCharacterType).exists()).toBe(true)
  })

  // `target`が漢字のとき、パスする。
  it('Enter 漢字 in search box, then error message is NOT displayed.', () => {
    wrapper.find(idSearchBox).setValue('漢字')
    expect(wrapper.find(classErrorInput).exists()).toBe(false)
    expect(wrapper.find(idCharacterType).exists()).toBe(false)
  })

  // `target`が数字のとき、エラーメッセージが表示される。
  it('Enter 数字 in search box, then error message is displayed.', () => {
    wrapper.find(idSearchBox).setValue('1234')
    expect(wrapper.find(classErrorInput).exists()).toBe(true)
    expect(wrapper.find(idCharacterType).exists()).toBe(true)
  })

  // `target`がアルファベットのとき、パスする。
  it('Enter アルファベット in search box, then error message is NOT displayed.', () => {
    wrapper.find(idSearchBox).setValue('nihao')
    expect(wrapper.find(classErrorInput).exists()).toBe(false)
    expect(wrapper.find(idCharacterType).exists()).toBe(false)
  })
})
