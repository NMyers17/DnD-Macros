// SharpShooter
// Required modules: itemacro

const id = "sharpshooter";
const effect = actor.effects.find(e => e.flags.core?.statusId === id);
if(effect) return effect.delete();

const mode = CONST.ACTIVE_EFFECT_MODES.ADD;

return actor.createEmbeddedDocuments("ActiveEffect", [{
  changes: [{
    "key": "data.bonuses.rwak.damage",
    "mode": 2,
    "value": 10,
    "priority": 20
}, {
    "key": "data.bonuses.rwak.attack",
    "mode": 2,
    "value": "-5",
    "priority": 20
}],
  icon: item.img,
  label: item.name,
  "flags.core.statusId": id
}]);