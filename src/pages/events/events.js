import(/*webpackChunkName: "events"*/ "./events.css");
import API from "./../../helpers/API";
import { formatCurrency } from "./../../helpers/currency";

const getEventSection = section => {
  return `<div class="container">
<p class="event-date text-darker-gray">${section.date}</p>
</div>`;
};

const getEventInfo = event => {
  const amount = formatCurrency(event.amount);
  const paymentType = event.amount < 0 ? "debit" : "credit";

  return `<div class="event-card" data-event='${JSON.stringify(event)}'>
          <div class="rippleJS"></div>

        <img src="${
          event.picture ? event.picture : "assets/bunq.png"
        }" alt="" width="40" height="40">
        <div class="event-details">
            <div class="event-title">${event.summary}</div>
            <div class="event-description">${event.description}</div>
        </div>
        <div class="event-amount ${paymentType}">
            <span class="amount">${amount.amount}.</span>
            <sup>${amount.cents}</sup>
        </div>
    </div>`;
};

API.get("events.json").then(events => {
  let html = "";
  events.forEach(section => {
    html += getEventSection(section);

    section.events.forEach(event => {
      html += getEventInfo(event);
    });
  });

  $("#events").innerHTML = html;
});