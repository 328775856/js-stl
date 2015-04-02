/**
 * Created by Luke on 2015/2/26.
 */

// Recurse

// 全排列问题full permutation
function perm(list, k, m){
    var i;
    if(k === m) {
        var s = '';
        for(i = 0; i <= m; ++i)
            s += ' ' + list[i];
        console.log(s);
    } else {
        for(i = k; i <= m; ++i){
            swap(list, k, i);
            perm(list, k + 1, m);
            swap(list, k, i);
        }
    }
}

function swap(list, i, j){
    var temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}

var arr = [1, 2, 3];
perm(arr, 0, arr.length - 1);


/**
 * 整数划分问题
 * 在正整数n的所有不同的划分中，求最大加数不大于m的划分次数
 * @param n
 * @param m
 * @returns {Number}
 */
function intDivide(n, m){
    if(n === 0 || m === 0) return 0;
    if(n === 1 || m === 1) return 1;
    if(n < m) return intDivide(n, n);
    if(n === m) return intDivide(n, n - 1) + 1;
    return intDivide(n, m - 1) + intDivide(n - m, m);
}
console.log(intDivide(6, 6));



// Divide and conquer

// the same as the randomizedPartition of quickSort
function randomizedPartition(sqList, low, high){
    var temp;
    var i = low;
    var j = high + 1;
    var rand = Math.random() * (j - i) | 0 + i;

    temp = sqList[low];
    sqList[low] = sqList[rand];
    sqList[rand] = temp;

    var x = sqList[low];

    while(1){
        while(sqList[++i] < x && i < high);
        while(sqList[--j] > x);
        if(i >= j) break;
        temp = sqList[i];
        sqList[i] = sqList[j];
        sqList[j] = temp;
    }

    sqList[low] = sqList[j];
    sqList[j] = x;

    return j;
}

// 线性时间内找到数组第k小的元素
function randomizedSelect(arr, low, high, k){
    if(low === high) return arr[low];
    console.log(low, high);

    var i = randomizedPartition(arr, low, high);
    var j = i - low + 1;

    if(k <= j) return randomizedSelect(arr, low, i, k);
    else return randomizedSelect(arr, i + 1, high, k - j);
}

var arr = [9, 8, 5, 2, 3, 6, 1, 7, 4];
console.log(randomizedSelect(arr, 0, arr.length - 1, 5));
console.log(arr + '');


// 循环日程赛问题
/**
 * 对n = 2的k次方个运动员进行循环日程赛
 * 1），每个选手要与其他n - 各选手比赛
 * 2），每个选手一天只能赛一场
 * 3），比赛一共进行n - 1天
 * @param k
 */
function cyclicSchedulingGameTable(k){
    var table = [];
    var n = 1;

    for(var i = 0; i < k; ++i) n *= 2;
    for(i = 0; i < n; ++i) table[i] = [];
    for(i = 0; i < n; ++i) table[0][i] = i + 1;

    var m = 1;
    for(var s = 0; s < k; ++s){
        n /= 2;
        for(var t = 1; t <= n; ++t)
            for(i = m ; i < 2 * m; ++i)
                for(var j = m; j < 2 * m; ++j) {
                    var p = j + (t - 1) * m * 2;
                    table[i][p] = table[i - m][p - m];
                    table[i][p - m] = table[i - m][p];
                }
        m *= 2;
    }

    return table;
}
var table = cyclicSchedulingGameTable(3);
console.log(table);


/*
设a[0..n-1]是已排好序的数组，请改写二分搜索算法，使得当搜索元素x不在数组中时，返回小于x的最大元素位置i和大于x的最小元素位置j。当搜索元素在数组中时，i和j相同，均为x在数组中的位置。
 */

function specifiedBinarySearch(arr, x){
    var low = 0;
    var high = arr.length - 1;

    while(low <= high){
        var middle = (low + high) >> 1;

        if(arr[middle] === x) return middle;
        else if(arr[middle] > x) high = middle - 1;
        else low = middle + 1;
    }

    return [high, low];
}

var arr = [1,  3,  5,  7,  9, 10];
console.log(specifiedBinarySearch(arr, 6));
console.log(specifiedBinarySearch(arr, 5));



/*
O(1)空间合并算法

设字数组a[0..k-1]和a[k..n-1]已排好序(0<=k<=n-1)。式设计一个合并这两个字数组为排好序的数组a[0..n-1]的算法。要求算法在最坏情况下所用的计算时间为O(n)，且只用到O(1)的辅助空间。

notice: 归并排序的算法空间复杂度是O(n)
 */

// 算法一： 循环换位合并算法
/*
向右循环换位合并

向右循环换位合并算法首先用二分搜索算法在数组段a[k..n-1]中搜索a[0]的插入位置，即找到位置p使得a[p]<a[0]<=a[p+1]。数组段a[0..p]向右循环换位p-k个位置，使a[k-1]移动到a[p]的位置。此时，原数组元素a[0]及其左边的所有元素均已排好序。对剩余的数组元素重复上述过程，直至只剩下一个数组段，此时整个数组已排好序。
 */

// 向前合并a[0..k-1]和a[k..n-1]
function mergeForward(arr, k){
    var n = arr.length;
    var i = 0;
    var j = k;

    while(i < j && j < n){
        var p = binarySearch4Merge(arr, arr[i], j, n - 1);
        shiftRight(arr, i, p, p - j + 1);
        console.log('p = ' + p + ', i = ' + i + ', j = ' + j + ': ' + arr + '');
        j = p + 1;
        i += p - j + 2;
    }
}

