var userDate= document.querySelector("#userDate")
var btnFind = document.querySelector("#btnFind")
const output = document.querySelector(".output")
const gif= document.querySelector("#gif")
const dateInAMonth=[31, Number('${new Date().getFullYear()% 4? 29: 28 }'),31,30,31,30,31,31,30,31,30,31]




btnFind.addEventListener("click",()=>{
    output.style.display='block'
    // checks whether user has selected the date or not.
    if(userDate.value===''){
        output.innerHTML="Please provide a date to find out."
    }
    // if the date is selected show the gif
    else{
        output.style.display='none'
        gif.style.display='block'
        setTimeout(()=>{
            output.style.display='block'
            gif.style.display='none'
            inputDatehandler()
        },3500)
    }
})

function inputDatehandler() {
  // it is an array which contains date , moth and Year
  const dateArray= userDate.value.split("-")

  const inputDay= dateArray[2]
  const inputMonth = dateArray[1]
  const inputYear = dateArray[0]

  let returnDate = checkDifFormat(inputDay,inputMonth,inputYear)

  if(returnDate){
    output.innerHTML="Congratulations your birthdate is an palindrome"
  }else {
    const newDate= futurePalindrome(inputDay,inputMonth,inputYear)
    console.log(newDate);
    var nearestPal= newDate[0]
    var dayRemain = newDate[1]
    output.innerHTML="Sorry your birthdate is not an palindrome nearest palindrome is "+nearestPal+
    "you missed it by " +dayRemain+ "."
    console.log(nearestPal);
  }
}

//checks the date in four different formats.
  function checkDifFormat(dd,mm,yyyy){

  //stores the date (1...31)
    let dateStr= dd.toString()
    console.log("dd ",dd);
    console.log("dateStr ",dateStr);
//stores the month from user input.
    let monthStr = mm.toString()
    console.log("mm",mm);
    console.log("dateMonth ", monthStr);

//stores the year from user input.
    let yearStr = yyyy.toString()
    console.log("yy ",yyyy);
    console.log("dateYear ",yearStr);

    if(dateStr.length===1){
      dateStr= "0"+dateStr
    }

    if(monthStr.length===1){
      monthStr="0"+monthStr
    }

//sets the string various format.
    const formatOne= dateStr+ monthStr + yearStr;
    const formatTwo= monthStr + dateStr + yearStr;
     const formatThree= yearStr + monthStr + dateStr;
     const formatFour = monthStr +dateStr +yearStr;

//calls to the fun isPalindrome with formats and return specific format.
    if(isPalindrome(formatOne)){
        return (`${dateStr}-${monthStr}-${yearStr}`)
    }
    else if (isPalindrome(formatTwo)) {
        return (`${monthStr}-${dateStr}-${yearStr}`)
    }
    else if (isPalindrome(formatThree)) {
        return (`${yearStr}-${monthStr}-${dateStr}`)
    }
    else if (isPalindrome(formatFour)) {
      return (`${monthStr}-${dateStr}-${yearStr}`)
    }
    else {
      return null
    }
  }

  function isPalindrome(dateString) {
    const revString= dateString.toString().split('').reverse().join('')
    if(dateString=== revString){
      return true
    }
  }

//for the future palindrome date
  function futurePalindrome(date, month ,year){
    var futureDate= Number(date)
    console.log("futureDate ",futureDate);
    var futureMonth = Number(month)
    console.log("futureMonth ",futureMonth);
    var futureYear= Number(year)
    console.log("futureYear", futureYear);

    var pastDate= Number(date)
    var pastMonth = Number(month)
    var pastYear = Number(year)

    let missedDay=0

    while(true){
      missedDay +=1 ;
      futureDate +=1;
      pastDate -=1;

      if(futureDate> dateInAMonth[futureMonth-1]){
        futureDate=1;
        futureMonth  = futureMonth+ 1;
        if(futureMonth>12){
          futureMonth=1;
          futureYear= futureYear+1;

          if(futureYear>9999){
            break
          }
        }
      }

      if(pastDate< 1){
        pastMonth -= 1;
        if(pastMonth<1){
          pastYear -=1
          if(pastYear< 1){
            return["",""]
          }else{
            pastMonth =12;
            pastDate= dateInAMonth[pastMonth-1]
          }
        }else {
          pastDate= dateInAMonth[pastMonth-1]
        }
      }

      console.log(pastDate,pastMonth,pastYear,"==",futureDate,futureMonth,futureYear);
      const nextPali=checkDifFormat(futureDate,futureMonth,futureYear);
      if (nextPali)
          return [nextPali, missedDay];

          const prevPali=checkDifFormat(pastDate,pastMonth,pastYear);
      if (prevPali)
          return [prevPali, missedDay];
    }
  }
