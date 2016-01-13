import MapStore from 'map/MapStore'
import MapActions from 'map/MapActions'
import React from 'react'

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = MapStore.getState()
    MapStore.listen(this.setState.bind(this))
  }

  componentDidMount () {
    MapActions.init()
  }

  render () {
    return (
      <div className='map-container fill'>
        <div id='map' className='fill'></div>
      </div>
    )
  }

}