// 在数组段a[low..high]中搜索元素x的插入位置
function binarySearch4Merge(arr, x, low, high){
    while(low <= high){
        var middle = (low + high) >> 1;
        if(x === arr[middle]) return middle;
        else if(x < arr[middle]) high = middle - 1;
        else low = middle + 1;
    }

    if(x > arr[middle]) return middle;
    else return middle - 1;
}

// 将数组段a[s..t]中元素循环右移k个位置
function shiftRight(arr, s, t, k){
    for(var i = 0; i < k; ++i){
        var temp = arr[t];
        for(var j = t; j > s; --j) arr[j] = arr[j - 1];
        arr[s] = temp;
    }
}

var a = [1, 3, 5, 7, 9, 11,    1, 5, 6, 8, 9, 10];
mergeForward(a, 6);
console.log('mergeForward: ' + a);

/*
上述算法中，数组段a[0:k-1]中元素的移动次数不超过k次，数组段a[k:n-1]中元素最多移动一次。因此，算法的元素移动总次数为:k^2+(n-k)次。算法的比较次数不超过klog(n - k)（这个不明白）。当k <n1/2时，算法的时间复杂度为O(n)；反之，则为O(n*n）。
 */


// 自然合并排序算法

// 数组的情形
(function(){
    function naturalMergeSort(a){
        var b = [];
        var n = a.length;
        while(!mergeRuns(a, b, n) && !mergeRuns(b, a, n));
    }

    function mergeRuns(a, b, n){
        var i = 0;
        var k = 0;
        var asc = true;
        var x;

        while(i < n){
            k = i;
            // 找到最后一个递增序列元素
            do x = a[i++]; while(i < n && x <= a[i]);
            // 找到最后一个递减序列元素
            while(i < n && x >= a[i]) x = a[i++];
            // 归并递增序列和递减序列，结果可能递增或递减
            merge(a, b, k, i - 1, asc);
            asc = !asc;
        }

        // 当k等于0时代表a已经排好序了
        return k === 0;
    }

    function merge(a, b, low, high, asc){
        var k = asc ? low : high;
        var c = asc ? 1 : -1;
        var i = low;
        var j = high;

        while(i <= j){
            if(a[i] <= a[j]) b[k] = a[i++];
            else b[k] = a[j--];
            k += c;
        }
        for(i = k = low, j = high; i <= j; ++i, ++k) a[i] = b[k];
    }

    console.log('\nnatureMergeSort:');
    var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
    naturalMergeSort(arr);
    console.log(arr + '');
})();

// 链表存储结构的自然合并排序
var LinkedList = require('../linkedList/LinkedList');
var Queue = require('../Queue/Queue').Queue;

// 链表存储结构的自然合并排序
var linkedListNaturalMergeSort = (function(){
    return mergeSort;

    function mergeSort(linkedlist, needReplace){
        if(!linkedlist) return linkedlist;

        var queue = new Queue();
        var list = linkedlist.head;

        if(!list || !list.next) return linkedlist;

        needReplace = needReplace == null ? true : needReplace;
        var u = list;
        var t = list;
        var v;
        for(; t; t = u){
            while(u && u.next && u.data <= u.next.data)
                u = u.next;
            v = u;
            u = u.next;
            v.next = null;
            queue.enQueue(t);
        }

        t = queue.deQueue();
        while(queue.size){
            queue.enQueue(t);
            var a = queue.deQueue();
            var b = queue.deQueue();
            t = merge(a, b);
        }

        if(needReplace) linkedlist.head = t;

        return t;
    }

    function merge(a, b){
        var c = new LinkedList();
        var head = {data: null, next: null};
        c.head = head;
        c = c.head;

        while(a && b){
            if(a.data < b.data) {
                c.next = a;
                c = a;
                a = a.next;
            } else {
                c.next = b;
                c = b;
                b = b.next;
            }
        }

        c.next = a ? a : b;

        return head.next;
    }
})();
exports.linkedListNaturalMergeSort = linkedListNaturalMergeSort;

var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
var linkedList = new LinkedList(arr);
linkedListNaturalMergeSort(linkedList);
console.log(linkedList + '');



/*
最大值和最小值问题的最优算法

给定数组a[0..n-1]，求在最坏情况下用Math.ceil(3n/2-2)次比较找出a[0..n-1]中元素的最大值和最小值。
 */

function getMax(arr, i, j){
    var m = i;
    for(var k = i + 1; k <= j; ++k)
        if(arr[m] < arr[k]) m = k;

    return m;
}

function getMin(arr, i, j){
    var m = i;
    for(var k = i + 1; k <= j; ++k)
        if(arr[m] > arr[k]) m = k;

    return m;
}

function getMINandMAXElem(arr){
    var n = arr.length - 1;
    var min, max;
    // k为中间数
    var k = (n / 2) | 0;

    // 在偶数对的情况下，依次比较arr[i..k]和arr[k+i..2*k]，
    // 将较大的数交换到arr[i..k]中，较小的放到arr[k+i..2*k]中，
    // 所以在arr[i..k]中可以找到最大值，arr[k+i..2*k]中找到最小值
    for(i = 0; i <= k; ++i){
        if(arr[i] < arr[k + i]) {
            swap(arr, i, k + i);
        }
    }

    max = getMax(arr, 0, k);
    min = getMin(arr, k + 1, 2 * k);

    // 如果为奇数对，再做两次比较
    if(2 * k < n) {
        if(arr[n] > arr[max]) max = n;
        if(arr[n] < arr[min]) min = n;
    }

    return {
        min: arr[min],
        max: arr[max]
    };
}

var arr = [1, 3, 5, 17, 9, 8, 6, 4, -2, 0];
console.log(getMINandMAXElem(arr));

/*
用对手论证法计算时间下届
 */