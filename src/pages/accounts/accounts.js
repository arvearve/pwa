import { formatCurrency } from "./../../helpers/currency";
import API from "./../../helpers/API";

const getAccountTemplate = account => {
  const amount = formatCurrency(account.amount);

  return `<div class="account">
        <div class="rippleJS"></div>
        <div class="account-icon" style="background-color: ${account.color}">
            <img src="/assets/bank.svg" width="30px" height="30px">
        </div>
        <div class="account-details">
            <div>
                <div class="account-name">${account.name}</div>
                <div class="account-value">${amount.amount}.
                    <sup>${amount.cents}</sup>
                </div>
            </div>
        </div>
</div>`;
};

const calculateTotal = accounts => {
  return accounts.reduce((total, account) => total + account.amount, 0);
};

const loadAccounts = () => {
  API.get("accounts.json").then(accounts => {
    let html = "";
    accounts.forEach(account => {
      html += getAccountTemplate(account);
    });
    $("#accounts-list").innerHTML = html;

    const total = formatCurrency(calculateTotal(accounts));
    $("#accounts-total").innerHTML = `${total.amount}.<sup>${
      total.cents
    }</sup>`;
  });
};

loadAccounts();