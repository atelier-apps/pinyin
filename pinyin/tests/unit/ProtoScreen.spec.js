import { shallowMount } from '@vue/test-utils'
import ProtoScreen from '../../src/components/ProtoScreen.vue'

// 算出プロパティの'isError'がtarget(文字列)の種類に応じて真偽を返すことをテストする
describe('ProtoScreen', () => {
  const idSearchBox = '#id_search_box'
  const classErrorInput = '.error-input'
  const idCharacterType = '#id_charactertype'
  const idKanjialphabet = '#id_kanjialphabet'
  // コンポーネントを描画
  const wrapper = shallowMount(ProtoScreen)

  // `target`がカタカナのとき、エラーメッセージが表示される。
  it('Enter カタカナ in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カタカナ', true)
  })

  // `target`がひらがなのとき、エラーメッセージが表示される。
  it('Enter ひらがな in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひらがな', true)
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
    testDiaplayErrorMsgInSearchBox('ひら01', true)
  })

  // `target`がひらがな＋アルファベットのとき、エラーメッセージが表示される。
  it('Enter ひらがな ＋ アルファベット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('ひらga', true)
  })

  // `target`がカタカナ＋漢字のとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ 漢字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナ字', true)
  })

  // `target`がカタカナ＋数字のとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナ01', true)
  })

  // `target`がカタカナ＋アルファベットのとき、エラーメッセージが表示される。
  it('Enter カタカナ ＋ アルファベット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('カナka', true)
  })

  // `target`が漢字＋数字のとき、エラーメッセージが表示される。
  it('Enter 漢字 ＋ 数字 in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('漢字01', true)
  })

  // `target`が漢字＋アルファベッットのとき、パスする。
  it('Enter 漢字 ＋ アルファベッット in search box, then error message is NOT displayed.', () => {
    testDiaplayErrorMsg3InSearchBox('漢字ka', true)
  })

  // `target`が数字＋アルファベッットのとき、エラーメッセージが表示される。
  it('Enter 数字 ＋ アルファベッット in search box, then error message is displayed.', () => {
    testDiaplayErrorMsgInSearchBox('01ka', true)
  })

  function testDiaplayErrorMsgInSearchBox (word, isDisplay) {
    console.log(word)
    wrapper.find(idSearchBox).setValue(word)

    expect(wrapper.find(classErrorInput).exists()).toBe(isDisplay)
    expect(wrapper.find(idCharacterType).exists()).toBe(isDisplay)
  }

  function testDiaplayErrorMsg3InSearchBox (word, isDisplay) {
    wrapper.find(idSearchBox).setValue(word)

    expect(wrapper.find(classErrorInput).exists()).toBe(isDisplay)
    expect(wrapper.find(idKanjialphabet).exists()).toBe(isDisplay)
  }
})
