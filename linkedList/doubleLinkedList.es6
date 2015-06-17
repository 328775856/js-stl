/**
 * ѭ������circular linked list��
 * ����һ����ʽ����ʽ�洢�ṹ�������ص��Ǳ������һ������ָ����ָ��ͷ��㣬�������γ�һ������
 * ѭ������Ĳ����������������һ�£�����ϸ΢���
 */

/**
 * ˫������
 *
 * ˫��������Ϊ�˿˷����������ֵ����Ե�ȱ�㡣
 * ˫������Ľ����������ָ������һָ��ֱ�Ӻ�̣���һָ��ֱ��ǰ����
 *
 * ˫������Ҳ������ѭ����
 */

export default class DoubleLinkedList {
    constructor(data = null, prior = this, next = this) {
        this.data = data;
        this.prior = prior;
        this.next = next;
    }

    find (i) {
        // ��ʼ����pָ���һ���ڵ㣬jΪ������
        let p = this.next;
        let j = 1;
        // ˳ָ�������ң�֪��pָ���i��Ԫ�ػ�pΪ��
        while (p && j < i) {
            p = p.next;
            ++j;
        }
        // ��i��Ԫ�ز�����
        // ����ȡ��i��Ԫ��
        return (!p || j > i) ? null : p;
    }
    add (i, elem) {
        let p;

        if (!(p = this.find(i))) return false;

        let s = new DoubleLinkedList(elem, p.prior, p);
        p.prior.next = s;
        p.prior = s;

        return true;
    }
    remove (i) {
        let p;
        if (!(p = this.find(i))) return false;

        let e = p.data;
        p.prior.next = p.next;
        p.next.prior = p.prior;

        p = null;

        return e;
    }
}


let a = new DoubleLinkedList(1);

a.add(0, 1);
a.add(1, 2);
a.add(2, 3);
a.remove(1);
console.log(a);
