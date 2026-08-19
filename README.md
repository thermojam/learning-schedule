# Anthropic Learning Roadmap

> Интерактивный визуальный план обучения: 6-недельный маршрут по бесплатным курсам Anthropic с трекером прогресса, понедельными календарями и экспортом в PDF.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Философия маршрута: **не «пройти курсы», а «каждая неделя заканчивается артефактом в реальном проекте»**. Теория заканчивается там, где начинается практика.

---

## Возможности

-  **Обзорная страница** — сводная таблица курсов, принципы маршрута, стек интеграций
-  **6 недель** — понедельные календари с разбивкой по дням и артефактам
-  **Трекер прогресса** — чекбоксы по дням и курсам
-  **Вехи (milestones)** — контрольные точки по датам
-  **Тёмная / светлая тема** — переключение по клавише `T`
-  **Печать в PDF** — все 7 страниц в формате A4 landscape
-  **Навигация с клавиатуры** — стрелки, `Home`/`End`

---

## О маршруте

Этот репозиторий — **не проход всего каталога Anthropic**, а собранный под конкретную задачу маршрут из 6 курсов. Философия простая: **не гонись за количеством, а собирай путь под свою проблему** — 1 курс под ежедневную работу + 1 полевой + 1 узкий под конкретную задачу, в которую ты уже уперся. Теория заканчивается там, где начинается практика.

### Для кого

| Параметр | Значение |
|----------|----------|
| **Уровень** | Middle+ / Senior |
| **Специализация** | Full-stack разработчик (TypeScript, React, Node.js, Python) |
| **Опыт с ИИ** | Уже работает с API, пишет Codex/Claude skills, интегрирует LLM в продукты |
| **Контекст** | Строит собственные продукты и ищет смыслы через их запуск |

---

### 📚 Что внутри

| # | Курс | Фокус | Ссылка |
|---|------|-------|--------|
| 1 | **Claude Code 101** | Основы Claude Code, workflow, `CLAUDE.md` | [skilljar](https://anthropic.skilljar.com/claude-code-101) |
| 2 | **Claude Code in Action** | Длинные сессии, steering, skills, субагенты | [skilljar](https://anthropic.skilljar.com/claude-code-in-action) |
| 3 | **Building with the Claude API** | Tool use, Vision, Batch, extended thinking, агенты | [skilljar](https://anthropic.skilljar.com/claude-with-the-anthropic-api) |
| 4 | **AI Fluency for Small Businesses** | Маркетинг, продажи, воронки, контент-стратегия | [skilljar](https://anthropic.skilljar.com/ai-fluency-for-small-businesses) |
| 5 | **Introduction to MCP** | Протокол подключения ИИ к внешним инструментам | [skilljar](https://anthropic.skilljar.com/introduction-to-model-context-protocol) |
| 6 | **MCP: Advanced Topics** | Production-паттерны MCP, sampling, notifications | [skilljar](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) |

> Все курсы бесплатные, без привязки карты и без подписки Claude Pro.

---

## Запуск

```bash
git clone https://github.com/thermojam/learning-schedule.git
cd <learning-schedule>
npm install
npm run dev
