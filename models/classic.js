import { HTTP } from '../util/http.js'

export class ClassicModel extends HTTP {
  getLatest(sCallback) {
    let _this = this
    this.request({
      url: 'classic/latest',
      success(res) {
        sCallback(res)
        _this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index, nextOrPre, sCallback) {
    this.request({
      url: `classic/${index}/${nextOrPre}`,
      success(res) {
        sCallback(res)
      }
    })
  }

  isFirst(i) {
    return i == 1 ? true : false
  }

  isLatest(i) {
    console.log('i: ', i)
    console.log('_getLatestIndex: ', this._getLatestIndex)
    return i == this._getLatestIndex() ? true : false
  }

  _setLatestIndex(i) {
    wx.setStorageSync('latest', i)
  }

  _getLatestIndex(){
    return wx.getStorageSync('latest')
  }
}

