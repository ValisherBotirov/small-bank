'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
accounts.forEach(function (val) {
  val.username = val.owner
    .toLowerCase()
    .split(' ')
    .map(function (val) {
      return val[0];
    })
    .join('');
});
// console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const ekrangaTranslarniChiqarish = function (obj) {
  containerMovements.innerHTML = '';
  obj.movements.forEach(function (val, key) {
    let tekshir = val > 0 ? 'deposit' : 'withdrawal';
    let qalay = ` <div class="movements__row">
         <div class="movements__type movements__type--${tekshir}">${
      key + 1
    } ${tekshir}</div>
         <div class="movements__date">3 days ago</div>
         <div class="movements__value">${val}</div>
       </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', qalay);
  });
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const pulYigindi = function (obj) {
  let yig = obj.movements.reduce(function (yig, val) {
    return yig + val;
  }, 0);
  return yig;
};
// pastki qismidagi foyda zarar va keshback
let out = 0;
let sumIn = 0;
let kommisiya = 0;
const statistika = function (obj) {
  out = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
  sumIn = obj.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
  kommisiya = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .map(function (val) {
      return (val * obj.interestRate) / 100;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
};

let kirganUser;
let totalSum;
// login qismidagi button uchun
btnLogin.addEventListener('click', function (e) {
  // refresh bo'lsa ham uchib ketmaydi
  e.preventDefault();
  let login = inputLoginUsername.value;
  let parol = Number(inputLoginPin.value);
  kirganUser = accounts.find(function (val) {
    return val.username == login;
  });

  // console.log(kirganUser);
  if (kirganUser?.pin == parol) {
    // inputga kiritgandan keyin malumotlarni uchirish
    inputLoginPin.value = inputLoginUsername.value = '';
    labelWelcome.textContent = `Welcome to ${kirganUser.owner}`;
    labelWelcome.style.color = '#333';
    containerApp.style.opacity = 1;
  } else {
    labelWelcome.textContent = `Try again!`;
    labelWelcome.style.color = 'red';
  }
  // umumiy summa
  labelBalance.textContent = `${pulYigindi(kirganUser)} €`;
  totalSum = pulYigindi(kirganUser);
  ekrangaTranslarniChiqarish(kirganUser);
  statistika(kirganUser);

  labelSumIn.textContent = `${sumIn}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${Math.abs(kommisiya)}€`;
});
// =========================================================================================
// green bankdagi button uchun
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let qarzValue = Number(inputLoanAmount.value);
  inputLoanAmount.value = ' ';

  if (qarzValue > 0 && qarzValue < (sumIn * 10) / 100) {
    kirganUser.movements.push(qarzValue);
    labelBalance.textContent = `${pulYigindi(kirganUser)} €`;
    ekrangaTranslarniChiqarish(kirganUser);
    statistika(kirganUser);

    labelSumIn.textContent = `${sumIn}€`;
    labelSumOut.textContent = `${Math.abs(out)}€`;
    labelSumInterest.textContent = `${Math.abs(kommisiya)}€`;
  } else alert('Buncha miqdorda pul ololmaysiz');
});
// =========================================================================================

// let qarzValue;
// // --------------------------------------------------------------------------------------------------------------
// // qarz olish fungsiyasi
// const qarzOlish = function (totalSum) {
//   return totalSum + Number(inputLoanAmount.value);
// };
// // green bankdagi button uchun
// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();

//   // if bilan tekshirish kerak
//   qarzValue = Number(inputLoanAmount.value);
//   kirganUser.movements.push(qarzValue);
//   ekrangaTranslarniChiqarish(kirganUser);
//   statistika(kirganUser);
//   // console.log(qarzValue);
//   labelBalance.textContent = `${qarzOlish(totalSum)}€`;
//   totalSum = qarzOlish(totalSum);

//   inputLoanAmount.value = ' ';

//   // let qarz = Number(inputLoanAmount.value);
//   // labelBalance.textContent = totalSum + qarz;
//   // console.log(qarz);
// });
// -----------------------------------------------------------------------------------------------
let oluvchiUser;
// yellow bankdagi button bosilganda
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let login = inputTransferTo.value;
  let sum = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = '';
  oluvchiUser = accounts.find(function (val) {
    return val.username == login;
  });
  if (
    sum > 0 &&
    pulYigindi(kirganUser) > sum &&
    oluvchiUser.username !== kirganUser.username
  ) {
    oluvchiUser.movements.push(sum);
    kirganUser.movements.push(-sum);
    labelBalance.textContent = `${pulYigindi(kirganUser)} €`;
    ekrangaTranslarniChiqarish(kirganUser);
    statistika(kirganUser);

    labelSumIn.textContent = `${sumIn}€`;
    labelSumOut.textContent = `${Math.abs(out)}€`;
    labelSumInterest.textContent = `${Math.abs(kommisiya)}€`;
  }
});

// red bankdagi btn bosilganda
let uchuvchiUser;
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  let login = inputCloseUsername.value;
  let parol = Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = ' ';
  let uchuvchiUser = accounts.findIndex(function (val) {
    return val.pin == parol;
  });
  if (kirganUser.pin == parol) {
    accounts.splice(uchuvchiUser);
    containerApp.style.opacity = 0;
  }
  // btnLogin.addEventListener('click', function () {
  //   // if (inputLoginPin.value == uchuvchiUser.pin) {
  //   // alert("Bu login o'chirilgan");
  //   // }
  //   if (accounts?.uchuvchiUser) {
  //     // alert("Bu login o'chirilgan");
  //   } else alert("Bu login o'chirilgan");
  // });
});

// Sort buttoni

let check = 1;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (check) {
    movements = [...kirganUser.movements];
    kirganUser.movements.sort((a, b) => a - b);
    check = 0;
  } else {
    kirganUser.movements = [...movements];
    check = 1;
  }
  ekrangaTranslarniChiqarish(kirganUser);
});
// -----------------------------------------------------------------------------------------------------------------------------
// sort 2-usul
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   accounts.forEach(function (val) {
//     val.movementsSort = val.movements;
//     val.movementsSort.sort(function (a, b) {
//       if (a > b) {
//         return 1;
//       } else return -1;
//     });
//     ekrangaTranslarniChiqarish(kirganUser);
//     console.log(val.movementsSort);
//   });
//   let sortniQaytar = function (obj) {
//     // let ochir = obj.movementsSort;
//     delete obj['movementsSort'];
//     return obj;
//     // obj.movementsSort = obj.movements;
//   };
//   btnSort.addEventListener('click', function () {
//     sortniQaytar(kirganUser);
//     delete kirganUser['movementsSort'];
//     ekrangaTranslarniChiqarish(kirganUser);
//   });
// });

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

labelBalance.addEventListener('click', function () {
  console.log([...document.querySelectorAll('.movements__value')]);
  let price = Array.from(
    document.querySelectorAll('.movements__value'),
    function (val, key) {
      return Number(val.textContent);
    }
  );
  console.log(price);
});
