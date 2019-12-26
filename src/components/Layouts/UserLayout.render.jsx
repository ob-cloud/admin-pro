
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {

    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  },
  methods: {
    renderHeader () {
      return (
        <div class="top">
          <div class="header">
            <a href="/">
              if (config.userLayoutOptions.logo) {
                <img src={config.userLayoutOptions.logo} class="logo" alt="logo" />
              }
              <span class="title">{config.userLayoutOptions.title || 'Admin-Pro'}</span>
            </a>
          </div>
          if (config.userLayoutOptions.description) {
            <div class="desc">
              {config.userLayoutOptions.description}
            </div>
          }
        </div>
      )
    },
    renderFooter () {
      return (
        <div class="footer">
          <div class="links">
          {
            config.userLayoutOptions.links.map(item => {
              return (<a href={item.href || '_self'}>{item.label}</a>)
            })
          }
          </div>
          if (config.userLayoutOptions.copyright) {
            <div class="copyright">
              Copyright &copy; {onfig.userLayoutOptions.copyright}
            </div>
          }
        </div>
      )
    }
  },
  render () {
    return (
      <div id="userLayout" class={['user-layout-wrapper', device]}>
        <div class="container">
          {this.renderHeader()}
          <route-view></route-view>
          if (config.userLayoutOptions.hasFooter) {
            this.renderFooter()
          }
        </div>
      </div>
    )
  },
}
