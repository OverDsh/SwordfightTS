# ⚔️ SwordfightTS - OSS Roblox Game

**SwordfightTS** is a Roblox game made with TS where players fight to have the highest timer and be on top of the leaderboard.

## 🕹️ How It Works

- Every player starts with a **timer** counting how long they’ve been alive.
- Players are armed with **swords** and can attack each other.
- **Killing another player**:
  - You steal their timer and add it to your own.
  - Their timer resets to **0**.
- There’s a **Safe Zone** where players can’t fight — use it to regen, but don’t hide forever, your timer is paused!

## 📁 Project Structure

This project is written in **TypeScript** and built using [Roblox-TS](https://roblox-ts.com/).

It uses React, Reflex and Lapis, and the structure was heavily inspired by [littensy/slither](https://github.com/littensy/slither/tree/main). Huge thanks to him ❤️

## 🚀 Setup & Build

### Build
- Install [Roblox-TS](https://roblox-ts.com/):
```bash
npm install -g roblox-ts
```

- Compile the game:
```bash
rbxtsc
```

- Build the rbxl:
```bash
rojo build default.project.json -o game.rbxl
```

### Serve

- Compile in watch mode:
```bash
rbxtsc -w
```

- Sync using rojo:
```bash
rojo serve
```

## 📜 License
This project is open source under the [MIT License](https://choosealicense.com/licenses/mit/).
