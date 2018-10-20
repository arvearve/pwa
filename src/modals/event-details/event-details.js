import "./event-details.css";

export default (modal, data, modalRef) => {
  const absoluteAmount = Math.abs(data.amount);
  const type = data.amount > 0 ? "credit" : "debit";

  modal.querySelector("#event-details-payer").src = window.UserInfo.profile;
  modal.querySelector("#event-details-receiver").src = data.picture;
  modal.querySelector(
    "#event-details-amount"
  ).innerText = `€ ${absoluteAmount}`;

  if (type === "debit") {
    modal.querySelector(".event-details-direction").classList.add("debit");
  }
  modal.querySelector("#event-details-amount").classList.add(type);
  modal.querySelector(".event-details-bottom .description").innerText =
    data.description;
};
