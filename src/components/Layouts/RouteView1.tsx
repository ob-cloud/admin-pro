import { Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class RouteView extends Vue {
  @Prop({default: true}) keepAlive!: boolean

  render () {
    const { $route: { meta }, $store: { getters } } = this
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    )
    const notKeep = (
      <router-view />
    )
    if (!getters.multiTab && !meta.keepAlive) {
      return notKeep
    }
    return this.keepAlive || getters.multiTab || meta.keepAlive ? inKeep : notKeep
  }
}
