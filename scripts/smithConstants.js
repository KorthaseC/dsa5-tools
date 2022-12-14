const materialPriceList = {
  bronze: 40,
  iron: 8,
  maraskan: 65,
  toschlril: 750,
  dwarf: 160,
  ebenwood: 20,
  ironwood: 80,
  stonewood: 75,
  zykolp: 15,
  horn: 10,
  bone: 10,
  vulcan: 15,
  fire: 5,
  mindorium1: 1000,
  mindorium2: 1500,
  mindorium3: 2000,
  arkanium1: 10000,
  arkanium2: 15000,
  arkanium3: 20000,
  endurium1: 30000,
  endurium2: 60000,
  endurium3: 120000,
  titanium1: 500000,
  titanium2: 1000000,
  titanium3: 2000000,
  meteor1: 50,
  meteor2: 80,
  bronzeA: 40,
  ironA: 8,
  maraskanA: 65,
  toschlrilA: 750,
  dwarfA: 160,
  ebenwoodA: 20,
  ironwoodA: 80,
  stonewoodA: 75,
  zykolpA: 15,
  hornA: 10,
  boneA: 10,
  mindorium1A: 200,
  mindorium2A: 500,
  arkanium1A: 2000,
  arkanium2A: 5000,
  endurium1A: 12000,
  endurium2A: 30000,
  endurium3A: 120000,
  titanium1A: 200000,
  titanium2A: 500000,
  titanium3A: 2000000,
  meteor1A: 100,
  meteor2A: 150,
  droler: 20,
  phrai: 25,
  iryan: 30,
  woolnose: 30,
};

const intervalEquipment = {
  crossbow: 3,
  bow: 0.75,
  dagger: 0.5,
  degen: 1,
  club: 0.25,
  chain: 0.75,
  lance: 0.25,
  whip: 0.25,
  brawl: 0.25,
  shield: 0.5,
  slingshot: 0.125,
  sword: 1,
  staff: 0.75,
  throw: 0.5,
  twoClub: 1,
  twoSword: 1,
  normalCloth: 0.25,
  thickCloth: 0.25,
  clothArmor: 0.375,
  leatherArmor: 0.75,
  woodArmor: 1,
  chainArmor: 1,
  scaleArmor: 1.5,
  palteArmor: 1,
  turnier: 2,
};

const intervalBoniMultipler = {
  noneBoni: 0,
  at1: 2,
  at2: 2,
  pa1: 3,
  tp1: 4,
  tp2: 4,
  fk1: 3,
  fk2: 3,
  bf1: 1.5,
  bf2: 1.5,
  rs1: 5,
  gs1: 2,
  gs2: 2,
  ini1: 2,
  ini2: 2,
  stab1: 1.5,
  stab2: 1.5,
};

const intervalCraftTechnicMultipler = {
  noneCraft: 0,
  falt: 5,
  lehm: 3,
  chainBuild: 3,
};

const diceModiferBoni = {
  noneBoni: 0,
  at1: -1,
  at2: -1,
  pa1: -2,
  tp1: -1,
  tp2: -1,
  fk1: -1,
  fk2: -1,
  bf1: -1,
  bf2: -1,
  rs1: -5,
  gs1: -1,
  gs2: -1,
  ini1: -1,
  ini2: -1,
  stab1: -1,
  stab2: -1,
};

const diceModiferCraftTechnic = {
  noneCraft: 0,
  falt: -1,
  lehm: 1,
  chainBuild: -1,
};

const diceModiferMaterial = {
  steel: 0,
  bronze: 1,
  iron: 1,
  grassoden: -1,
  fluSteel: 0,
  kunchomer: 0,
  maraskan: 1,
  mirhhammer: 0,
  premer: -1,
  toschlril: -3,
  uhdenber: -1,
  dwarf: 2,
  ebenwood: 0,
  ironwood: -2,
  stonewood: -1,
  zykolp: 1,
  horn: 1,
  bone: 0,
  vulcan: 2,
  fire: -4,
  mindorium1: 0,
  mindorium2: -1,
  mindorium3: -2,
  arkanium1: 0,
  arkanium2: -1,
  arkanium3: -2,
  endurium1: -3,
  endurium2: -3,
  endurium3: -3,
  titanium1: -5,
  titanium2: -5,
  titanium3: -5,
  meteor1: -3,
  meteor2: -4,
  steelA: 0,
  bronzeA: 2,
  fluSteelA: 0,
  kunchomerA: 0,
  maraskanA: 0,
  mirhamerA: 0,
  premerA: 1,
  toschlrilA: -3,
  uhdenberA: -1,
  dwarfA: 2,
  ebenwoodA: 0,
  ironwoodA: -2,
  stonewoodA: -1,
  zykolpA: 1,
  hornA: -1,
  boneA: -1,
  droler: 1,
  phrai: 0,
  iryan: 1,
  woolnose: -1,
  mindorium1A: -2,
  mindorium2A: -4,
  arkanium1A: -3,
  arkanium2A: -6,
  endurium1A: -2,
  endurium2A: -3,
  endurium3A: -4,
  titanium1A: -5,
  titanium2A: -6,
  titanium3A: -7,
  meteor1A: -3,
  meteor2A: -4,
};

