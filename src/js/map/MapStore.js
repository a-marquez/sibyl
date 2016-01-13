import MapActions from 'map/MapActions'
import dispatcher from 'js/dispatcher'
import {mapConfig} from 'js/config'
import esriMap from 'esri/map'

export default dispatcher.createStore(class {

  constructor () {
    this.map = undefined
    this.greeting = 'none'

    this.bindListeners({
      init: MapActions.init
    })
  }

  init () {
    this.map = new esriMap('map', mapConfig.options)
    if (window.app.debug === true) {window.map = this.map}
  }

}, 'MapStore')
