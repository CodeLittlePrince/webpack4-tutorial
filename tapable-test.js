const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable")

//  class Cat {
//    constructor(name, age) {
//      this.name = name
//      this.age = age
//    }

//    run() {
//      console.log('I am running');
//    }

//    scream() {
//      console.log('Wow!!!');
//    }
//  }

// var yellEvent = new EventTarget()
// yellEvent.addEventListener('yell', () => { console.log('wow~he is yelling!') })
// var kitty = {
//   name: 'kitty',
//   yell: function() {
//       console.log('gagaga!')
//       yellEvent.dispatchEvent(new Event('yell'))
//   }
// }
// kitty.yell()
// EventTarget实现原理 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget#%E7%A4%BA%E4%BE%8B


var yellEvent = new SyncHook()
yellEvent.tap('yell', () => { console.log('wow~he is yelling!') })
yellEvent.tap('yell2', () => { console.log('wow~he is yelling again!') })

var kitty = {
  name: 'kitty',
  yell: () => {
    console.log('gagaga!');
    yellEvent.call()
  }
}
kitty.yell()