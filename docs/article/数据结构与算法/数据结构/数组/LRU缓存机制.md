# LRU缓存机制

## 描述
运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和写入数据 put 。

获取数据 get(key) - 如果密钥 ( key ) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1 。
写入数据 put(key, value) - 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除**最久未使用**的数据，从而为新数据留出空间。

进阶:

> 你是否可以在 O(1) 时间复杂度内完成这两种操作？


## 代码

解法一：使用 ES6 Map 

```js
class LRUCache {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        let item = this.cache.get(key);
        if (item) {
            // 更新缓存的位置
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item === undefined ? -1 : item;
    }

    put(key, val) {
        if (this.cache.has(key)) { // 更新缓存
            this.cache.delete(key,value);
        } else { // 添加缓存
            if (this.cache.size === this.capacity) { // 超过容量，去掉最近未使用的缓存
                this.cache.delete(this.first())
            }
        }
        this.cache.set(key,value);
    }

    // 返回 map 第一个value值
    first() {
        //  this.cache.keys() 返回map的迭代器iterator，iterator.next() 返回下一个内容，结构如{value: xxx, done: false}
        return this.cache.keys().next().value;
    }
}

var cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```

解法二：Object 模拟 Hash：

略...



[leetcode](https://leetcode-cn.com/problems/lru-cache/solution/ping-zi-jun-qian-duan-jin-jie-suan-fa-lru-shi-xian/)