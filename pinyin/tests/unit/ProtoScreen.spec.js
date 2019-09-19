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
    testDiaplayErrorMsgInSearchBox('ひらがな', true)
  })

  // `target`がカタカナのとき、エラーメッセージが表示される。
  it('Enter カタカナ in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カタカナ', true)
  })

  // `target`が漢字のとき、パスする。
  it('Enter 漢字 in search box, then error message is NOT displayed.', () => {
    testDiaplayErrorMsgInSearchBox('漢字', false)
  })

  // `target`が数字のとき、エラーメッセージが表示される。
  it('Enter 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('0123', true)
  })

  // `target`がアルファベットのとき、パスする。
  it('Enter アルファベット in search box, then error message is NOT displayed.', () => {
    testDiaplayErrorMsgInSearchBox('nihao', false)
  })

  // `target`がひらがな＋カタカナのとき、エラーメッセージが表示される。
  it('Enter ひらがな ＋ カタカナ in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひらカナ', true)
  })

  // `target`がひらがな＋漢字のとき、エラーメッセージが表示される。
  it('Enter ひらがな ＋ 漢字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひら字', true)
  })

  // `target`がひらがな＋数字のとき、エラーメッセージが表示される。
  it('Enter ひらがな ＋ 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひら0123', true)
  })

  // `target`がひらがな＋アルファベットのとき、エラーメッセージが表示される。
  it('Enter ひらがな ＋ アルファベット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひらgana', true)
  })

  // `target`がカタカナ＋漢字のとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ 漢字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナ字', true)
  })

  // `target`がカタカナ＋数字のとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナ0123', true)
  })

  // `target`がカタカナ＋アルファベットのとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ アルファベット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナkana', true)
  })

  // `target`が漢字＋数字のとき、エラーメッセージが表示される。
  it('Enter 漢字 ＋ 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('漢字0123', true)
  })

  // `target`が漢字＋アルファベッットのとき、パスする。
  it('Enter 漢字 ＋ アルファベッット in search box, then error message is NOT displayed.', () => {
    testDiaplayErrorMsgInSearchBox('漢字kanji', false)
  })

  // `target`が数字＋アルファベッットのとき、エラーメッセージが表示される。
  it('Enter 数字 ＋ アルファベッット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('0123kanji', true)
  })

  function testDiaplayErrorMsgInSearchBox (word, isDisplay) {
    wrapper.find(idSearchBox).setValue(word)
    expect(wrapper.find(classErrorInput).exists()).toBe(isDisplay)
    expect(wrapper.find(idCharacterType).exists()).toBe(isDisplay)
  }
})
