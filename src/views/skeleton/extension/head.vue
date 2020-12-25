<template>
  <div class="head-box clearfix">
    <div class="bgColorStyle animate-box f-fl" style="width: 144px;height: 37px;margin-right: 20px;border-radius: 2px;"></div>
    <div class="bgColorStyle animate-box f-fl" style="width: 144px;height: 37px;margin-right: 20px;border-radius: 2px;"></div>
    <div class="bgColorStyle animate-box f-fl" style="width: 144px;height: 37px;margin-right: 20px;border-radius: 2px;"></div>
    <div class="bgColorStyle animate-box f-fl" style="width: 144px;height: 37px;margin-right: 20px;border-radius: 2px;"></div>
    <div class="bgColorStyle animate-box f-fl" style="width: 144px;height: 37px;margin-right: 20px;border-radius: 2px;"></div>
  </div>
</template>

<script>
export default {
  name: "headIndex"
}
</script>

<style scoped lang="less">
.head-box{
  padding-top: 5px;
  .animate-box{
    flex-wrap: wrap;
    animation: skeleton-blink 1.2s ease infinite;
    -webkit-animation: skeleton-blink 1.2s ease infinite;
    background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
    background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-size: 400% 100%;
  }
  @-webkit-keyframes skeleton-blink {
    0% {
      background-position: 100% 50%
    }

    to {
      background-position: 0 50%
    }
  }
  @keyframes skeleton-blink {
    0% {
      background-position: 100% 50%
    }

    to {
      background-position: 0 50%
    }

  }
}
</style>