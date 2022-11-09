import Constants from "./huntConstants.js";

export async function createChatMessage() {
  const template = await renderTemplate(
    "modules/dsa5-tools/templates/request_hunt.html",
    {
      mode: document.querySelector('input[name="hunt"]:checked').value,
      region: Number(
        Constants.regionModifier[document.getElementById("huntingGround").value]
      ),
      region_label: game.i18n.format(
        "HUNTING.huntingGround." +
          document.getElementById("huntingGround").value
      ),
      weather: Number(
        Constants.weatherModifier[document.getElementById("weather").value]
      ),
      weather_label: game.i18n.format(
        "HUNTING.weather." + document.getElementById("weather").value
      ),
      hunt_text: game.i18n.format(
        "HUNTING.search." +
          document.querySelector('input[name="hunt"]:checked').value
      ),
    }
  );
  await ChatMessage.create(game.dsa5.apps.DSA5_Utility.chatDataSetup(template));
}

let qs;

export class HuntingChat {
  static chatListeners() {
    Hooks.on("renderChatLog", (log, html, data) => {
      html.on("click", ".requestAnimalLore", (ev) =>
        HuntingChat.requestAnimalLore(ev)
      );
      html.on("click", ".requestHuntSkill", (ev) =>
        HuntingChat.requestHuntSkill(ev)
      );
      html.on("click", ".finalizeHunt", (ev) => HuntingChat.finalizeHunt(ev));
    });
  }

  static qs = 0;
  //start Request for animal lore in the chat
  static requestAnimalLore(ev) {
    const actor =
      _token && _token.actor && _token.actor.isOwner
        ? _token.actor
        : game.user.character;

    if (!actor)
      return ui.notifications.error(
        game.i18n.localize("DSAError.noProperActor")
      );

    const data = ev.currentTarget.dataset;
    let skill;
    let title;
    if (data.mode === "fishing") {
      title = game.i18n.localize("HUNTING.search.fishChatButton");
      skill = actor.items.find((x) => x.type == "skill" && x.name == title);
    } else {
      title = game.i18n.localize("HUNTING.search.animalChatButton");
      skill = actor.items.find((x) => x.type == "skill" && x.name == title);
    }

    const situationalModifiers = [
      {
        name: data.regionLabel.split(" (")[0],
        value: Number(data.region),
        selected: true,
      },
    ];
    if (Number(data.weather)) {
      situationalModifiers.push({
        name: data.weatherLabel.split(" (")[0],
        value: Number(data.weather),
        selected: true,
      });
    }

    actor
      .setupSkill(
        skill,
        {
          subtitle: ` (${title})`,
          situationalModifiers,
        },
        actor.sheet.getTokenId()
      )
      .then(async (setupData) => {
        setupData.testData.opposable = false;
        const res = await actor.basicTest(setupData);
        const availableQs = res.result.qualityStep || 0;
        this.qs = availableQs;
        qs = this.qs;
        if (availableQs > 0) {
          const template = await renderTemplate(
            `modules/dsa5-tools/templates/hunt_success.html`,
            {
              ...data,
              availableQs,
              easy: game.i18n.localize(`HUNTING.search.easy.${availableQs}`),
              token: actor.sheet.getTokenId(),
              actor,
            }
          );
          await ChatMessage.create(
            game.dsa5.apps.DSA5_Utility.chatDataSetup(template)
          );
        }
      });
  }

  //start Request for hunt skill check in the chat
  static requestHuntSkill(ev) {
    const actor =
      _token && _token.actor && _token.actor.isOwner
        ? _token.actor
        : game.user.character;

    if (!actor)
      return ui.notifications.error(
        game.i18n.localize("DSAError.noProperActor")
      );

    const data = ev.currentTarget.dataset;
    let skill;
    let title;
    if (data.mode === "hunting") {
      title = game.i18n.localize("HUNTING.button.trackSearch");
      skill = actor.items.find((x) => x.type == "skill" && x.name == title);
    } else {
      title = game.i18n.localize("HUNTING.button.hiding");
      skill = actor.items.find((x) => x.type == "skill" && x.name == title);
    }

    const situationalModifiers = [
      {
        name: game.i18n.localize("HUNTING.search.makeEasy"),
        value: [0, 1, 1, 2, 2, 3][Number(data.qs) - 1],
        selected: true,
      },
    ];

    actor
      .setupSkill(
        skill,
        {
          subtitle: ` (${title})`,
          situationalModifiers,
        },
        actor.sheet.getTokenId()
      )
      .then(async (setupData) => {
        setupData.testData.opposable = false;
        const res = await actor.basicTest(setupData);
        let availableQs = res.result.qualityStep || 0;
        if (data.mode !== "fishing") {
          this.qs = this.qs * 2;
        } else {
          this.qs = this.qs > 4 ? 4 : this.qs;
        }
        if (availableQs > 0) {
          const template = await renderTemplate(
            `modules/dsa5-tools/templates/finalize_hunting.html`,
            {
              ...data,
              availableQs: this.qs,
              text: game.i18n.localize(`HUNTING.search.finalize.${data.mode}`),
              token: actor.sheet.getTokenId(),
              actor,
            }
          );
          await ChatMessage.create(
            game.dsa5.apps.DSA5_Utility.chatDataSetup(template)
          );
        }
      });
  }

