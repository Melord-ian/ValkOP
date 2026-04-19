# Merge Assessment: `s.*` files into `index.js`

## What I reviewed
- `s.index.js`
- `s.config.json`
- `s.configNA.json`
- `s.module.json`
- `s.module.config.json`
- current `index.js`
- current `module.json` and `module.config.json`

## Plain-English summary
`index.js` and `s.index.js` are **not the same type of script**:
- `s.index.js` is mainly a **cancel-delay injector** (it watches skill start and forces early action end based on config delays).
- `index.js` is a larger **rotation/automation + cooldown/state manager**.

Because both hook several of the same packets (`C_START_SKILL`, `S_ACTION_STAGE`, `S_ACTION_END`, `S_EACH_SKILL_RESULT`) and both alter skill behavior, a blind merge would likely create conflicts.

## Compatibility check

### 1) Structural compatibility
- Good news: both target Valkyrie (`glaiver`) and use compatible packet versions for core hooks.
- Risk: both register handlers for overlapping events and both can alter skill flow.

### 2) Config compatibility
- `s.index.js` expects `./config.json`.
- There is **no `config.json` in current repo root** (only `s.config.json` and `s.configNA.json`).
- If merged as-is, it would fail at runtime unless config loading is changed.

### 3) Behavior overlap
- Both files process `S_ACTION_STAGE` and `S_ACTION_END`.
- `s.index.js` uses fake end packets and timer cancellation logic.
- `index.js` already has advanced replacement logic in `C_START_SKILL` and boss/position logic.

This overlap is the biggest merge risk.

## Estimated chance of safe merge (without regressions)
- **Direct copy/paste merge:** **20%** chance of working cleanly.
- **Careful partial merge** (only selected delays/features behind a toggle): **70%** chance.
- **Full refactor merge** (shared state machine, single source of truth): **85%** chance, but more work.

## Recommended strategy (safest)
1. Add a feature flag, e.g. `enable_cancel_engine` (default `false`).
2. Import only the delay map concept from `s.index.js` (not the whole hook set).
3. Reuse existing hooks in `index.js` and integrate cancel timing inside those handlers.
4. Normalize config keys into one file (or load `s.config*.json` as presets).
5. Test skill-by-skill in game (especially Crescent, Twilight, Spinning Death, Titansbane).

## What to learn from this
- **Merging is not just file-combining**. It is about combining behavior safely.
- When two scripts hook the same events, always design a **single authority** for each event.
- Keep config and logic decoupled: config files should only store numbers/settings, and one code path should read them.

