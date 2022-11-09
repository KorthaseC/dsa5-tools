import Constants from "./smithConstants.js";

function changeQuali(value) {
  switch (value) {
    case "low":
      $("#slider").prop("min", 0.01);
      $("#slider").prop("max", 0.9);
      $("#slider").prop("value", 0.1);
      setPriceValue(0.1);
      break;
    case "medium":
      $("#slider").prop("min", 1.0);
      $("#slider").prop("max", 4.0);
      $("#slider").prop("value", 1.0);
      setPriceValue(1.0);
      break;
    case "high":
      $("#slider").prop("min", 5.0);
      $("#slider").prop("max", 9.0);
      $("#slider").prop("value", 5.0);
      setPriceValue(5.0);
      break;
    case "perfect":
      $("#slider").prop("min", 10.0);
      $("#slider").prop("max", 50.0);
      $("#slider").prop("value", 10.0);
      setPriceValue(10.0);
      break;
  }
}

function setPriceValue(val) {
  document.getElementById("priceValue").value = val;
}

function selectWeaponArmor(val) {
  const material = document.getElementById("material");
  const boni1 = document.getElementById("boni1");
  const boni2 = document.getElementById("boni2");
  const craftTechnic = document.getElementById("craftTechnic");
  while (material.options.length > 0) {
    material.options.remove(0);
  }
  while (boni1.options.length > 0) {
    boni1.options.remove(0);
  }
  while (boni2.options.length > 0) {
    boni2.options.remove(0);
  }
  while (craftTechnic.options.length > 0) {
    craftTechnic.options.remove(0);
  }

  changeMaterialToolTip("steel");
  changeCraftToolTip("");

  if (
    val === "normalCloth" ||
    val === "thickCloth" ||
    val === "clothArmor" ||
    val === "leatherArmor" ||
    val === "woodArmor" ||
    val === "chainArmor" ||
    val === "scaleArmor" ||
    val === "palteArmor" ||
    val === "turnier"
  ) {
    //add Armor material to dropdown
    for (let key in Constants.armorMaterial) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.material." + key)
      );
      option.appendChild(optionText);
      material.appendChild(option);
    }

    //add Armor boni to dropdown
    for (let key in Constants.armorBoni1) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.boni." + key)
      );
      option.appendChild(optionText);
      boni1.appendChild(option);
    }
    for (let key in Constants.armorBoni2) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.boni." + key)
      );
      option.appendChild(optionText);
      boni2.appendChild(option);
    }

    //add Armor craft technik to dropdown
    for (let key in Constants.craftArmor) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.craftTechnic." + key)
      );
      option.appendChild(optionText);
      craftTechnic.appendChild(option);
    }
  } else {
    //add Weapon material to dropdown
    for (let key in Constants.weaponMaterial) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.material." + key)
      );
      option.appendChild(optionText);
      material.appendChild(option);
    }

    //add Weaapon boni to dropdown
    for (let key in Constants.weaponBoni1) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.boni." + key)
      );
      option.appendChild(optionText);
      boni1.appendChild(option);
    }
    for (let key in Constants.weaponBoni2) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.boni." + key)
      );
      option.appendChild(optionText);
      boni2.appendChild(option);
    }

    //add Weapon craft technik to dropdown
    for (let key in Constants.craftWeapon) {
      let option = document.createElement("option");
      option.setAttribute("value", key);
      let optionText = document.createTextNode(
        game.i18n.format("SMITHING.craftTechnic." + key)
      );
      option.appendChild(optionText);
      craftTechnic.appendChild(option);
    }
  }
}

function changeMaterialToolTip(value) {
  switch (value) {
    case "vulcan":
    case "fire":
      document
        .getElementById("materialTip")
        .setAttribute("class", "fas fa-circle-info");
      document
        .getElementById("materialTip")
        .setAttribute(
          "data-tooltip",
          game.i18n.format("SMITHING.material.tooltip1")
        );
      break;
    case "mindorium1":
    case "mindorium2":
    case "mindorium3":
    case "arkanium1":
    case "arkanium2":
    case "arkanium3":
      document
        .getElementById("materialTip")
        .setAttribute("class", "fas fa-circle-info");
      document
        .getElementById("materialTip")
        .setAttribute(
          "data-tooltip",
          game.i18n.format("SMITHING.material.tooltip2")
        );
      document.getElementById("craftTechnic").disabled = true;
      document.getElementById("craftTechnic").value = "noneCraft";
      changeCraftToolTip("");
      break;
    case "mindorium1A":
    case "mindorium2A":
    case "arkanium1A":
    case "arkanium2A":
      document
        .getElementById("materialTip")
        .setAttribute("class", "fas fa-circle-info");
      document
        .getElementById("materialTip")
        .setAttribute(
          "data-tooltip",
          game.i18n.format("SMITHING.material.tooltip3")
        );
      document.getElementById("craftTechnic").disabled = true;
      document.getElementById("craftTechnic").value = "noneCraft";
      changeCraftToolTip("");
      break;
    case "endurium1":
    case "endurium2":
    case "endurium3":
    case "endurium1A":
    case "endurium2A":
    case "endurium3A":
    case "titanium1":
    case "titanium2":
    case "titanium3":
    case "titanium1A":
    case "titanium2A":
    case "titanium3A":
      document.getElementById("craftTechnic").disabled = true;
      document.getElementById("craftTechnic").value = "noneCraft";
      changeCraftToolTip("");
      break;
    default:
      document.getElementById("materialTip").removeAttribute("class");
      document.getElementById("materialTip").removeAttribute("data-tooltip");
      document.getElementById("craftTechnic").disabled = false;
      document.getElementById("craftTechnic").value = "noneCraft";
      changeCraftToolTip("");
  }
}

