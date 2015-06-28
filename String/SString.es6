/**
 * ����string�������ַ�����������������ַ���ɵ��������С������ַ�����Ŀ��Ϊ���ĳ��ȡ�����ַ��Ĵ���Ϊ�մ���null string�������ĳ���Ϊ�㡣
 * ����������������ַ���ɵ������г�Ϊ�ô����Ӵ��������Ӵ��Ĵ���Ӧ�س�Ϊ������ͨ�����ַ��������е����Ϊ���ַ��ڴ��е�λ�á��Ӵ��������е�λ�������Ӵ��ĵ�һ���ַ��������е�λ������ʾ��
 * ֻ�е��������ĳ�����ȣ����Ҹ�����Ӧλ�õ��ַ������ʱ����ȡ�
 *
 * ����3�ֻ��ڱ�ʾ������
 * 1.����˳��洢��ʾ
 * 2.�ѷ���洢��ʾ
 * 3.���Ŀ����洢��ʾ
 */

/**
 * ����˳��洢��ʾ
 * ���������Ա��˳��洢�ṹ����һ���ַ�����Ĵ洢��Ԫ�洢��ֵ���ַ����С��ڴ��Ķ���˳��洢�ṹ�У�����Ԥ����Ĵ�С��Ϊÿ������Ĵ���������һ���̶����ȵĴ洢��������ö���������������
 * ���±�Ϊ0�����������Ŵ���ʵ�ʳ��ȡ�
 */

export default class SString {
    constructor(str){
        this.MAXSTRLEN = 10;
        if (str) {
            this[0] = str.length;
            for (let i = 1; i <= str.length; ++i) {
                this[i] = str[i - 1];
            }
        }
    }

    // ������s1��s2���Ӷ��ɵ��´�
    concat (s2) {
        let t = new SString();
        // δ�ض�
        if (this[0] + s2[0] <= this.MAXSTRLEN) {
            copyStr2T(this);
            copyStr2T(s2, this[0]);
            t[0] = this[0] + s2[0];

            // �ض�
        } else if (this[0] < this.MAXSTRLEN) {
            copyStr2T(this);
            copyStr2T(s2, this[0], this.MAXSTRLEN - this[0]);
            t[0] = this.MAXSTRLEN;

            // �ضϣ���ȡs1��
        } else {
            copyStr2T(this, 0, this.MAXSTRLEN);
            t[0] = this[0] = this.MAXSTRLEN;
        }

        return t;

        function copyStr2T(str, start = 0, end = str[0]) {
            for (let i = 1, len = end || str[0]; i <= len; i++) {
                t[start + i] = str[i];
            }
        }
    }
    substring (position = 0, len = this[0]) {
        position = ~~position;
        len = ~~len;
        if (position < 0 || position > this[0] - 1 || len < 0 || len > this[0] - position)
            throw new Error('unexpected parameter');

        let sub = new SString();
        for (let i = 1; i <= len; i++) {
            sub[i] = this[position + i - 1];
        }
        sub[0] = len;

        return sub;
    }

    /**
     * ����s�е��Ӵ�t�滻Ϊv�������滻����
     * todo to be tested
     * @param {SString} t
     * @param {SString} v
     * @returns {number} �滻����
     */
    replace (t, v) {
        for (let n = 0, i = 1; i <= this[0] - t[0] + 1; i++) {
            for (let j = i, k = 1; t[k] && this[j] === t[k]; ++j, ++k);

            // �ҵ�����tƥ����ִ����������������
            if (k > t[0]) {
                let l;
                // ���ִ��ĳ�����ԭ�Ӵ���ͬʱ��ֱ���滻
                if (t[0] === v[0]) {
                    for (l = 1; l <= t[0]; ++l) this[i + l - 1] = v[l];
                }
                // ���Ӵ����ȴ���ԭ�Ӵ�ʱ���Ƚ�������
                else if (t[0] < v[0]) {
                    for (l = this[0]; l >= i + t[0]; --l)
                        this[l + v[0] - t[0]] = this[l];

                    for (l = 1; l <= v[0]; ++l)
                        this[i + l - 1] = v[l];

                }
                // ���Ӵ�����С��ԭ�Ӵ�ʱ���Ƚ�������
                else {
                    for (l = i + v[0]; l <= this[0] + v[0] - t[0]; ++l)
                        this[l] = this[l - v[0] + t[0]];

                    for (l = 1; l <= v[0]; ++l)
                        this[i + l - 1] = v[l];

                }

                this[0] = this[0] - t[0] + v[0];
                i += v[0];
                ++n;
            }
        }

        return n;
    }

