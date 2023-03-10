//Starry Form for Circle of the Stars - Druid
// Required Modules: ItemMacro

await item.use();
if (token.data.light.dim === 0) {
    await token.document.update({
        light: {
            bright: 10,
            dim: 20,
            color: "#8a00c2",
            "animation.type": "torch"
        }
    })
}

// Flags
async function createItems(selection,uuids){
    if (item.getFlag("world", "starryform") === selection){
        return ui.notifications.warn("This Constellation is already active.");
      }
      const items = await Promise.all(uuids.map(uuid => fromUuid(uuid)));
  const itemData = items.map(i => {
    return foundry.utils.mergeObject(i.toObject(), {"flags.world.starryform-item": true});
  });
  await actor.deleteEmbeddedDocuments("Item", actor.items.filter(i => {
    return i.getFlag("world", "starryform-item");
  }).map(i => i.id));
  await actor.createEmbeddedDocuments("Item", itemData);
  return item.setFlag("world", "starryform", selection);
}

// Dialog Options for Starry Form
new Dialog({
    title: "Starry Form",
    content: "Which constellation do you wish to assume?",
    buttons: {
      Archer: {
        label: "Archer",
        icon: "<i class='fa-solid fa-bow-arrow'></i>",
        callback: async () => createItems("Archer", [
          "Compendium.zalgons-module.class-features.QsTeYCqfrCoWGa9L"
        ])
      },
      Chalice: {
        label: "Chalice",
        icon: "<i class='fa-solid fa-trophy'></i>",
        callback: async () => createItems("Chalice", [
          "Compendium.zalgons-module.class-features.Qf6qfDVvT32pGRWd"
        ])
      },
      Dragon: {
        label: "Dragon",
        icon: "<i class='fa-solid fa-dragon'></i>",
        callback: async () => createItems("Dragon", [
            "Compendium.zalgons-module.class-features.azpA25PeqdxkjEMy"
        ])
 },
 End: {
  label: "End Form",
  callback: async()=> {
      await actor.deleteEmbeddedDocuments("Item", actor.items.filter(i => {
          return i.getFlag("world", "starryform-item");
      }).map(i => i.id));
      await token.document.update({
          light: {
              bright: 0,
              dim: 0
          }
      });
  }
}
}
}).render(true);