function changeCraftToolTip(value) {
  switch (value) {
    case "falt":
    case "lehm":
      document
        .getElementById("craftTechnicTip")
        .setAttribute("class", "fas fa-circle-info");
      document
        .getElementById("craftTechnicTip")
        .setAttribute(
          "data-tooltip",
          game.i18n.format("SMITHING.craftTechnic.tooltip1")
        );
      break;
    case "chainBuild":
      document
        .getElementById("craftTechnicTip")
        .setAttribute("class", "fas fa-circle-info");
      document
        .getElementById("craftTechnicTip")
        .setAttribute(
          "data-tooltip",
          game.i18n.format("SMITHING.craftTechnic.tooltip2")
        );
      break;
    default:
      document.getElementById("craftTechnicTip").removeAttribute("class");
      document
        .getElementById("craftTechnicTip")
        .removeAttribute("data-tooltip");
  }
}

function calcCraftedPrice() {
  document.getElementById("priceText").innerHTML = "";
  document.getElementById("meteorText").innerHTML = "";

  const workingPrice = parseFloat(document.getElementById("priceValue").value);
  const attr1 = parseInt(document.getElementById("attr1").value);
  const attr2 = parseInt(document.getElementById("attr2").value);
  const attr3 = parseInt(document.getElementById("attr3").value);
  const fw = parseInt(document.getElementById("fw").value);
  const weapon = document.getElementById("weapon").value;
  const material = document.getElementById("material").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const itemWeight = parseFloat(document.getElementById("itemWeight").value);
  const boni1 = document.getElementById("boni1").value;
  const boni2 = document.getElementById("boni2").value;
  const craftTechnic = document.getElementById("craftTechnic").value;

  const triesCounter = setTriesCounter(material);
  let intervalCounter = 0;
  let qsCounter = 0;
  let missModifer = 0;
  let hasDoubleOne = false;
  let modification = 0;
  const materialPrice = calcMaterialPrice(material, itemPrice, itemWeight);
  const interval = calcInterval(material, boni1, boni2, craftTechnic, weapon);
  const materialModifer = calcMaterialModifer(material, weapon);

  let boniModifer =
    Constants.diceModiferBoni[boni1] + Constants.diceModiferBoni[boni2];
  let craftModifer = Constants.diceModiferCraftTechnic[craftTechnic];

  modification = materialModifer + boniModifer + craftModifer;

  let counter = 0;
  while (counter < triesCounter) {
    counter = counter + 1;
    if (qsCounter < 10) {
      intervalCounter = intervalCounter + 1;

      let dice1 = getRandomD20();
      let dice2 = getRandomD20();
      let dice3 = getRandomD20();

      if (
        (dice1 === 20 && dice2 === 20) ||
        (dice1 === 20 && dice3 === 20) ||
        (dice2 === 20 && dice3 === 20)
      ) {
        document.getElementById("priceText").innerHTML = game.i18n.format(
          "SMITHING.priceText.failure"
        );
        document.getElementById("meteorText").innerHTML = "";
        return;
      }

      if (
        (dice1 === 1 && dice2 === 1) ||
        (dice1 === 1 && dice3 === 1) ||
        (dice2 === 1 && dice3 === 1)
      ) {
        missModifer = 0;
        hasDoubleOne = true;
      }

      //calc diff between attribute and dice roll
      let diff1 = calcDiffAttrDice(attr1, missModifer, modification, dice1);
      let diff2 = calcDiffAttrDice(attr2, missModifer, modification, dice2);
      let diff3 = calcDiffAttrDice(attr3, missModifer, modification, dice3);

      let remainFW = fw + diff1 + diff2 + diff3;

      //Calculate QS
      if (remainFW >= 0) {
        qsCounter = calcQualityStep(remainFW, hasDoubleOne, qsCounter);
      } else {
        missModifer = missModifer - 1;
      }
      hasDoubleOne = false;
    }
  }

  if (qsCounter >= 10) {
    let weaponPrice = interval * intervalCounter * workingPrice + materialPrice;
    document.getElementById("priceText").innerHTML =
      game.i18n.format("SMITHING.priceText.part1") +
      weaponPrice.toFixed(2) +
      game.i18n.format("SMITHING.priceText.part2") +
      interval * intervalCounter +
      game.i18n.format("SMITHING.priceText.part3");
    if (material.includes("meteor")) {
      document.getElementById("meteorText").innerHTML =
        game.i18n.format("SMITHING.priceText.meteor") + getMeteorEffect();
    }
  } else {
    document.getElementById("priceText").innerHTML = game.i18n.format(
      "SMITHING.priceText.failed"
    );
    document.getElementById("meteorText").innerHTML = "";
  }
}

