// ��̬������
/*
 ��ʱ�ɽ���һά��������������������������Ա�ľ�̬������洢�ṹ��

 �ھ�̬�����У������һ��������ʾһ����㣬ͬʱ���α꣨cur������ָ��ָʾ����������е����λ�á�
 ����ĵ�0�����ɿ���ͷ��㣬��ָ����ָʾ����ĵ�һ����㡣
 ���ִ洢�ṹ��ҪԤ�ȷ���һ���ϴ�Ŀռ䣬�������Ա�Ĳ����ɾ������ʱ�����ƶ�Ԫ�أ�
 ����Ҫ�޸�ָ�룬���Ծ�����ʽ�洢�ṹ����Ҫ�ŵ�
 */

export default class StaticLinkedList {
    constructor(MAXSIZE) {
        this[-1] = {cur: 0};
        this.length = 0;
        this.MAXSIZE = MAXSIZE + 1 || 1000;
    }

    /**
     * �ھ�̬�������Ա�L�в��ҵ�1��ֵΪe��Ԫ�أ�
     * ���ҵ����򷵻�����L�е�λ��
     * @param data
     */
    find (data) {
        let i = this[0].cur;
        while (i && this[i].data !== data) {
            i = this[i].cur;
        }
        return i;
    }
    /**
     * ��һά�����и���������һ����������
     * this[0].curΪͷָ��
     */
    init (len) {
        len = len ? len + 1 : this.MAXSIZE;
        for (let i = 0; i < len - 1; ++i) {
            this[i] = this[i] || {data: null, cur: null};
            this[i].cur = i + 1;
        }

        this[len - 1] = this[len - 1] || {};
        this[len - 1].cur = 0;
    }
    /**
     * ����������ǿգ��򷵻ط���Ľ���±꣬���򷵻�0
     * @returns {*}
     */
    malloc () {
        let i = this[-1].cur;
        if (typeof this[-1].cur !== 'undefined') this[-1].cur = this[i].cur;
        return i;
    }
    /**
     * ���±�Ϊk�Ŀ��н����յ���������
     * @param k
     */
    free (k) {
        this[k].cur = this[0].cur;
        this[0].cur = k;
    }

    create (sqList) {
        // ��ʼ�����ÿռ�
        this.init(sqList.length);
        // ����s��ͷ���
        let s = this.malloc();
        // rָ��s�ĵ�ǰ�����
        let r = s;
        let m = sqList.length;

        // ��������A������
        for (let j = 0; j < m; ++j) {
            //������
            let i = this.malloc();
            // ����AԪ�ص�ֵ
            this[i].data = sqList[j];
            // ���뵽��β
            this[r].cur = i;
            ++this.length;
            r = i;
        }
        // β����ָ��Ϊ��
        this[r].cur = 0;
    }

    // todo
    add (index, elem) {
    }

    remove (index) {
    }
}

/**
 * ��һά�����н�����ʾ����(A-B)U(B-A)
 * �ľ�̬����sΪ��ͷָ�롣
 * @returns {*}
 */
function difference(sllist, arr1, arr2) {
    // ��ʼ�����ÿռ�
    sllist.init();
    // ����s��ͷ���
    let s = sllist.malloc();
    // rָ��s�ĵ�ǰ�����
    let r = s;
    // ɾ��A��B��Ԫ�ظ���
    let m = arr1.length;
    let n = arr2.length;

    // ��������A������
    for (let j = 0; j < m; ++j) {
        //������
        let i = sllist.malloc();
        // ����AԪ�ص�ֵ
        sllist[i].data = arr1[j];
        // ���뵽��β
        sllist[r].cur = i;
        r = i;
    }
    // β����ָ��Ϊ��
    sllist[r].cur = 0;

    // ��������B��Ԫ�أ������ڵ�ǰ���У�����룬
    // ����ɾ��
    for (j = 0; j < n; ++j) {
        let b = arr2[j];
        let p = s;
        // kָ�򼯺��еĵ�һ�����
        let k = sllist[s].cur;
        // �ڵ�ǰ���в���
        while (k !== sllist[r].cur && sllist[k].data !== b) {
            p = k;
            k = sllist[k].cur;
        }
        // ��ǰ���в����ڸ�Ԫ�أ�������r��ָ���֮����r��λ�ò���
        if (k === sllist[r].cur) {
            i = sllist.malloc();
            sllist[i].data = b;
            sllist[i].cur = sllist[r].cur;
            sllist[r].cur = i;

            // ��Ԫ�����ڱ��У�ɾ��֮
        } else {
            sllist[p].cur = sllist[k].cur;
            sllist.free(k);
            // ��ɾ������r��ָ��㣬�����޸�βָ��
            if (r === k) r = p;
        }
    }
}

let sl = new StaticLinkedList(10);
let ret = difference(sl, [1, 2, 3], [3, 4, 5]);
console.log(sl);


let test = new StaticLinkedList(10);
test.create([49, 38, 65, 97, 76, 13, 27, 49]);
console.log(test);
