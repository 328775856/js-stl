/**
 * 循环链表（circular linked list）
 * 是另一种形式的链式存储结构。它的特点是表中最后一个结点的指针域指向头结点，整个表形成一个环。
 * 循环链表的操作和线性链表基本一致，仅有细微差别。
 */

/**
 * 双向链表
 *
 * 双向链表是为了克服单链表这种单向性的缺点。
 * 双向链表的结点中有两个指针域，其一指向直接后继，另一指向直接前趋。
 *
 * 双向链表也可以有循环表。
 */

class Node {
    constructor(data, prev = null, next = null){
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

function defaultCompare(a, b){
    return a - b;
}

export default class DoubleLinkedList {
    constructor(sqList, compare = defaultCompare) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.compare = compare;

        for(let i = 0; i < sqList.length; ++i){
            this.push(sqList[i]);
        }
    }

    push(data){
        if(typeof data === 'undefined') throw new Error('data argument required');

        ++this.size;

        if(!this.head) {
            this.head = this.tail = new Node(data);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        } else {
            let node = new Node(data, this.tail, null);
            this.tail.next = node;
            this.tail = node;
        }

        return data;
    }

    unshift(data){
        if(typeof data === 'undefined') throw new Error('data argument required');

        ++this.size;

        if(!this.head) {
            this.head = this.tail = new Node(data);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        } else {
            let node = new Node(data, null, this.head);
            this.head.prev = node;
            this.head = node;
        }

        return data;
    }

    pop(){
        if(!this.tail) {
            this.head = this.tail = null;
            return;
        }

        --this.size;

        this.tail.prev.next = null;
        this.tail = this.tail.prev
    }

    shift(){
        if(!this.head){
            this.head = this.tail = null;
            return;
        }

        --this.size;

        this.head.next.prev = null;
        this.head = this.head.next;
    }

    remove(data){
        if(typeof data === 'function') throw new Error('data argument required');
        
        let current = this.head;

        do {
            if(this.compare(data, current.data) === 0){
                --this.size;

                if(current === this.head){
                    this.head = this.head.next;

                    if(this.head){
                        this.head.prev = null;
                    } else {
                        this.head = this.tail = null;
                    }
                    
                } else if(current = this.tail){
                    this.tail = this.tail.prev;

                    if(this.tail){
                        this.tail.prev.next = null;
                    } else {
                        this.head = this.tail = null;
                    }
                    
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }

                return current.data;
            }

            current = current.next;

        } while(current && current !== this.tail);

        return false;
    }

    indexOf(data){
        let current = this.head;
        let index = -1;

        do {
            ++index;
            if(this.compare(data, current.data) === 0) break;

            current = current.next;
        } while(current && current !== this.tail);

        return index;
    }

    findByIndex(index = 0){
        let current = this.head;
        let j = 0;

        do {
            if(j++ === index) break;

            current = current.next;
        } while(current && current !== this.tail);

        return current.data;
    }

    forEach(cb = null){
        if(typeof cb !== 'function') throw new Error('argument should be a function');

        let current = this.head;

        do {
            cb(current.data);

            current = current.next;
        } while(current && current !== this.tail);
    }

    toJSON(){
        let list = [];
        let current = this.head;

        do {
            list.push(current.data);

            current = current.next;
        } while(current && current !== this.tail);

        return list;
    }

    toString(){
        return JSON.stringify(this.toJSON());
    }
}


let a = new DoubleLinkedList([2, 3]);
a.unshift(1);
a.push(4);
a.indexOf(3);
console.log(a.findByIndex(2));
a.pop();
a.shift();
a.remove(2);
a.remove(32);
a.remove(3);