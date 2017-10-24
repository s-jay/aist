
// РАБОТАЮЩИЙ ПРИМЕР - https://jsfiddle.net/os5ra7L3/5/

getSubtractionValue = (sourceString, queryString, weight) => {
	// для удобства, обозначу через x и y строки
  let x;
  let y;

  // что длиннее, то и стаим в x
  if (sourceString.length >= queryString.length) {
    x = sourceString;
    y = queryString;
  } else {
  	y = sourceString;
    x = queryString;
  }

  let i=0;
  let j=0;
  let resultArr = [];

  // хелпер для получения минимального значения
  getMin = (arr) => {
  	let min = arr[0];
  	for (let m=1; m<arr.length; m++) {
    	if (arr[m] < min) {
      	min = arr[m];
			}
		}
    return min;
  }

 	// итерации по строкам
  while (j<y.length) {
  	// сбрасываем счетчик столбцов
  	i=0;
    // добавляем подмассив для дальнейшего заполнения
    resultArr[j] = [];

    // итерации по столбцам
  	while(i<x.length) {
    	let data = 0;

    	// если равным, берем i-1, j-1
    	if (x[i] === y[j]) {
        // если это первая строка, заполняем по индексам i
        if (j===0) {
          data = i;
        } else {
          // если начало строки, заполняем по индексам j
          if (i === 0) {
            data = j;
          } else {
            data = resultArr[j-1][i-1];
          }
        }
      } else {
        // если значения не равны
        // проверяем транспозицию
        if (resultArr[j-1] && resultArr[j-1][i-1] && (x[i] === y[j-1] && x[i-1] === y[j])) {
        	if (resultArr[j-2] && resultArr[j-2][i-2]) {
          	data = weight+getMin([resultArr[j][i-1],resultArr[j-1][i-1],resultArr[j-1][i], resultArr[j-2][i-2]])
          } else {
          	data = weight+getMin([resultArr[j][i-1],resultArr[j-1][i-1],resultArr[j-1][i], 0])
          }
        } else {
        	// если это первая строка, то 2 значения - это i и i+1
          if (j===0) {
            if (i===0) {
              data = weight+getMin([i,i+1,j+1]);
            } else {
              data = weight+getMin([i,i+1,resultArr[j][i-1]]);
            }
          } else {
            // если начало строки, заполняем по индексам j
            if (i === 0) {
              data = weight+getMin([j,j+1,resultArr[j-1][i]]);
            } else {
              data = weight+getMin([resultArr[j][i-1],resultArr[j-1][i-1],resultArr[j-1][i]]);
            }
          }
        }
      }

      // добавляем в массив найденное значение
      resultArr[j].push(data);
      i++;
    }
    result.innerHTML += JSON.stringify(resultArr[j])+'<br>';
  	j++;
  }
  result.innerHTML += '<br>Результат: '+resultArr.pop().pop();
}

let sourceString = 'компьютер';
let queryString = 'кмопьютер';
let weight = 1;
getSubtractionValue(sourceString, queryString, weight)
