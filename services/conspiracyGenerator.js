const people = require("../data/people");
const events = require("../data/events");
const organizations = require("../data/organizations");
const mechanisms = require("../data/mechanisms");

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//templates for 4 kinds of sentesses
const templates = [
  ({ person, event, organization, mechanism }) =>
    `${person} מפעיל בסתר את ${event} עבור ${organization} באמצעות ${mechanism}.`,

  ({ person, event, organization, mechanism }) =>
    `${organization} גייסו את ${person} כדי לשלוט ב-${event} דרך ${mechanism}.`,

  ({ person, event, organization, mechanism }) =>
    `מאחורי ${event} עומד ${person}, שפועל עבור ${organization} באמצעות ${mechanism}.`,

  ({ person, event, organization, mechanism }) =>
    `${mechanism} הוא למעשה כלי של ${organization}, המופעל על ידי ${person} כדי להשפיע על ${event}.`
];

function generateConspiracy() {
  const person = randomItem(people);
  const event = randomItem(events);
  const organization = randomItem(organizations);
  const mechanism = randomItem(mechanisms);

  const template = randomItem(templates);
  return template({
    person,
    event,
    organization,
    mechanism,
  });
}

module.exports = generateConspiracy;