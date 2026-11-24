# Vue 3 in 7 Weeks: BookNook

Course materials for a 7-week Vue 3 course (one 90-minute class a week), based on the book *Frontend Development Projects with Vue.js 3* (Packt). Over the 7 classes we live-code one app together: **BookNook**, a personal reading list. Each week the app picks up the concepts from that week's chapter.

The full curriculum, with every live-coding step and all the code, is in [BookNook_Vue_7-week_curriculum.md](BookNook_Vue_7-week_curriculum.md). The slides are in [Presentations](Presentations).

## The app

BookNook keeps track of the books you want to read, are reading and have read. By the end of the course it has:

- **My shelf:** add books, search and filter them, see live counts, and mark them all read at once.
- **Discover:** search the [Open Library](https://openlibrary.org) catalogue and add a book with one click.
- **Book pages:** details, status and your own notes for every book.
- A shelf saved in the browser (`localStorage`), so it is still there after a reload.

The books come from three places, one more each time the app grows:

1. **Week 1:** three books written into the code.
2. **Week 2:** 10 starter books in `public/books.json`, loaded with `fetch`.
3. **Week 5:** the free [Open Library Search API](https://openlibrary.org/dev/docs/api/search), which needs no key, plus covers from the [Covers API](https://openlibrary.org/dev/docs/api/covers).

## Weekly plan

| Week | Book chapters | Topics | What BookNook gains |
| --- | --- | --- | --- |
| 1 | Ch1 Starting Your First Vue Project | Vite project, `data()`, interpolation, directives, `v-model`, `v-for`, methods, scoped styles | One component: add a book, mark it read, remove it |
| 2 | Ch2 Working with Data | Computed properties, watchers, async methods | Search, status filter, stats, "mark all read", saving to `localStorage`, seed data from `books.json` |
| 3 | Ch3 Vite and Vue Devtools + Ch4 Nesting Components | `.env` files, Devtools, props, events, slots, template refs, component `v-model` | Split into `BookForm`, `BookList`, `BookCard`, `BaseCard`, `BookFilters` |
| 4 | Ch5 The Composition API | `<script setup>`, `ref`, `reactive`, `computed`, `watch`, composables | Same app on the Composition API, with `useBooks()` and `useSearch()` |
| 5 | Ch6 Global Component Composition | Plugins, provide/inject, global components, dynamic components | Open Library search through an API plugin, grid/list layout switcher |
| 6 | Ch7 Routing | Vue Router, dynamic and nested routes, lazy loading | Pages: My shelf, Discover, Book detail (Overview/Notes tabs), 404 |
| 7 | Ch9 The State of Vue + Ch10 State Management | Shared `reactive` state, Pinia stores, route guards | One Pinia `shelf` store for the whole app, final demo |

## Repository structure

```
week-1/ … week-7/      the finished app at the end of each class
Presentations/         slides for each chapter
BookNook_Vue_7-week_curriculum.md   full curriculum with every coding step
```

Each `week-N` folder is the starting point for week N+1, so a student who missed a class can catch up from the previous week's folder.

## Running a week

You need [Node.js](https://nodejs.org) 22.18 or newer (or 24.12+), [VS Code](https://code.visualstudio.com) with the **Vue (Official)** extension, and the Vue DevTools browser extension.

```sh
cd week-3
npm install
npm run dev
```

Then open http://localhost:5173. From week 3 on, copy `.env.example` to `.env` first: it sets the app title.

## Versions

Vue 3.5, Vite 8, Vue Router 5 (week 6) and Pinia 4 (week 7). The book was written for older releases, but every API used in the course still works the same way.
