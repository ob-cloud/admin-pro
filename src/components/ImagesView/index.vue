<template>
  <a-carousel arrows dots-class="slick-dots slick-thumb" effect="fade" autoplay ref="varousel">
    <a slot="customPaging" slot-scope="props">
      <img v-if="(picList[props.i].fileExt == 'jpg' || picList[props.i].fileExt == 'png' || picList[props.i].fileExt == 'jpeg')" :src="getImgUrl(props.i)" />
      <video v-if="(picList[props.i].fileExt == 'mp4' || picList[props.i].fileExt == 'avi' || picList[props.i].fileExt == 'mov')" :src="getImgUrl(props.i)" />
    </a>
    <div v-for="(item,index) in picList" :key="index">
      <img v-if="(item.fileExt == 'jpg' || item.fileExt == 'png' || item.fileExt == 'jpeg')" :src="item.origin" />
      <video v-if="(item.fileExt == 'mp4' || item.fileExt == 'avi' || item.fileExt == 'mov')" :src="item.origin" controls="controls"></video>
    </div>
  </a-carousel>
</template>
<script>
export default {
  name: "images",
  props: {
    picList:{
      Type:Array,
      required:true,
    },
    imageShowIndex:{
      Type:Number,
      default:0,
    },
  },
  data() {
    return {
    };
  },
  created() {
    if(this.imageShowIndex){
      this.goTo(this.imageShowIndex);
    }
  },
  methods: {
    goTo(index) {
      setTimeout(()=>{
        this.$refs.varousel.goTo(index)
      },100)

    },
    getImgUrl(i) {
      return this.picList[i].small;
    },
  },
};
</script>
<style scoped lang="less">
  /deep/ .ant-carousel{
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
</style>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.ant-carousel >>> .slick-slide video {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: calc(100vh - 200px);
}
.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  max-height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: auto;
  max-height: 45px;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li video {
  width: 100%;
  height: auto;
  max-height: 45px;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>