const combatskill = {
  crossbow: "Armbr??ste",
  bow: "B??gen",
  dagger: "Dolche",
  degen: "Fechtwaffen",
  club: "Hiebwaffen",
  chain: "Kettenwaffen",
  lance: "Lanzen",
  whip: "Peitschen",
  brawl: "Raufen",
  shield: "Schilde",
  slingshot: "Schleudern",
  sword: "Schwerter",
  staff: "Stangenwaffen",
  throw: "Wurfwaffen",
  twoClub: "Zweihandhiebwaffen",
  twoSword: "Zweihandschwerter",
  normalCloth: "Normale Kleidung",
  thickCloth: "Schwere Kleidung",
  clothArmor: "Stoffr??stung",
  leatherArmor: "Lederr??stung",
  woodArmor: "Holzr??stung",
  chainArmor: "Kettenr??stung",
  scaleArmor: "Schuppenr??stung",
  palteArmor: "Plattenr??stung",
  turnier: "Turnierr??stung",
};

const weaponMaterial = {
  steel: "Stahl",
  bronze: "Bronze",
  iron: "Eisen",
  grassoden: "Grassodenerz",
  fluSteel: "Gro??er Fluss-Stahl",
  kunchomer: "Khunchomer Stahl",
  maraskan: "Maraskanstahl",
  mirhamer: "Mirhamer Stahl",
  premer: "Premer Stahl",
  toschlril: "Toschkril",
  uhdenber: "Uhdenberger Stahl",
  dwarf: "Zwergenstahl",
  ebenwood: "Ebenholz",
  ironwood: "Eisenbaum",
  stonewood: "Steineiche",
  zykolp: "Zyklopenzeder",
  horn: "Horn",
  bone: "Knochen",
  vulcan: "Vulkanglas",
  fire: "Feuerstein",
  mindorium1: "Mindorium 50%",
  mindorium2: "Mindorium 75%",
  mindorium3: "Mindorium 100%",
  arkanium1: "Arkanium 50%",
  arkanium2: "Arkanium 75%",
  arkanium3: "Arkanium 100%",
  endurium1: "Endurium 25%",
  endurium2: "Endurium 50%",
  endurium3: "Endurium 100%",
  titanium1: "Titanium 25%",
  titanium2: "Titanium 50%",
  titanium3: "Titanium 100%",
  meteor1: "ge??hnliches Meteoreisen",
  meteor2: "schweres Meteoreisen",
};
const armorMaterial = {
  steelA: "Stahl",
  bronzeA: "Bronze",
  fluSteelA: "Gro??er Fluss-Stahl",
  kunchomerA: "Khunchomer Stahl",
  maraskanA: "Maraskanstahl",
  mirhamerA: "Mirhamer Stahl",
  premerA: "Premer Stahl",
  toschlrilA: "Toschkril",
  uhdenberA: "Uhdenberger Stahl",
  dwarfA: "Zwergenstahl",
  ebenwoodA: "Ebenholz",
  ironwoodA: "Eisenbaum",
  stonewoodA: "Steineiche",
  zykolpA: "Zyklopenzeder",
  hornA: "Horn",
  boneA: "Knochen",
  droler: "Dr??ler Stoff",
  phrai: "Phraischafwolle",
  iryan: "Iryanleder",
  woolnose: "Wollnashornleder",
  mindorium1A: "Mindorium 10%",
  mindorium2A: "Mindorium 25%",
  arkanium1A: "Arkanium 10%",
  arkanium2A: "Arkanium 25%",
  endurium1A: "Endurium 10%",
  endurium2A: "Endurium 25%",
  endurium3A: "Endurium 100%",
  titanium1A: "Titanium 10%",
  titanium2A: "Titanium 25%",
  titanium3A: "Titanium 100%",
  meteor1A: "ge??hnliches Meteoreisen",
  meteor2A: "schweres Meteoreisen",
};
const weaponBoni1 = {
  noneBoni: "none",
  at1: "at",
  pa1: "pa",
  tp1: "tp",
  fk1: "range",
  bf1: "bf",
};
const weaponBoni2 = {
  noneBoni: "none",
  at2: "at",
  tp2: "tp",
  fk2: "range",
  bf2: "bf",
};
const armorBoni1 = {
  noneBoni: "none",
  rs1: "rs",
  gs1: "gs",
  ini1: "ini",
  stab1: "stab",
};
const armorBoni2 = {
  noneBoni: "none",
  gs2: "gs",
  ini2: "ini",
  stab2: "stab",
};
const craftWeapon = {
  noneCraft: "none",
  falt: "falt",
  lehm: "lehm",
};
const craftArmor = {
  noneCraft: "none",
  chainBuild: "chain",
};

export default {
  materialPriceList,
  intervalEquipment,
  intervalBoniMultipler,
  intervalCraftTechnicMultipler,
  diceModiferBoni,
  diceModiferCraftTechnic,
  diceModiferMaterial,
  combatskill,
  weaponMaterial,
  armorMaterial,
  weaponBoni1,
  weaponBoni2,
  armorBoni1,
  armorBoni2,
  craftWeapon,
  craftArmor,
};
