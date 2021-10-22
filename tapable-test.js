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


// var yellEvent = new SyncHook()
// yellEvent.tap('yell', () => { console.log('wow~he is yelling!') })
// yellEvent.tap('yell again', () => { console.log('wow~he is yelling again!') })
// var kitty = {
//   name: 'kitty',
//   yell: () => {
//     console.log('gagaga!');
//     yellEvent.call()
//   }
// }
// kitty.yell()

// 最佳实践写法
class Cat {
	constructor(name) {
		this.name = name
		this.hooks = {
			getName: new SyncHook(),
			eat: new SyncBailHook(['food']),
			catchMouse: new SyncWaterfallHook(['num']),
			run: new SyncLoopHook(),
			learn: new AsyncParallelHook(),
		}
	}

	getName() {
		console.log('My name is: ' + this.name)
		this.hooks.getName.call()
	}
	eat(food) {
		console.log('Eat ' + food)
		this.hooks.eat.call(food)
	}
	catchMouse(num) {
		this.hooks.catchMouse.call(num)
	}
	run() {
		this.hooks.run.call()
	}
	learn(callback) {
		this.hooks.learn.callAsync(callback)
	}
}
var kitty = new Cat('Kitty')
// ------ SyncHook
kitty.hooks.getName.tap('SyncHookPlugin', () => {
	console.log('Nice to see you')
})
kitty.getName()
// ------ SyncBailHook
kitty.hooks.eat.tap('SyncBailHookPlugin', (food) => {
	console.log('Let\'s eat ' + food + '-1')
})
kitty.hooks.eat.tap('SyncBailHookPlugin', (food) => {
	console.log('Let\'s eat ' + food + '-2')
	return 1 // return非undefined就会停止继续往下（SyncBailHook）
})
kitty.hooks.eat.tap('SyncBailHookPlugin', (food) => {
	console.log('Let\'s eat ' + food + '-3')
})
kitty.eat('apple')
// ------ SyncWaterfallHook
kitty.hooks.catchMouse.tap('SyncWaterfallHookPlugin', (num) => {
	console.log('Catch ' + num + ' mouse')
	return ++num // return的值作为下一步的参数
})
kitty.hooks.catchMouse.tap('SyncWaterfallHookPlugin', (num) => {
	console.log('Catch ' + num + ' mouse')
})
kitty.catchMouse(1)
// ------ SyncLoopHook
let count = 5
kitty.hooks.run.tap('SyncLoopHookPlugin', () => {
	console.log('run~')
	if (--count) return 1
})
kitty.run()
// ------ AsyncParallelHook
kitty.hooks.learn.tapAsync('AsyncParallelHookPlugin', (callback) => {
	setTimeout(() => {
		console.log('Kitty is learning Math')
		callback(2)
	}, 2000)
})
kitty.hooks.learn.tapAsync('AsyncParallelHookPlugin', (callback) => {
	setTimeout(() => {
		console.log('Kitty is learning English')
		callback(3)
	}, 1000)
})
kitty.learn((res) => {
	console.log('---' + res)
})