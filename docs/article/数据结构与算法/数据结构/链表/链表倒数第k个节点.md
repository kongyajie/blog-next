# 链表倒数第k个节点

## 题目
输入一个链表，输出该链表中倒数第k个结点。

## 思路
简单思路： 循环到链表末尾找到 length 在找到length-k节点 需要循环两次。

优化：

设定两个节点，间距相差k个节点，当前面的节点到达终点，取后面的节点。
前面的节点到达k后，后面的节点才出发。
代码鲁棒性： 需要考虑head为null，k为0，k大于链表长度的情况。

## 代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let front = head;
    let behind = head;

    // front先走k步
    while(k--) {
        front = front.next;
    }

    // front 和 behind 同步走，直到 front 走完链表尾部
    while(front) {
        front = front.next;
        behind = behind.next;
    }
    
    return behind;
};
```