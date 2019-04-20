const calculate = () => {
  const amount = Number(document.getElementById("amount").value);
  const months = Number(document.getElementById("months").value);
  const interest = parseFloat(5 / 100) * amount;
  const payments = (amount + interest) / months;
  const totalpayable = payments * months;
  const totalinterest = totalpayable - amount;

  if (isFinite(payments)) {
    console.log(payments);
    document.getElementById("payment").innerHTML = payments;
    document.getElementById("total").innerHTML = totalpayable;
    document.getElementById("totalinterest").innerHTML = totalinterest;
  } else {
    document.getElementById("payment").innerHTML = 0.0;
    document.getElementById("total").innerHTML = "0.00";
    document.getElementById("totalinterest").innerHTML = "0.00";
  }
};
