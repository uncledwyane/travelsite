### 笔记

对象拷贝：
    场景： 在项目中从vuex中拿到一个对象然后定义一个对象把vuex中的这个对象赋值给定义的这个对象，操作定义这个对象的时候，也会导致vuex中的对象发生改变
    解决： 深拷贝 使用JSON.parse(JSON.stringify(vuexObj)) 转一下再赋值给定义的对象，这样操作定义的对象就不会影响vuex对象