// Armourer Model Choice Macro
// Allows player to select Armour model and then have effects and items applied to actor.

await item.use();
async function createItems(selection, uuids){
  if(item.getFlag("world", "armourer") === selection){
    return ui.notifications.warn("You already have these items.");
  }
  const items = await Promise.all(uuids.map(uuid => fromUuid(uuid)));
  const itemData = items.map(i => {
    return foundry.utils.mergeObject(i.toObject(), {"flags.world.armourer-item": true});
  });
  await actor.deleteEmbeddedDocuments("Item", actor.items.filter(i => {
    return i.getFlag("world", "armourer-item");
  }).map(i => i.id));
  await actor.createEmbeddedDocuments("Item", itemData);
  return item.setFlag("world", "armourer", selection);
}

new Dialog({
  title: "Armour Model",
  content: "Please choose which Armour model you would like to equip.",
  buttons: {
    guardian: {
      label: "Guardian",
      icon: "<i class='fa-solid fa-hand-sparkles'></i>",
      callback: async () => createItems("guardian", [
        "Compendium.zalgons-module.class-features.dQubCGXJIpkQloSI", 
        "Compendium.zalgons-module.class-features.UljxFbjWdZDKrjal"
      ])
    },
    infiltrator: {
      label: "Infiltrator",
      icon: "<i class='fa-solid fa-user-secret'></i>",
      callback: async () => createItems("infiltrator", [
        "Compendium.zalgons-module.class-features.ZAdN53r3rCZQ56EH",
        "Compendium.zalgons-module.class-features.ZxaKBRAOUq14kIEf",
        "Compendium.zalgons-module.class-features.Nu8sNei6JqOlqNKK"
      ])
    }
  }
}).render(true)