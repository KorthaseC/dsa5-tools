import Smithing from "./smithing.js";
import { createChatMessage, HuntingChat } from "./hunting.js";

class Tools extends CanvasLayer {
  static ID = "dsa5-tools";

  static TEMPLATES = {
    SMITH: `modules/${this.ID}/templates/smithingForm.html`,
    HUNT: `modules/${this.ID}/templates/huntingForm.html`,
  };

  constructor() {
    super();
  }

  // <================== Button Setup ====================>
  setButtons() {
    tools.newButtons = {
      name: "tools",
      icon: "fas fa-toolbox",
      layer: "controls",
      title: game.i18n.localize("DSATOOLS.button"),
      tools: [
        {
          icon: "fas fa-hammer-crash",
          name: "smithy",
          title: game.i18n.localize("SMITHING.icon"),
          onClick: tools.openSmith,
        },
        {
          icon: "fas fa-bow-arrow",
          name: "hunting",
          title: game.i18n.localize("HUNTING.icon"),
          onClick: tools.openHunt,
        },
      ],
    };
  }

  // <================== Initialize  ====================>
  // Initialize the Smithy. Attach the button to the controls, draw the square, and the draw text.
  initialize() {
    Hooks.on("getSceneControlButtons", (controls) => {
      if (game.user.isGM) {
        controls.push(tools.newButtons);
      }
    });
  }

  openSmith() {
    new SmithingForm("smithy").render(true);
  }

  openHunt() {
    new HuntingForm("hunting").render(true);
  }
}

let tools;
Hooks.once("setup", () => {
  tools = new Tools();
  tools.setButtons();
  tools.initialize();
});

//Form Application
class SmithingForm extends FormApplication {
  constructor() {
    super();
  }

  static get defaultOptions() {
    const defaults = super.defaultOptions;

    return mergeObject(defaults, {
      classes: ["form"],
      popOut: true,
      template: Tools.TEMPLATES.SMITH,
      id: "smithing-form",
      title: game.i18n.localize("SMITHING.title"),
      closeOnSubmit: false,
      resizable: true,
      dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
    });
  }

  async _updateObject(event, formData) {}

  //gets droped elemten Data and writes it
  async _onDrop(event) {
    fromUuid(TextEditor.getDragEventData(event).uuid).then((result) => {
      document.getElementById("itemPrice").value = result.system.price.value;
      document.getElementById("itemWeight").value = result.system.weight.value;
      const skill = getKeyByValue(combatskill, result.system.combatskill.value);
      document.getElementById("weapon").value = skill;
      selectWeaponArmor(skill);
    });
  }

  activateListeners([html]) {
    super.activateListeners(this.element);

    //first intilization set of weapon
    Smithing.selectWeaponArmor(document.getElementById("weapon").value);

    const selectQuali = html.querySelector("select#quali");
    selectQuali.addEventListener("change", (event) => {
      Smithing.changeQuali(selectQuali.value);
    });

    const selectSlider = html.querySelector("input#slider");
    selectSlider.addEventListener("change", (event) => {
      Smithing.setPriceValue(selectSlider.value);
    });

    const selectWeapon = html.querySelector("select#weapon");
    selectWeapon.addEventListener("change", (event) => {
      Smithing.selectWeaponArmor(selectWeapon.value);
    });

    const selectMaterial = html.querySelector("select#material");
    selectMaterial.addEventListener("change", (event) => {
      Smithing.changeMaterialToolTip(selectMaterial.value);
    });

    const selectCraftTechnic = html.querySelector("select#craftTechnic");
    selectCraftTechnic.addEventListener("change", (event) => {
      Smithing.changeCraftToolTip(selectCraftTechnic.value);
    });

    const selectCalcButton = html.querySelector("button#calcButton");
    selectCalcButton.addEventListener("click", (event) => {
      Smithing.calcCraftedPrice();
    });
  }
}

class HuntingForm extends FormApplication {
  constructor() {
    super();
  }

  static get defaultOptions() {
    const defaults = super.defaultOptions;

    return mergeObject(defaults, {
      classes: ["form"],
      popOut: true,
      template: Tools.TEMPLATES.HUNT,
      id: "hunting-form",
      title: game.i18n.localize("HUNTING.title"),
      closeOnSubmit: true,
      resizable: true,
      dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
    });
  }

  //request animal lore or fishing in chat
  async requestRoll(ev) {
    await createChatMessage();
  }

  async _updateObject(event, formData) {}

  //gets droped elemten Data and writes it
  async _onDrop(event) {
    fromUuid(TextEditor.getDragEventData(event).uuid).then((result) => {
      document.getElementById("itemPrice").value = result.system.price.value;
      document.getElementById("itemWeight").value = result.system.weight.value;
      const skill = getKeyByValue(combatskill, result.system.combatskill.value);
      document.getElementById("weapon").value = skill;
      selectWeaponArmor(skill);
    });
  }

  activateListeners([html]) {
    super.activateListeners(this.element);

    const huntRadio = html.querySelectorAll("input[name='hunt']");
    for (const element of huntRadio) {
      element.addEventListener("change", (event) => {
        console.log(element.value);
      });
    }

    const selectHuntingGround = html.querySelector("select#huntingGround");
    selectHuntingGround.addEventListener("change", (event) => {
      console.log(selectHuntingGround.value);
    });

    const selectWeather = html.querySelector("select#weather");
    selectWeather.addEventListener("change", (event) => {
      console.log(selectWeather.value);
    });

    const selectStartHuntButton = html.querySelector("button#startHuntButton");
    selectStartHuntButton.addEventListener("click", (event) => {
      this.requestRoll();
    });
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

window.SmithingForm = SmithingForm;
HuntingChat.chatListeners();