  //open weapon choose dialog if an actor is selected
  static finalizeHunt(ev) {
    const data = ev.currentTarget.dataset;
    const actor = game.dsa5.apps.DSA5_Utility.getSpeaker({
      token: data.token,
      actor: data.actor,
      scene: canvas.scene ? canvas.scene.id : null,
    });

    if (!actor)
      return ui.notifications.error(
        game.i18n.localize("DSAError.noProperActor")
      );

    const situationalModifiers = [];

    let timeSavings = 0;
    let successes = 1;
    if (data.submode == 1) {
      //Erleichterung
      situationalModifiers.push({
        name: game.i18n.localize("plantgen.makeEasy"),
        value: [0, 1, 1, 2, 2, 3][Number(data.qs) - 1],
        selected: true,
      });
      timeSavings = [2, 2, 4, 4, 6, 6][Number(data.qs) - 1];
    } else {
      successes = Number(data.qs);
    }

    ActAttackDialog.showDialog(actor);
  }
}

class ActAttackDialog extends Dialog {
  static async showDialog(actor) {
    const dialog = new ActAttackDialog(
      {
        title: game.i18n.localize("HUNTING.weaponDialog.title"),
        content: await this.getTemplate(actor),

        buttons: {},
      },
      {
        width: 600,
        height: 400,
      }
    );
    dialog.actor = actor;
    dialog.render(true);
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".openAttack").click((ev) => {
      this.callbackResult(
        ev.currentTarget.dataset.value,
        this.actor,
        this.tokenId
      );
      this.close();
    });
  }

  static async getTemplate(actor) {
    const combatskills = actor.items.filter((x) => x.type == "combatskill");
    const brawl = combatskills.find(
      (x) => x.name == game.i18n.localize("LocalizedIDs.wrestle")
    );
    let items = [
      {
        name: game.i18n.localize("attackWeaponless"),
        id: "attackWeaponless",
        img: "systems/dsa5/icons/categories/attack_weaponless.webp",
        value: brawl.system.attack.value,
      },
    ];

    const types = ["rangeweapon"];
    const traitTypes = ["rangeAttack"];

    for (let x of actor.items) {
      if (types.includes(x.type) && x.system.worn.value) {
        const preparedItem = this.prepareRangeWeapon(
          x.toObject(),
          [],
          combatskills,
          actor
        );
        items.push({
          name: x.name,
          id: x.name,
          img: x.img,
          value: preparedItem.attack,
        });
      } else if (
        x.type == "trait" &&
        traitTypes.includes(x.system.traitType.value)
      ) {
        items.push({
          name: x.name,
          id: x.name,
          img: x.img,
          value: x.system.at.value,
        });
      }
    }
    const template = await renderTemplate(
      "modules/dsa5-tools/templates/dialog_reaction_attack.html",
      { dieClass: "die-mu", items, title: "DIALOG.selectAction" }
    );

    return template;
  }

  callbackResult(text, actor, tokenId) {
    if ("attackWeaponless" == text) {
      actor.setupWeaponless("attack", {}, tokenId).then(async (setupData) => {
        const res = await actor.basicTest(setupData);
        if (res.result.successLevel > 0) {
          const template = await renderTemplate(
            `modules/dsa5-tools/templates/finalize_hunting.html`,
            {
              mode: "hunted",
              availableQs: 2,
              text: game.i18n.localize(`HUNTING.search.finalize.hunt`),
              token: actor.sheet.getTokenId(),
              actor,
            }
          );
          await ChatMessage.create(
            game.dsa5.apps.DSA5_Utility.chatDataSetup(template)
          );
        }
      });
    } else {
      const types = ["meleeweapon", "trait", "rangeweapon"];
      const result = actor.items.find((x) => {
        return types.includes(x.type) && x.name == text;
      });
      if (result) {
        actor
          .setupWeapon(result, "attack", {}, tokenId)
          .then(async (setupData) => {
            const res = await actor.basicTest(setupData);
            const quali = qs * 2;
            if (res.result.successLevel > 0) {
              const template = await renderTemplate(
                `modules/dsa5-tools/templates/finalize_hunting.html`,
                {
                  mode: "hunted",
                  availableQs: quali,
                  text: game.i18n.localize(`HUNTING.search.finalize.hunt`),
                  token: actor.sheet.getTokenId(),
                  actor,
                }
              );
              await ChatMessage.create(
                game.dsa5.apps.DSA5_Utility.chatDataSetup(template)
              );
            }
          });
      }
    }
  }

  static prepareRangeWeapon(item, combatskills) {
    item.calculatedRange = item.system.reach.value;

    return item;
  }
}
