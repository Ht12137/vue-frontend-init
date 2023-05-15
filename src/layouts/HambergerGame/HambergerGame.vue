<template>
  <div id="container">
    <div style="display: flex;flex-direction: row;font-size: 23px;justify-content: space-around">
      <div @click="start">
        开始
      </div>

      <div @click="stop">
        停止
      </div>
    </div>

    <div style="display: flex;flex-direction: row">
      <div v-for="item in 4" :style="handleChannelCss()"></div>
    </div>

    <div style="position:absolute;bottom: 20px">
      ======================================
    </div>

    <div style="display:flex;flex-direction:row;position:absolute;bottom: 5px">
      <div :style="handleBreadCss()">
        面包片下
      </div>
      <div :style="handleBreadCss()">
        面包片下
      </div>
      <div :style="handleBreadCss()">
        面包片下
      </div>
      <div :style="handleBreadCss()">
        面包片下
      </div>
    </div>

  </div>


</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const screenLength = window.screen.height
const screenWidth = window.screen.width
const type = ['蔬菜', '肉片', '面包片上', '面包片下']
const left = ['0px', screenWidth / 4 + 'px', screenWidth / 2 + 'px', screenWidth * 3 / 4 + 'px']

const row0 = ['面包片下']
const row1 = reactive(['面包片下'])
const row2 = reactive(['面包片下'])
const row3 = reactive(['面包片下'])


const handleBreadCss = () => {
  return {
    width: screenWidth / 4 + 'px'
  }
}

const handleChannelCss = () => {
  return {
    borderLeft: "1px solid black",
    height: screenLength - 80 + "px",
    width: screenWidth / 4 + 'px'
  }
}

const start = () => {
  console.log("开始")
  let box = document.getElementById('container') // 监听对象
  let startTime = '' // 触摸开始时间
  let startDistanceX = '' // 触摸开始X轴位置
  let startDistanceY = '' // 触摸开始Y轴位置
  let endTime = '' // 触摸结束时间
  let endDistanceX = '' // 触摸结束X轴位置
  let endDistanceY = '' // 触摸结束Y轴位置
  let moveTime = '' // 触摸时间
  let moveDistanceX = '' // 触摸移动X轴距离
  let moveDistanceY = '' // 触摸移动Y轴距离

  let turn = 0;

  box.addEventListener("touchstart", (e) => {
    startTime = new Date().getTime()
    startDistanceX = e.touches[0].screenX
    startDistanceY = e.touches[0].screenY
  })
  box.addEventListener("touchend", (e) => {
    endTime = new Date().getTime()
    endDistanceX = e.changedTouches[0].screenX
    endDistanceY = e.changedTouches[0].screenY
    moveTime = endTime - startTime
    moveDistanceX = startDistanceX - endDistanceX
    moveDistanceY = startDistanceY - endDistanceY
    // 判断滑动距离超过40 且 时间小于500毫秒
    if ((Math.abs(moveDistanceX) > 40 || Math.abs(moveDistanceY) > 40) && moveTime < 500) {
      // 判断X轴移动的距离是否大于Y轴移动的距离
      if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
        // 左右
        // console.log(moveDistanceX > 0 ? '左' : '右')
        if (moveDistanceX > 0) {
          //左
          turn = 1
        } else {
          //右
          turn = 2
        }
      }
    }
  })


  setInterval(() => {
    //创建元素,记录初始位置
    let initialTop = 20
    const hamComponent = document.createElement('div');
    let currentHamText = type[Math.floor(Math.random() * type.length)]
    var text = document.createTextNode(currentHamText);
    hamComponent.append(text)
    hamComponent.style.position = 'absolute'
    hamComponent.style.top = initialTop + 'px'
    let randomRow = Math.floor(Math.random() * left.length)

    hamComponent.style.left = left[randomRow]
    hamComponent.style.transition = "left 1s"
    const container = document.getElementById('container');
    container.append(hamComponent)
    console.log(hamComponent)


    let currentRow = randomRow

    const timer = setInterval(() => {
      initialTop += screenLength / 400;
      if (initialTop >= screenLength - 40) {
        if (currentRow === 0) {
          row0.push(currentHamText) //可能的情况是 面包片上，下，中间物
          if (currentHamText === '面包片上') {
            if (!row0.slice(1, row0.length - 1).includes('面包片下')) {
              row0.splice(1, row0.length - 1)
              hamComponent.remove()
              return;
            }else{
              row0.splice(row0.lastIndexOf('面包片下'), row0.length - 1)
            }
          }
        } else if (currentRow === 1) {
          row1.push(currentHamText)
          if (currentHamText === '面包片上') {
            if (!row1.slice(1, row1.length - 1).includes('面包片下')) {
              row1.splice(1, row1.length - 1)
            }else {
              row1.splice(row1.lastIndexOf('面包片下'), row1.length - 1)
            }
          }
        } else if (currentRow === 2) {
          row2.push(currentHamText)
          if (currentHamText === '面包片上') {
            if (!row2.slice(1, row2.length - 1).includes('面包片下')) {
              row2.splice(1, row2.length - 1)
              return;
            }else {
              row2.splice(row2.lastIndexOf('面包片下'), row2.length - 1)
            }
          }
        } else if (currentRow === 3) {
          row3.push(currentHamText)
          if (currentHamText === '面包片上') {
            if (!row3.slice(1, row3.length - 1).includes('面包片下')) {
              row3.splice(1, row3.length - 1)
              return;
            }else {
              row3.splice(row3.lastIndexOf('面包片下'), row3.length - 1)
            }
          }
        }
        console.log('当前row0' + JSON.stringify(row0))
        console.log('当前row1' + JSON.stringify(row1))
        console.log('当前row2' + JSON.stringify(row2))
        console.log('当前row3' + JSON.stringify(row3))
        clearInterval(timer)
      }
      let currentLeft = Number(hamComponent.style.left.substring(0, hamComponent.style.left.indexOf("p")))
      let currentLeftString = currentLeft + 'px'
      if (turn === 1 && currentLeftString !== left[0]) {
        hamComponent.style.left = (Number(currentLeft) - screenWidth / 4) + 'px'
        currentRow = left.indexOf(currentLeftString) - 1
        turn = 0
      } else if (turn === 2 && currentLeftString !== left[left.length - 1]) {
        hamComponent.style.left = (Number(currentLeft) + screenWidth / 4) + 'px'
        currentRow = left.indexOf(currentLeftString) + 1
        turn = 0
      }
      if(currentRow === 0){
        hamComponent.style.top = initialTop - row0.length * 20 + 'px'
      }else if(currentRow === 1){
        hamComponent.style.top = initialTop - row1.length * 20 + 'px'
      }else if(currentRow === 2){
        hamComponent.style.top = initialTop - row1.length * 20 + 'px'
      }else if(currentRow === 3){
        hamComponent.style.top = initialTop - row1.length * 20 + 'px'
      }

    }, 10)
  }, 4000)
}


</script>

<style scoped>

.bread {

}

</style>