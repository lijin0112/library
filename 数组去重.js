var arr1 = ["i", "b", "c", "d", "e", "f", "x"]; //����A


var arr2 = ["a", "b", "c", "d", "e", "f", "g"];//����B


var temp = []; //��ʱ����1


var temparray = [];//��ʱ����2


for (var i = 0; i < arr2.length; i++) {


  temp[arr2[i]] = true;//����ط���������B��ֵ������ʱ����1�ļ�����ֵΪ��


}
;


for (var i = 0; i < arr1.length; i++) {


  if (!temp[arr1[i]]) {


    temparray.push(arr1[i]);//����ط���ͬʱ������A��ֵ������ʱ����1�ļ����ж��Ƿ�Ϊ�棬�����Ϊ��˵��û�ظ����ͺϲ���һ��������������Ϳ��Եõ�һ��ȫ�²����ظ�������


  }
  ;


}
;


document.write(temparray.join(",") + "");
