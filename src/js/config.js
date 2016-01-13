const config = {
  app: {
    rootClassName: 'root',
  },
  map: {
    id: 'map',
    options: {
      basemap: 'dark-gray',
      center: [-100, 39],
      showAttribution: false,
      zoom: 5
    }
  }
}
export default config
export const appConfig = config.app
export const mapConfig = config.map
