// mayhem macro.
// save mayhem dice on user in a flag.
// max: number of players.
// min: 0.

if (!game.user.isGM) return ui.notifications.error("Mayhem is for GMs only!");

const value = game.user.getFlag("world", "mayhem.value") ?? 0;
const max = 5;

new Dialog({
  title: "Mayhem!",
  content: `
  <p>When a player is reduced to zero hit points, or killed outright, the DM earns one point of inspiration.
  The points stack to a maximum of <strong>${max}</strong> points.</p>
  <p style="text-align:center">You currently have <strong>${value}</strong> points.</p>
  <hr>`,
  buttons: {
    earn: {
      icon: '<i class="fas fa-arrow-up"></i>',
      label: "Earn a point",
      callback: async () => message(1)
    },
    spend: {
      icon: '<i class="fas fa-arrow-down"></i>',
      label: "Spend a point",
      callback: async () => message(-1)
    }
  },
  default: value < max ? "earn" : "spend"
}).render(true);


async function message(add = 0) {
  const newValue = Math.clamped(value + add, 0, max);
  if (value === newValue) {
    if (add === -1) return ui.notifications.info("You have no points to spend.");
    if (add === 1) return ui.notifications.info("You cannot earn more points.");
    return;
  }
  let blurb;
  if (add === -1) blurb = "The GM has spent one point of inspiration.";
  else if (add === 1) blurb = "The GM has gained one point of inspiration.";
  else return;
  const style0 = "text-align: center; border-radius: 20px;";
  const style1 = `font-size: 60px; padding: 20px 0 0 0; ${style0} margin: 10px 0 0 0; border-top: solid;`;
  const style2 = `font-size: 80px; padding: 0 0 20px 0; ${style0} margin: 0 0 10px 0; border-bottom: solid; font-family: 'Modesto Condensed';`;
  const content = `
  <p style="${style1}"><i class="fas fa-bolt"></i></p>
  <p style="${style2}">Mayhem!</p>
  <hr>
  <p>${blurb}</p>
  <p>Current stack: <strong>${newValue}</strong></p>`;
  await ChatMessage.create({ content });
  return game.user.setFlag("world", "mayhem.value", newValue);
}