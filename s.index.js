module.exports = function Valkyrie(mod) {

  var command = mod.command;
  var { player } = mod.require.library;
  var skills = {};
  var enabled = true;
  var timeout = null;
  var moving = false;
  var config = require('./config.json');

  if (config.TITANSBANE_CANCEL_DELAY && typeof config.TITANSBANE_CANCEL_DELAY === 'number') {
    skills['8-1'] = {
      "delay": config.TITANSBANE_CANCEL_DELAY
    };
  }
  if (config.BLOODFLOWER_CANCEL_DELAY && typeof config.BLOODFLOWER_CANCEL_DELAY === 'number') {
    skills[13] = {
      "delay": config.BLOODFLOWER_CANCEL_DELAY
    };
  }
  if (config.GODSFALL_FIRST_CANCEL_DELAY && typeof config.GODSFALL_FIRST_CANCEL_DELAY === 'number') {
    skills['25-31'] = {
      "delay": config.GODSFALL_FIRST_CANCEL_DELAY
    };
  }
  if (config.GODSFALL_SECOND_CANCEL_DELAY && typeof config.GODSFALL_SECOND_CANCEL_DELAY === 'number') {
    skills['25-32'] = {
      "delay": config.GODSFALL_SECOND_CANCEL_DELAY
    };
  }
  if (config.RAGNAROK_CANCEL_DELAY && typeof config.RAGNAROK_CANCEL_DELAY === 'number') {
    skills[12] = {
      "delay": config.RAGNAROK_CANCEL_DELAY,
      "fixedDelay": true
    };
  }
  if (config.RECLAMATION_CANCEL_DELAY && typeof config.RECLAMATION_CANCEL_DELAY === 'number') {
    skills[19] = {
      "delay": config.RECLAMATION_CANCEL_DELAY,
      "fixedDelay": true
    };
  }
  if (config.RUNEBURST_CANCEL_DELAY && typeof config.RUNEBURST_CANCEL_DELAY === 'number') {
    skills[16] = {
      "delay": config.RUNEBURST_CANCEL_DELAY,
      "fixedDelay": true
    };
  }
  if (config.GUNGNIRS_BITE_CANCEL_DELAY && typeof config.GUNGNIRS_BITE_CANCEL_DELAY === 'number') {
    skills[23] = {
      "delay": config.GUNGNIRS_BITE_CANCEL_DELAY
    };
  }
  if (config.LEAPING_STRIKE_CANCEL_DELAY && typeof config.LEAPING_STRIKE_CANCEL_DELAY === 'number') {
    skills[6] = {
      "delay": config.LEAPING_STRIKE_CANCEL_DELAY
    };
  }
  if (config.MAELSTROM_CANCEL_DELAY && typeof config.MAELSTROM_CANCEL_DELAY === 'number') {
    skills[5] = {
      "delay": config.MAELSTROM_CANCEL_DELAY
    };
  }
  if (config.SHINING_CRESCENT_NEUTRAL_CANCEL_DELAY && typeof config.SHINING_CRESCENT_NEUTRAL_CANCEL_DELAY === 'number') {
    skills['11-0'] = {
      "delay": config.SHINING_CRESCENT_NEUTRAL_CANCEL_DELAY
    };
  }
  if (config.SHINING_CRESCENT_A_CANCEL_DELAY && typeof config.SHINING_CRESCENT_A_CANCEL_DELAY === 'number') {
    skills['11-30'] = {
      "delay": config.SHINING_CRESCENT_A_CANCEL_DELAY
    };
  }
  if (config.SHINING_CRESCENT_B_CANCEL_DELAY && typeof config.SHINING_CRESCENT_B_CANCEL_DELAY === 'number') {
    skills['11-31'] = {
      "delay": config.SHINING_CRESCENT_B_CANCEL_DELAY
    };
  }
  if (config.GLAIVE_STRIKE_CANCEL_DELAY && typeof config.GLAIVE_STRIKE_CANCEL_DELAY === 'number') {
    skills[3] = {
      "delay": config.GLAIVE_STRIKE_CANCEL_DELAY
    };
  }
  if (config.GROUND_BASH_CANCEL_DELAY && typeof config.GROUND_BASH_CANCEL_DELAY === 'number') {
    skills[9] = {
      "delay": config.GROUND_BASH_CANCEL_DELAY
    };
  }
  if (config.DREAM_SLASH_CANCEL_DELAY && typeof config.DREAM_SLASH_CANCEL_DELAY === 'number') {
    skills[10] = {
      "delay": config.DREAM_SLASH_CANCEL_DELAY,
      "fixedDelay": true
    };
  }
  if (config.BACK_STAB_CANCEL_DELAY && typeof config.BACK_STAB_CANCEL_DELAY === 'number') {
    skills[20] = {
      "delay": config.BACK_STAB_CANCEL_DELAY
    };
  }
  if (config.BALDERS_CANCEL_DELAY && typeof config.BALDERS_CANCEL_DELAY === 'number') {
    skills[17] = {
      "delay": config.BALDERS_CANCEL_DELAY
    };
  }
  if (config.WIND_SLASH_CANCEL_DELAY && typeof config.WIND_SLASH_CANCEL_DELAY === 'number') {
    skills[15] = {
      "delay": config.WIND_SLASH_CANCEL_DELAY
    };
  }
  if (config.TWILIGHT_WALTZ_CANCEL_DELAY && typeof config.TWILIGHT_WALTZ_CANCEL_DELAY === 'number') {
    skills['24-0'] = {
      "delay": config.TWILIGHT_WALTZ1_CANCEL_DELAY
    };
    skills['24-1'] = {
      "delay": config.TWILIGHT_WALTZ1_CANCEL_DELAY
    };
    skills['24-2'] = {
      "delay": config.TWILIGHT_WALTZ2_CANCEL_DELAY
    };
    /*
    skills['24-3'] = {
      "delay": config.TWILIGHT_WALTZ3_CANCEL_DELAY
    };
    */
    skills['24-4'] = {
      "delay": config.TWILIGHT_WALTZ_CANCEL_DELAY
    };
  }
  if (config.SPINNING_DEATH_CANCEL_DELAY && typeof config.SPINNING_DEATH_CANCEL_DELAY === 'number') {
    /*
    skills['7-0'] = {
      "delay": config.SPINNING_DEATH_CANCEL_DELAY1
    };
    skills['7-1'] = {
      "delay": config.SPINNING_DEATH_CANCEL_DELAY1
    };
     */

    skills['7-2'] = {
      "delay": config.SPINNING_DEATH_CANCEL_DELAY
    };
  }

  command.add('valkyrie', {
    $default() {
      enabled = !enabled;
      command.message('Valkyrie is now ' + (enabled ? 'enabled' : 'disabled') + ".");
    }
  });
  mod.hook('C_START_SKILL', 7, { order: -999 }, event => {
    moving = event.moving;
  });
  mod.hook('S_ACTION_STAGE', 9, {
    "order": -1000000,
    "filter": {
      "fake": true
    }
  }, function (event) {
    if (!enabled || event.gameId !== mod.game.me.gameId || mod.game.me.class !== 'glaiver') {
      return;
    }
    var skllId = Math.floor(event.skill.id / 10000);
    var skillSubId = event.skill.id % 100;
    if (skllId in skills || skllId + "-" + skillSubId in skills) {
      var skill = skllId in skills ? skills[skllId] : skills[skllId + "-" + skillSubId];
     if ((event.skill.id === 110400 || event.skill.id === 110430 || event.skill.id === 70900 || event.skill.id === 70901 || event.skill.id === 151100 || event.skill.id === 151130) && moving)
            return;
      timeout = mod.setTimeout(function () {
        mod.toClient('S_ACTION_END', 5, {
          "gameId": event.gameId,
          "loc": {
            "x": event.loc.x,
            "y": event.loc.y,
            "z": event.loc.z
          },
          "w": event.w,
          "templateId": event.templateId,
          "skill": event.skill.id,
          "type": 12394123,
          "id": event.id
        });
      }, skill.fixedDelay ? skill.delay : skill.delay / player.aspd);
    }
  });

  mod.hook('S_ACTION_END', 5, {
    "order": -1000000,
    "filter": {
      "fake": true
    }
  }, function (event) {
    if (!enabled || event.gameId !== mod.game.me.gameId || mod.game.me.class !== 'glaiver') {
      return;
    }
    var skillId = Math.floor(event.skill.id / 10000);
    var skillSubId = event.skill.id % 100;
    if (timeout && (skillId in skills || skillId + "-" + skillSubId in skills)) {
      timeout = null;
      if (event.type == 12394123) {
        event.type = 4;
        return true;
      } else {
        return false;
      }
    }
  });

  mod.hook('C_CANCEL_SKILL', 3, function () {
    if (!enabled || mod.game.me.class !== 'glaiver') {
      return;
    }
    if (timeout) {
      mod.clearTimeout(timeout);
      timeout = null;
    }
  });

  mod.hook('S_EACH_SKILL_RESULT', 14, {
    "order": -10000000
  }, function (event) {
    if (!enabled || !timeout || event.target !== mod.game.me.gameId || !event.reaction.enable) {
      return;
    }
    mod.clearTimeout(timeout);
    timeout = null;
  });
}