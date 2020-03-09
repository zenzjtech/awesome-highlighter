import {highlightSelection, recoverHighlight, HighlightInfo} from './types'

const onExtensionMessage = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log('receive message')
  console.log(request)
  if (request === 'get_highlight_info') {
    const highlightInfos = highlightSelection()
    console.log('return highlight information')
    console.log(highlightInfos)
    sendResponse({highlightInfos: highlightInfos});
  }
}

const initContentScript: () => void = () => {
  console.log('loading script')
  chrome.runtime.onMessage.addListener(onExtensionMessage)
  chrome.runtime.sendMessage('fetch_historical_highlight_info', (highlightInfos: HighlightInfo[]) => {
    console.log('recovering highlight infos')
    console.log(highlightInfos)
    recoverHighlight(highlightInfos)
  })
}

initContentScript()