    toString () {
        let str = '';
        for (let i = 1; this[i]; i++) {
            str += this[i];
        }
        return str;
    }
    // �����Ӵ�sstring�������еĵ�position���ַ�֮���λ��
    index (sstring, position) {
        let i = position || 1;
        let j = 1;

        while (i <= this[0] && j <= sstring[0]) {
            if (this[i] === sstring[j]) {
                i++;
                j++;
            } else {
                i = i - j + 2;
                j = 1;
            }
        }

        return j > sstring[0] ? i - sstring[0] : -1;
    }
    kmpIndex (sstring, position) {
        let i = position || 1;
        let j = 1;
        let next = getNext(sstring);

        while (i <= this[0] && j <= sstring[0]) {
            if (j === 0 || this[i] === sstring[j]) {
                ++i;
                ++j;
            } else {
                j = next[j];
            }
        }

        return j > sstring[0] ? i - sstring[0] : -1;
    }

    // ��������ַ����ж�strû�е��ַ���
    subtract (str) {
        let r = new SString();
        r[0] = 0;

        for (let i = 1; i <= this[0]; ++i) {
            let c = this[i];
            // �жϵ�ǰ�ַ�c�Ƿ��һ�γ���
            for (let j = 1; j < i && this[j] !== c; ++j);
            if (i === j) {
                // �жϵ�ǰ�ַ��Ƿ������str��
                for (let k = 1; k <= str[0] && str[k] !== c; ++k);
                if (k > str[0]) r[++r[0]] = c;
            }
        }

        return r;
    }

    // todo bug exists
    delete_substring (str) {
        for (let n = 0, i = 1; i <= this[0] - str[0] + 1; ++i) {
            for (let j = 1; j <= str[0] && this[i + j - 1] === str[j]; ++j);
            if (j > str[0] - 1) {
                for (let k = i; k <= this[0] - str[0]; ++k) this[k] = this[k + str[0]];
                this[0] -= str[0];
                ++n;
            }
        }

        return n;
    }
}

function getNext(sstring) {
    let i = 1;
    let next = {1: 0};
    let j = 0;

    while (i < sstring[0]) {
        if (j === 0 || sstring[i] === sstring[j]) {
            if (sstring[++i] !== sstring[++j]) {
                next[i] = j;
            } else {
                next[i] = next[j];
            }
//                next[++i] = ++j;
        } else {
            j = next[j];
        }
    }

    return next;
}

let a = new SString();
let b = new SString();
for (let i = 0; i < 4; i++) {
    a[i + 1] = i + '';
    b[i + 1] = i + '';
}
a[0] = b[0] = 4;
let t = a.concat(b);
console.log(t + '');       // 01230123

let d = new SString('acabaabaabcacaabc');
let c = new SString('abaabc');

console.log('index: ' + d.index(c));
console.log('kmpIndex: ' + d.kmpIndex(c));

let a = new SString('abcdefg');
let b = new SString('asdfg');
console.log(a.subtract(b) + '');

a = new SString('abcdefgh');
b = new SString('cdef');
console.log(a.delete_substring(b) + '');
console.log(a + '');

/*
 ��˳��洢�ṹ�У�ʵ�ִ�������ԭ����Ϊ���ַ������еĸ��ơ�������ʱ�临�ӶȻ��ڸ��Ƶ��ַ������еĳ��ȡ�
 ��һ�����ص��ǣ�����ڲ����г��ִ�ֵ���еĳ��ȳ���MAXSTRLENʱ��Լ���ý�β������������������������Ӵ�ʱ���ܷ������ڴ������������У�����룬�û���Ҳ���ܷ������˷�����ײ�Ψ�в��޶���������󳤶ȣ�����̬���䴮ֵ�Ĵ洢�ռ䡣
 */
