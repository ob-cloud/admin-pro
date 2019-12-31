<template>
  <global-layout>
    <multi-tab v-if="!isMobile() && multiTab"></multi-tab>
    <transition name="page-transition">
      <IRouteView />
    </transition>
  </global-layout>
</template>

<script>
import GlobalLayout from '@/components/Base/GlobalLayout'
import IRouteView from '@layout/RouteView'
import { mixin, mixinDevice } from '@/utils/mixin'
export default {
  name: "BasicLayout",
  mixins: [ mixin, mixinDevice ],
  components: {
    GlobalLayout,
    IRouteView
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">

  /*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

  .page-transition-enter {
    opacity: 0;
  }

  .page-transition-leave-active {
    opacity: 0;
  }

  .page-transition-enter .page-transition-container,
  .page-transition-leave-active .page-transition-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
