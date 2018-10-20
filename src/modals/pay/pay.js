import "./pay.css";
import API from "./../../helpers/API";

export default (modal, data, modalInstance) => {
  const sendPayment = () => {
    const payment = modal.querySelector("#pay-amount").value;
    const amount = parseInt(payment, 10); //need to send it as an integer

    // here's how you can close the modal
    // modalInstance.close();
  };

  modal.querySelector("#pay-amount").addEventListener("keyup", event => {
    const value = event.currentTarget.value;
    if (!value) {
      return;
    }
    modal.querySelectorAll(".pristine").forEach(el => {
      el.classList.remove("pristine");
    });

    modal.querySelector("#pay-send").addEventListener("click", sendPayment);
  });
};
