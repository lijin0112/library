var arr1 = ["i", "b", "c", "d", "e", "f", "x"]; //数组A


var arr2 = ["a", "b", "c", "d", "e", "f", "g"];//数组B


var temp = []; //临时数组1


var temparray = [];//临时数组2


for (var i = 0; i < arr2.length; i++) {


  temp[arr2[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真


}
;


for (var i = 0; i < arr1.length; i++) {


  if (!temp[arr1[i]]) {


    temparray.push(arr1[i]);//巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组


  }
  ;


}
;


document.write(temparray.join(",") + "");