function getRandomD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function getMeteorEffect() {
  switch (getRandomD20()) {
    case 0:
    case 1:
    case 2:
    case 3:
      return game.i18n.format("SMITHING.meteorIron.1");
    case 4:
    case 5:
      return game.i18n.format("SMITHING.meteorIron.2");
    case 6:
      return game.i18n.format("SMITHING.meteorIron.3");
    case 7:
    case 8:
    case 9:
      return game.i18n.format("SMITHING.meteorIron.4");
    case 10:
    case 11:
      return game.i18n.format("SMITHING.meteorIron.5");
    case 12:
      return game.i18n.format("SMITHING.meteorIron.6");
    case 13:
      return game.i18n.format("SMITHING.meteorIron.7");
    case 14:
    case 15:
      return game.i18n.format("SMITHING.meteorIron.8");
    case 16:
    case 17:
    case 18:
      return game.i18n.format("SMITHING.meteorIron.9");
    case 19:
      return game.i18n.format("SMITHING.meteorIron.10");
    case 20:
      return game.i18n.format("SMITHING.meteorIron.11");
  }
}

function setTriesCounter(material) {
  if (
    material.includes("endurium") ||
    material.includes("titanium") ||
    material.includes("toschkril")
  ) {
    return 5;
  }
  return 7;
}

function calcMaterialPrice(material, itemPrice, itemWeight) {
  if (
    material.includes("steel") ||
    material.includes("grassoden") ||
    material.includes("fluSteel") ||
    material.includes("kunchomer") ||
    material.includes("mirhamer") ||
    material.includes("premer") ||
    material.includes("uhdenber")
  ) {
    return itemPrice / 4;
  } else {
    return Constants.materialPriceList[material] * itemWeight;
  }
}

function calcMaterialModifer(material, weapon) {
  let materialModifer = Constants.diceModiferMaterial[material];
  if (weapon === "sword" && material === "kunchomer") {
    materialModifer = 1;
  }
  if (weapon === "degen" && material === "kunchomer") {
    materialModifer = -1;
  }
  if (weapon === "bow" && material === "ebenwood") {
    materialModifer = 2;
  }
  return materialModifer;
}

function calcInterval(material, boni1, boni2, craftTechnic, weapon) {
  let meteorInterval = 0;
  if (material.includes("meteor")) {
    meteorInterval = material.includes("1") ? 5 : 7;
  }
  let intervalMultipler =
    Constants.intervalBoniMultipler[boni1] +
    Constants.intervalBoniMultipler[boni2] +
    Constants.intervalCraftTechnicMultipler[craftTechnic] +
    meteorInterval;
  return intervalMultipler === 0
    ? Constants.intervalEquipment[weapon]
    : Constants.intervalEquipment[weapon] * intervalMultipler;
}

function calcDiffAttrDice(attr, missModifer, modification, dice) {
  return attr + missModifer + modification - dice >= 0
    ? 0
    : attr + missModifer + modification - dice;
}

function calcQualityStep(remainFW, hasDoubleOne, qsCounter) {
  remainFW = Math.min(remainFW, 16); //returns 16 if remainFW>16
  remainFW = Math.max(1, remainFW); //returns 1 if remainFW=0
  let offset = Math.ceil(remainFW / 3);
  if (hasDoubleOne) {
    offset *= 2;
  }
  return qsCounter + offset;
}

export default {
  changeQuali,
  setPriceValue,
  selectWeaponArmor,
  changeMaterialToolTip,
  changeCraftToolTip,
  calcCraftedPrice,
};
