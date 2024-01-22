

const formatToLocaleCurrency = (amount, ) => {
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

return USDollar.format(amount);
}


 export default formatToLocaleCurrency;




