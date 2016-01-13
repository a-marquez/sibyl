import Map from 'map/Map'
import Watermark from 'atoms/Watermark'
import React from 'react'

export default class extends React.Component {

  render () {
    let watermark = window.app.debug === true ? <Watermark version={window.app.version} /> : undefined

    return (
      <div className='relative fill'>
        <Map />
        {watermark}
      </div>
    )
  }

}
