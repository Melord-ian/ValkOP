# ValkOP

ValkOP is a TERA Toolbox module for **Valkyrie/Glaiver** automation and quality-of-life combat flow.

It tracks cooldowns, rune state, and boss position, then automatically remaps slash inputs into an optimized skill chain while a boss is detected.

## Features

- Toggles on/off with the in-game command `!valk`.
- Only runs for the **glaiver** class.
- Tracks rune marks (`S_WEAK_POINT`) and skill cooldown packets.
- Detects nearby bosses and keeps their live location/rotation updated.
- Redirects projectile hit packets to the detected boss target.
- Replaces slash skills (groups 1 and 2) with priority-based skills depending on:
  - cooldown availability,
  - rune count,
  - category enable states,
  - detected boss state.

## Files

- `index.js` – main module logic.
- `module.json` – Toolbox module metadata + required packet definitions.
- `module.config.json` – default runtime config flags.

## Installation

1. Copy this module folder into your Toolbox `mods` directory.
2. Ensure the folder contains `index.js`, `module.json`, and `module.config.json`.
3. Start Toolbox and log in on a Valkyrie.

## Usage

- In chat, run:

  ```
  !valk
  ```

  This toggles the module enabled/disabled.

## Notes

- This module relies on packet versions declared in `module.json`.
- If game patches change protocol versions, update those definitions accordingly.
- Use at your own risk.
