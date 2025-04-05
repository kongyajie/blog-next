# 和为s的连续正数序列

## 一、题目描述

> 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。


> 示例 1：
输入：target = 9
输出：[[2,3,4],[4,5]]

> 示例 2：
输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]

 
> 限制：
1 <= target <= 10^5


## 二、思路
- 创建一个容器child，用于表示当前的子序列，初始元素为1,2

- 记录子序列的开头元素small和末尾元素big

- big向右移动子序列末尾增加一个数 small向右移动子序列开头减少一个数

- 当子序列的和大于目标值，small向右移动，子序列的和小于目标值，big向右移动


```js
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    if (target < 2) return [];

    let result = [];

    let child = [1,2]; // 子序列

    let left = 1; // 左指针，对应子序列的左侧数字，单独维护
    let right = 2; // 右指针，对应子序列的右侧数字，单独维护
    let currentSum = 3; // 当前的和，单独维护

    while(right < target) {
        if (currentSum < target) { // 当前的和小于target，说明不够大，右边继续添加数字
            right++;
            currentSum += right;
            child.push(right);
        } else if (currentSum > target) { // 当前的和大于target，说明太大了，从左侧移除数字
            child.shift();
            currentSum -= left;
            left++;
        } else {
            result.push(child.slice()); // 这里child要复制一下
            right++;
            currentSum += right;
            child.push(right);
        }
    }

    return result;
};
```

- [leetcode](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/)
- [awesome-coding-js](http://www.conardli.top/docs/dataStructure/%E6%95%B0%E7%BB%84/%E5%92%8C%E4%B8%BAS%E7%9A%84%E8%BF%9E%E7%BB%AD%E6%AD%A3%E6%95%B4%E6%95%B0%E5%BA%8F%E5%88%97.html#%E9%A2%98%E7%9B%AE)