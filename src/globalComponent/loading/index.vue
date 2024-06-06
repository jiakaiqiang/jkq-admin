<template>
  <div class="loading-position">
    <div class="loading">
      <div class="my-loading">
        <div class="eat">
          <div class="header"></div>
        </div>
        <div class="eat eatbottm">
          <div class="header bottom"></div>
        </div>
      </div>
      <div class="item">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Load",
};
</script>

<style lang="scss">
.loading-position {
  position: absolute;
  background-color: black;
  opacity: 0.2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;

  .loading {
    display: flex;
    align-items: center;
    .my-loading {
      position: relative;
      .eat {
        width: 50px;
        height: 25px;
        overflow: hidden;
        animation: headeram 1s ease infinite;
        transform-origin: 50% 100%;
      }
      .eatbottm {
        transform-origin: 50% 0%;
        animation: bottomam 1s ease infinite;
      }

      .header {
        height: 50px;
        width: 50px;
        background-color: pink;
        border-radius: 50%;
      }
      .bottom {
        transform: translateY(-50%);
      }
      @keyframes headeram {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(-45deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      @keyframes bottomam {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(45deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      /*定义一个动画*/
    }
    .item {
      display: flex;
      div {
        width: 16px;
        height: 16px;
        display: flex;
        margin-left: 16px;
        background-color: green;
        border-radius: 50%;
        animation: itemam 1s ease infinite;
      }
    }

    .item div:nth-child(1) {
      animation-delay: 0.2s;
    }
    .item div:nth-child(2) {
      animation-delay: 0.4s;
    }
    .item div:nth-child(3) {
      animation-delay: 0.6s;
    }

    //定义item的动画
    @keyframes itemam {
      0% {
        opacity: 1;
        margin-left: 16px;
      }

      100% {
        opacity: 0;
        margin-left: 0px;
      }
    }
  }
}
</style>
