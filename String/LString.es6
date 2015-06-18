/**
 * ���Ŀ����洢��ʾ
 *
 * �����Ա����ʽ�洢�ṹ�����ƣ�Ҳ�ɲ�����ʽ��ʽ�洢��ֵ�����ڴ��ṹ��������--�ṹ�е�ÿ������Ԫ����һ���ַ�����������洢��ֵʱ������һ��������С�������⣬��ÿ�������Դ��һ���ַ���Ҳ���Դ�Ŷ���ַ���
 * �����ǽ���СΪ4����ÿ�������4���ַ���������
 * head --> (a,b,c,d) --> (e,f,g,h) --> (i###)
 * �����ǽ���СΪ1������
 * head --> (a) --> (b) --> (c) --> ... --> (i)
 *
 * ������С����1ʱ�����ڴ�����һ���ǽ���С�����������������е����һ����㲻һ��ȫ����ֵռ������ʱͨ�����ϡ�#���������Ǵ�ֵ�ַ���
 * Ϊ�˱��ڽ��д��Ĳ�������������洢��ֵʱ����ͷָ���⻹�ɸ���һ��βָ��ָʾ�����е����һ����㣬��������ǰ���ĳ��ȣ�����˶���Ĵ��洢�ṹΪ�����ṹ��
 *
 * ����һ������£��Դ����в���ʱ��ֻ��Ҫ��ͷ��β˳��ɨ�輴�ɣ���Դ�ֵ���ؽ���˫��������βָ���Ŀ����Ϊ�˱��ڽ������Ӳ�������Ӧע������ʱ�账���һ����β����Ч�ַ���
 * ����ʽ�洢��ʽ�У�����С��ѡ���˳��洢��ʽ�ĸ�ʽѡ��һ��������Ҫ����ֱ��Ӱ�쵽�������Ч�ʡ�������ܳ�����Ҫ�����ǿ��Ǵ�ֵ�Ĵ洢�ܶȣ�
 * �洢�ܶ� = ��ֵ��ռ�Ĵ洢λ / ʵ�ʷ���Ĵ洢λ
 *
 * ��ֵ����ʽ�洢�ṹ��ĳЩ�������������Ӳ�������һ������֮�������ܵ���˵�����������ִ洢�ṹ����ռ�ô洢�����Ҳ������ӡ�
 */
import Stack from '../Stack/stack';

class Chunk {
    constructor(chunkSize = 4) {
        this.chunkSize = chunkSize;
        this.ch = [];
        for (let i = 0; i < this.chunkSize; i++) {
            this.ch[i] = '#';
        }
        // type: Chunk
        this.next = null;
    }
}

export default class LString {
    constructor(chunkSize = 4) {
        // type Chunk
        this.head = null;
        // type: chunk
        this.tail = null;
        // ���ĵ�ǰ����
        this.length = 0;
        this.chunkSize = chunkSize;
    }

    // ���ַ���ת����LString����
    strAssign (chars) {
        this.head = this.tail = new Chunk(this.chunkSize);
        this.length = chars.length;

        let current = this.head;
        for (let i = 0, len = chars.length; i < len; i++) {
            current.ch[i % this.chunkSize] = chars[i];
            if (i + 1 < len && (i + 1) % this.chunkSize === 0) {
                current.next = new Chunk();
                current = current.next;
            }
        }

        this.tail = current;
    },
    // �ַ����Ա�
    // TODO �Ƿ�ȥ��chunkSize�ĶԱ�
    strCompare (tLString) {
        let current = this.head;
        let curT = tLString.head;

        if (this.length !== tLString.length) return false;

        while (current) {
            for (let i = 0; i < this.chunkSize; i++) {
                if (current.ch[i] !== curT.ch[i]) return false;
            }

            current = current.next;
            curT = curT.next;
        }

        return true;
    },
    clearString () {
        this.head = this.tail = null;
        this.length = 0;
    },
    concat (tLSting) {
        if (!tLSting.length) return;

        let ret = new LString(this.chunkSize);

        if (this.head === null) {
            copyString(ret, tLSting);
        } else {
            ret.head = ret.tail = new Chunk(this.chunkSize);
            copyString(ret, this);

            let index = ret.tail.ch.indexOf('#');
            if (index === -1) {
                copyString(ret, tLSting);
            } else {
                copyString(ret, tLSting, ret.tail, tLSting.head, index);
            }
        }

        return ret;
    },
    substring (pos, len) {
        pos = ~~pos || 0;
        len = ~~len || this.length;
        if (pos < 0 || pos > this.length - 1 || len < 0 || len > this.length - pos)
            throw new Error('unexpected parameter');

        let sub = new LString(this.chunkSize);
        let current = findPosChunk(this, pos);
        let curS = sub.head = new Chunk(this.chunkSize);
        let i = 0;
        sub.length = len;

        outerloop: while (current) {
            for (let j = 0, size = this.chunkSize; j < size; j++) {
                if (i === len) {
                    break outerloop;
                } else {
                    curS.ch[j] = current.ch[(i + pos) % this.chunkSize];
                    i++;
                    if ((i + pos) % this.chunkSize === 0) {
                        current = current.next;
                    }
                    if (i % this.chunkSize === 0 && (current.ch[i] || current.next)) {
                        curS.next = new Chunk(this.chunkSize);
                        curS = curS.next;
                    }
                }
            }
        }

        return sub;
    },
    toString () {
        let current = this.head;

        if (current === null) return '';

        let str = '';
        while (current) {
            for (let i = 0, len = this.chunkSize; i < len; i++) {
                let ch = current.ch[i];
                if (ch === '#') {
                    return str;
                } else {
                    str += current.ch[i];
                }
            }
            current = current.next;
        }

        return str;
    }
}

function findPosChunk(lString, pos) {
    let current = lString.head;
    while (current) {
        for (let i = 0, len = lString.chunkSize; i < len; i++) {
            if (pos-- === 0) return current;
        }
        current = current.next;
    }
}

function copyString(destination, target, curD, currT, offset) {
    offset = offset || 0;
    currT = currT || target.head;
    curD = curD || destination.head;
    let k = 0;

    while (currT) {
        for (let i = 0, len = target.chunkSize; i < len; i++, k++) {
            let j = k % curD.chunkSize + offset;
            curD.ch[j % curD.chunkSize] = currT.ch[i];

            if ((j + 1) % curD.chunkSize === 0 && (currT.ch[i + 1] || currT.next)) {
                curD.next = new Chunk(destination.chunkSize);
                curD = curD.next;
            }
        }

        currT = currT.next;
    }

    destination.tail = curD;
    destination.length += target.length;
}

let a = new LString();
let b = new LString();
let c = new LString();

a.strAssign('abcdefg');
console.log(a + '');
b.strAssign('hijklmno');
console.log(b + '');
c.strAssign('abcdefg');
console.log(a.strCompare(b));
console.log(a.strCompare(c));
let t = a.concat(b);
console.log(t + '');
t = t.substring(2, 5);
console.log(t + '');


// �ж��Ƿ�Ϊ�����ַ���
function palindrome(lStr) {
    let stack = new Stack();
    let p = lStr.head;
    let i = 0;

    for (let k = 1; k <= lStr.length; ++k) {
        if (k <= lStr.length / 2) stack.push(p.ch[i]);
        else if (k > (lStr.length + 1) / 2) {
            let c = stack.pop();
            if (p.ch[i] !== c) return false;
        }

        if (++i === lStr.chunkSize) {
            p = p.next;
            i = 0;
        }
    }

    return true;
}
