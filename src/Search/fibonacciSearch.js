/*
 Fibonacci����

 Fibonacci���ҷ����Ǹ���Fibonacci���е��ص�Բ��ұ���зָFibonacci���еĶ����ǣ�
 F(0)=0��F(1)=1��F(j)=F(j-1)+F(j-2) ��

 1  ����˼��
 ����ұ��еļ�¼����ĳ��Fibonacci��С1������n=F(j)-1����Low��High��Mid��ʾ������������½硢�Ͻ�ͷָ�λ�ã���ֵΪLow=0��High=n - 1��
 ��   ȡ�ָ�λ��Mid��Mid=F(j-1) ��
 ��   �ȽϷָ�λ�ü�¼�Ĺؼ����������Kֵ��
 �� ��ȣ� ���ҳɹ���
 ��  ���ڣ������¼�������ǰ���(���䳤��ΪF(j-1)-1)���޸��Ͻ�ָ�룺 High=Mid-1��ת�� ��
 ��  С�ڣ������¼������ĺ���(���䳤��ΪF(j-2)-1)���޸��½�ָ�룺Low=Mid+1��ת�� ��ֱ��Խ��(Low>High)������ʧ�ܡ�

 2  �㷨ʵ��
 ���㷨ʵ��ʱ��Ϊ�˱���Ƶ������Fibonacci����������������f1��f2���浱ǰ���ڵ�����Fibonacci�����������Ժ�ļ����п������ε��Ƽ������

 3  �㷨����
 ���㷨֪��Fibonacci���������������ܱ��۰���Ҳ��ƽ���������������۰���ң������۰����Ҫ���¼���ؼ�������Fibonacci���ҵ��ŵ��Ƿָ�ʱֻ����мӡ������㡣

 */

function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let f;
    let f0 = 0;
    let f1 = 1;
    for (let i = 2; i <= n; ++i) {
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}

/**
 * �������ST����Fibonacci�������ҹؼ���Ϊkey�ļ�¼
 * @param sTable
 * @param key
 * @param n
 */
function fibonacciSearch(sTable, key, n = sTable.length) {
    let low = 0;
    let high = n - 1;
    let f1 = fib(n);
    let f2 = fib(n - 1);

    while (low <= high) {
        let mid = low + f1 - 1;
        if (sTable[mid] === key) return mid;
        else if (key < sTable[mid]) {
            high = mid - 1;
            f2 = f1 - f2;
            f1 = f1 - f2;
        } else {
            low = mid + 1;
            f1 = f1 - f2;
            f2 = f2 - f1;
        }
    }
    return -1;
}

console.log('fibonacciSearch: ');
console.log(fibonacciSearch([1, 2, 3, 4, 5], 5)); // 4
console.log(fibonacciSearch([1, 2, 3, 4, 5], 6)); // -1
