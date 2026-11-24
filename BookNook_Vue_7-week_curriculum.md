# Vue 3 in 7 Weeks — BookNook Curriculum

Nov 21, 2026 · @Milica

## Course overview

Over 7 classes of 90 minutes, you and the students live-code one app, **BookNook**, a personal reading list. Each week it picks up the concepts from that week's chapter. By week 7 it is a routed, Pinia-backed single-page app that searches the Open Library catalogue.

Every chapter has a natural place in this app, so no concept gets bolted on just to show it:

- A list of books → `v-for`, `v-model`, methods (Ch1)
- Search, filters and stats → computed properties; saving the shelf → watchers; loading seed data → async methods (Ch2)
- Splitting the cards, form and filters into components → props, events, slots and refs (Ch3–4)
- Reusing book and search logic → composables (Ch5)
- An API client shared across the app → plugins, provide/inject, global and dynamic components (Ch6)
- Separate Shelf, Discover and Book-detail pages → Vue Router (Ch7)
- The same shelf on every page → state patterns, then Pinia (Ch9–10)

The book's own exercises still matter. Use one as the 15–20 minute concept demo at the start of each class, and assign the chapter's activity as optional practice.

### How each 90-minute class runs

| Time | Block | What happens |
| --- | --- | --- |
| 0–10 min | Recap and catch-up | Anyone behind checks out the `week-N-start` tag. |
| 10–30 min | Concept demo | One small, isolated example, usually a book exercise, so the idea is seen before it goes into the app. |
| 30–85 min | Live-code BookNook | You drive, the students code along. |
| 85–90 min | Wrap-up | Commit, tag `week-N-end`, set homework. |

Each week below lists a **cut line**. If you run behind, everything after it moves to homework and the start tag for the next class already includes it.

### Prerequisites for students

- HTML, CSS, and modern JavaScript: ES modules, arrow functions, `map`/`filter`/`find`, destructuring, `async`/`await` and `fetch`
- Basic terminal and npm use, and Git (clone, checkout, commit)
- Node.js 22.18+ or 24.12+, which current `create-vue` requires

## Project roadmap

The app works at the end of every class. Each week adds one layer, and weeks 4 and 7 are refactors that leave the app looking the same while the code changes underneath.

| Week | Book chapters | What BookNook gains | Book exercises to borrow |
| --- | --- | --- | --- |
| 1 | Ch1 Starting Your First Vue Project | One-component reading list: add a book, mark it read, remove it | 1.01–1.12, Activity 1.01 |
| 2 | Ch2 Working with Data | Search, status filter, stats, "mark all read", saving to localStorage, async seed data | 2.01–2.06, Activity 2.01 |
| 3 | Ch3 Vite and Vue Devtools + Ch4 Nesting Components | `.env` app title, Devtools debugging, split into `BookForm`, `BookList`, `BookCard`, `BaseCard`, `BookFilters` | 3.01–3.02, 4.01–4.05, Activity 4.01 |
| 4 | Ch5 The Composition API | Every component moved to `<script setup>`, with `useBooks()` and `useSearch()` composables | 5.01–5.07, Activity 5.01 |
| 5 | Ch6 Global Component Composition | Open Library search through an API plugin, global base components, a provided `shelf`, grid/list layout switcher | 6.01–6.03, Activity 6.01 |
| 6 | Ch7 Routing | Shelf, Discover, Book detail (nested Overview/Notes tabs), 404 page, lazy routes | 7.01–7.05, Activity 7.01 |
| 7 | Ch9 The State of Vue + Ch10 State Management | A global `reactive` store as a stepping stone, then a Pinia `shelf` store, a `beforeEnter` guard using the store, final demo | 9.01–9.03, 10.01–10.03, Activity 10.01 |

## Setup and versions

The book's code was written for the 2022–23 releases, and npm now serves newer ones. The APIs this course uses are unchanged in current versions. I installed the latest Vue Router and Pinia and confirmed that `createRouter`, `createWebHistory`, `RouterLink`, `useRoute`, `createPinia`, `defineStore` and `storeToRefs` are all still exported.

| Package | In the book's repo | Latest on npm (Nov 2026) |
| --- | --- | --- |
| vue | 3.2.x | 3.5.46 |
| vite | 2.7 – 4.0 | 8.3.8 |
| vue-router | 4.0 – 4.1 | 5.5.1 |
| pinia | 2.0.x | 4.1.0 |
| create-vue | n/a | 3.24.0 (needs Node ^22.18 or ≥24.12) |

What students will see that differs from the book:

- `npm create vue@latest` asks more questions than the book's screenshots show. Answer **No** to everything in week 1. Router and Pinia are installed by hand in weeks 6 and 7 so students see what each one adds.
- The scaffold offers Vue DevTools as a Vite plugin (an in-page panel). The browser extension the book describes still works, so pick one and use it all course.
- `defineModel()` (Vue 3.4+) is newer than the book. It is introduced in week 4 as a shortcut for component `v-model`.
- Vue Router 5 also supports optional file-based routing. This course keeps the book's classic `routes` array.

### Before week 1

1. Build the whole app yourself once, ideally a week ahead, and commit `package-lock.json` so every student installs the same versions.
2. Keep one instructor repo and tag it at the end of each class: `week-1-end`, which is also `week-2-start`, and so on. A student who missed a class runs `git checkout week-3-start` and is caught up.
3. Students install VS Code with the **Vue (Official)** extension, plus Chrome or Firefox with Vue DevTools.
4. Prepare `public/books.json` with 10–12 seed books (the full file is in week 2, step 5). It is first used in week 2.
5. Week 5 uses the free [Open Library Search API](https://openlibrary.org/dev/docs/api/search). It needs no key: `https://openlibrary.org/search.json?q=dune&limit=10`. Covers come from `https://covers.openlibrary.org/b/id/<cover_i>-M.jpg` ([Covers API](https://openlibrary.org/dev/docs/api/covers)). Keep `limit` small, because a classroom shares one IP address.

## Week 1 — Your first Vue project (Ch1)

**Outcome:** a one-component reading list where you can add a book, mark it read, and remove it.

**Concepts:** what a single-file component (SFC) is, the Options API `data()` and `methods`, `{{ }}` interpolation, `v-bind` / `:class`, `v-if` vs `v-show`, `v-for` with `:key`, `v-model`, `@click` / `@submit.prevent` / `@keyup.enter`, and scoped styles.

**Book material:** Ex 1.01 (first component), 1.02–1.03 (interpolation and directives), 1.04 (`v-model`), 1.05–1.07 (`v-for` over arrays and objects), 1.08–1.10 (methods), 1.11–1.12 (SCSS and CSS modules). Activity 1.01, a dynamic shopping list, is the closest match to this week's app.

### Live-code steps

#### Step 1 — Scaffold the project (\~10 min)

Run the scaffolder and answer the prompts exactly like this:

```bash
npm create vue@latest
```

- Project name: `booknook`
- Use TypeScript? **No**
- Select features: select nothing, press Enter
- Select experimental features: select nothing, press Enter
- Skip all example code and start with a blank Vue project? **Yes**

```bash
cd booknook
npm install
npm run dev
```

Open http://localhost:5173. Then walk through what the scaffold created: `index.html` (the page Vite serves), `src/main.js` (creates and mounts the app), and `src/App.vue` (the root component). In `index.html`, change the title line to `<title>BookNook</title>`.

#### Step 2 — Add global styles (\~3 min)

Create a small global stylesheet that every week reuses, and import it in `main.js`. Explain the difference between this global file and the `<style scoped>` block you will write in step 8.

`src/assets/main.css`

```css
:root {
  --ink: #1f2933;
  --muted: #6b7280;
  --line: #e5e7eb;
  --accent: #2f6f5e;
  --bg: #faf8f4;
  font-family: system-ui, sans-serif;
  color: var(--ink);
  background: var(--bg);
}

body {
  margin: 0;
}

#app {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

button,
input,
select,
textarea {
  font: inherit;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  background: white;
}

button {
  cursor: pointer;
}

button:hover:not(:disabled) {
  border-color: var(--accent);
}

.muted {
  color: var(--muted);
}

.error {
  color: #b42318;
}
```

`src/main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

createApp(App).mount('#app')
```

#### Step 3 — Data and interpolation (\~7 min)

Replace everything in `src/App.vue` with a `data()` function and a header. Show that changing `appName` in the code updates the page instantly (hot module replacement).

```vue
<script>
export default {
  data() {
    return {
      appName: 'BookNook',
      newTitle: '',
      newAuthor: '',
      books: [
        { id: 'OL893414W', title: 'Dune', author: 'Frank Herbert', status: 'read' },
        { id: 'OL27482W', title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'reading' },
        { id: 'OL1168083W', title: 'Nineteen Eighty-Four', author: 'George Orwell', status: 'want' },
      ],
    }
  },
}
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">You have {{ books.length }} books on your shelf.</p>
  </header>
</template>
```

#### Step 4 — Render the list with `v-for` (\~8 min)

Add the list under the header. Explain why every item needs a unique `:key`.

```vue
  <ul class="book-list">
    <li v-for="book in books" :key="book.id">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
      </div>
    </li>
  </ul>
```

#### Step 5 — Empty state with `v-if` / `v-else` (\~3 min)

Put this paragraph directly above the `<ul>`, and add `v-else` to the `<ul>` so exactly one of them renders. Test it by temporarily emptying the `books` array.

```vue
  <p v-if="books.length === 0" class="muted">Your shelf is empty. Add your first book above.</p>
  <ul v-else class="book-list">
```

#### Step 6 — Add form with `v-model` and a method (\~10 min)

Add the form between the header and the list. `v-model` keeps each input and its data property in sync, and `@submit.prevent` stops the browser from reloading the page. The `v-show` hint is a good moment to compare `v-show` (hides with CSS) with `v-if` (removes the element).

```vue
  <form class="add-form" @submit.prevent="addBook">
    <input v-model="newTitle" placeholder="Title" />
    <input v-model="newAuthor" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="newTitle" class="muted">Press Enter to add “{{ newTitle }}”</p>
```

Add a `methods` option after `data()`:

```js
  methods: {
    addBook() {
      const title = this.newTitle.trim()
      if (!title) return

      this.books.push({
        id: crypto.randomUUID(),
        title,
        author: this.newAuthor.trim() || 'Unknown author',
        status: 'want',
      })
      this.newTitle = ''
      this.newAuthor = ''
    },
  },
```

#### Step 7 — Mark read, remove, and `:class` (\~7 min)

Add two more methods inside `methods`:

```js
    toggleRead(book) {
      book.status = book.status === 'read' ? 'want' : 'read'
    },
    removeBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
```

Then give each `<li>` a conditional class and two buttons, so the full `<li>` reads:

```vue
    <li v-for="book in books" :key="book.id" :class="{ read: book.status === 'read' }">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
      </div>
      <div class="actions">
        <button @click="toggleRead(book)">
          {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
        </button>
        <button @click="removeBook(book.id)">Remove</button>
      </div>
    </li>
```

#### Step 8 — Scoped styles (\~5 min)

Add a `<style scoped>` block at the end of `App.vue`. Open the browser inspector to show the `data-v-…` attribute Vue adds so these rules can't leak into other components.

```vue
<style scoped>
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.add-form input {
  flex: 1;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--line);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.read strong {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Complete `src/App.vue` at the end of week 1

```vue
<script>
export default {
  data() {
    return {
      appName: 'BookNook',
      newTitle: '',
      newAuthor: '',
      books: [
        { id: 'OL893414W', title: 'Dune', author: 'Frank Herbert', status: 'read' },
        { id: 'OL27482W', title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'reading' },
        { id: 'OL1168083W', title: 'Nineteen Eighty-Four', author: 'George Orwell', status: 'want' },
      ],
    }
  },
  methods: {
    addBook() {
      const title = this.newTitle.trim()
      if (!title) return

      this.books.push({
        id: crypto.randomUUID(),
        title,
        author: this.newAuthor.trim() || 'Unknown author',
        status: 'want',
      })
      this.newTitle = ''
      this.newAuthor = ''
    },
    toggleRead(book) {
      book.status = book.status === 'read' ? 'want' : 'read'
    },
    removeBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
  },
}
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">You have {{ books.length }} books on your shelf.</p>
  </header>

  <form class="add-form" @submit.prevent="addBook">
    <input v-model="newTitle" placeholder="Title" />
    <input v-model="newAuthor" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="newTitle" class="muted">Press Enter to add “{{ newTitle }}”</p>

  <p v-if="books.length === 0" class="muted">Your shelf is empty. Add your first book above.</p>
  <ul v-else class="book-list">
    <li v-for="book in books" :key="book.id" :class="{ read: book.status === 'read' }">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
      </div>
      <div class="actions">
        <button @click="toggleRead(book)">
          {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
        </button>
        <button @click="removeBook(book.id)">Remove</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.add-form input {
  flex: 1;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--line);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.read strong {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

**Cut line:** after step 6. Steps 7–8 can be homework.

**Homework:** show a 1–5 star rating on each book with `v-for="n in 5"` (the same pattern as Ex 1.08) and make the stars clickable. Read Ch2 up to watchers.

**Watch out for:** a missing `:key`; putting `v-if` and `v-for` on the same element (in Vue 3, `v-if` runs first); writing `@click="removeBook"` when the method needs an argument (`@click="removeBook(book.id)"`).

## Week 2 — Working with data (Ch2)

**Outcome:** the list can be searched and filtered, shows live stats, survives a page refresh, and loads its first books asynchronously.

**Concepts:** computed properties vs methods (caching), computed setters, `watch` with `deep` and `immediate`, and async methods with loading and error states.

**Book material:** Ex 2.01 (computed), 2.02 (computed setter), 2.03 (watcher, "Shop Watcher"), 2.04 (deep watcher), 2.05 (async fetch), 2.06 (methods vs watchers vs computed). Activity 2.01 (fetching a blog from a headless CMS) is optional practice.

### Live-code steps

#### Step 1 — A computed `stats` object (\~8 min)

Add a `computed` option after `data()`, then replace the header's subtitle. Change a book's status and show the numbers update; then explain that a computed value is cached until `books` changes, while a method runs on every render.

```js
  computed: {
    stats() {
      const count = (status) => this.books.filter((book) => book.status === status).length
      return {
        total: this.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
  },
```

```vue
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
```

#### Step 2 — Search and status filter (\~15 min)

Add `search: ''` and `statusFilter: 'all'` to `data()`. Add a second computed, `visibleBooks`, inside `computed`:

```js
    visibleBooks() {
      const query = this.search.trim().toLowerCase()
      return this.books
        .filter((book) => this.statusFilter === 'all' || book.status === this.statusFilter)
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    },
```

Add the filter bar under the add form (the checkbox comes in step 3), and change the list's `v-for` to loop over `visibleBooks`:

```vue
  <div class="filters">
    <input v-model="search" type="search" placeholder="Search title or author" />
    <select v-model="statusFilter">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
  </div>
```

```vue
    <li v-for="book in visibleBooks" :key="book.id" :class="{ read: book.status === 'read' }">
```

#### Step 3 — A computed setter for "Mark all as read" (\~8 min)

A computed with `get` and `set` can be used with `v-model`. Add it inside `computed`:

```js
    allRead: {
      get() {
        return this.books.length > 0 && this.books.every((book) => book.status === 'read')
      },
      set(value) {
        this.books.forEach((book) => {
          book.status = value ? 'read' : 'want'
        })
      },
    },
```

Add the checkbox as the last item inside `<div class="filters">`:

```vue
    <label><input v-model="allRead" type="checkbox" /> Mark all as read</label>
```

#### Step 4 — Save the shelf with a deep watcher (\~8 min)

Add a `watch` option after `computed`. Without `deep: true` the watcher only fires when the whole array is replaced, so changing one book's status would not be saved. Show the saved data in the browser's DevTools → Application → Local storage.

```js
  watch: {
    books: {
      handler(books) {
        localStorage.setItem('booknook', JSON.stringify(books))
      },
      deep: true,
    },
  },
```

#### Step 5 — Load seed data asynchronously (\~12 min)

Create `public/books.json`. Files in `public/` are served from the site root, so the app can `fetch('/books.json')`.

`public/books.json`

```json
[
  { "id": "OL893414W", "title": "Dune", "author": "Frank Herbert", "year": 1965, "coverId": 11481354, "status": "read" },
  { "id": "OL27482W", "title": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937, "coverId": 14627509, "status": "reading" },
  { "id": "OL1168083W", "title": "Nineteen Eighty-Four", "author": "George Orwell", "year": 1949, "coverId": 9267242, "status": "want" },
  { "id": "OL66554W", "title": "Pride and Prejudice", "author": "Jane Austen", "year": 1813, "coverId": 14348537, "status": "read" },
  { "id": "OL450063W", "title": "Frankenstein", "author": "Mary Shelley", "year": 1818, "coverId": 12356249, "status": "want" },
  { "id": "OL468431W", "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925, "coverId": 10590366, "status": "want" },
  { "id": "OL3140822W", "title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960, "coverId": 14351077, "status": "reading" },
  { "id": "OL103123W", "title": "Fahrenheit 451", "author": "Ray Bradbury", "year": 1953, "coverId": 12993656, "status": "want" },
  { "id": "OL1095427W", "title": "Jane Eyre", "author": "Charlotte Brontë", "year": 1847, "coverId": 8235363, "status": "want" },
  { "id": "OL64365W", "title": "Brave New World", "author": "Aldous Huxley", "year": 1932, "coverId": null, "status": "want" }
]
```

In `data()`, replace the hard-coded array with `books: [],` and add `isLoading: false,` and `error: null,`. Add a `created()` hook after `watch`, and an async method as the first entry in `methods`:

```js
  created() {
    this.loadBooks()
  },
```

```js
    async loadBooks() {
      const saved = localStorage.getItem('booknook')
      if (saved) {
        this.books = JSON.parse(saved)
        return
      }

      this.isLoading = true
      try {
        const response = await fetch('/books.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        this.books = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
```

Clear local storage once (DevTools → Application → Local storage → delete `booknook`) to watch the seed load.

#### Step 6 — Loading, error and empty states (\~6 min)

Replace the old `<p v-if>` / `<ul v-else>` pair with this chain, so exactly one message or the list renders. Also show each book's year after the author:

```vue
  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <p v-else-if="books.length === 0" class="muted">
    Your shelf is empty. Add your first book above.
  </p>
  <p v-else-if="visibleBooks.length === 0" class="muted">No books match your search.</p>
  <ul v-else class="book-list">
```

```vue
        <span v-if="book.year" class="muted"> ({{ book.year }})</span>
```

Finally, update the scoped styles so the filter bar lays out like the form (see the complete file below).

#### Complete `src/App.vue` at the end of week 2

```vue
<script>
export default {
  data() {
    return {
      appName: 'BookNook',
      newTitle: '',
      newAuthor: '',
      books: [],
      search: '',
      statusFilter: 'all',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    stats() {
      const count = (status) => this.books.filter((book) => book.status === status).length
      return {
        total: this.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
    visibleBooks() {
      const query = this.search.trim().toLowerCase()
      return this.books
        .filter((book) => this.statusFilter === 'all' || book.status === this.statusFilter)
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    },
    allRead: {
      get() {
        return this.books.length > 0 && this.books.every((book) => book.status === 'read')
      },
      set(value) {
        this.books.forEach((book) => {
          book.status = value ? 'read' : 'want'
        })
      },
    },
  },
  watch: {
    books: {
      handler(books) {
        localStorage.setItem('booknook', JSON.stringify(books))
      },
      deep: true,
    },
  },
  created() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      const saved = localStorage.getItem('booknook')
      if (saved) {
        this.books = JSON.parse(saved)
        return
      }

      this.isLoading = true
      try {
        const response = await fetch('/books.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        this.books = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    addBook() {
      const title = this.newTitle.trim()
      if (!title) return

      this.books.push({
        id: crypto.randomUUID(),
        title,
        author: this.newAuthor.trim() || 'Unknown author',
        status: 'want',
      })
      this.newTitle = ''
      this.newAuthor = ''
    },
    toggleRead(book) {
      book.status = book.status === 'read' ? 'want' : 'read'
    },
    removeBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
  },
}
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
  </header>

  <form class="add-form" @submit.prevent="addBook">
    <input v-model="newTitle" placeholder="Title" />
    <input v-model="newAuthor" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="newTitle" class="muted">Press Enter to add “{{ newTitle }}”</p>

  <div class="filters">
    <input v-model="search" type="search" placeholder="Search title or author" />
    <select v-model="statusFilter">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label><input v-model="allRead" type="checkbox" /> Mark all as read</label>
  </div>

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <p v-else-if="books.length === 0" class="muted">
    Your shelf is empty. Add your first book above.
  </p>
  <p v-else-if="visibleBooks.length === 0" class="muted">No books match your search.</p>
  <ul v-else class="book-list">
    <li v-for="book in visibleBooks" :key="book.id" :class="{ read: book.status === 'read' }">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
        <span v-if="book.year" class="muted"> ({{ book.year }})</span>
      </div>
      <div class="actions">
        <button @click="toggleRead(book)">
          {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
        </button>
        <button @click="removeBook(book.id)">Remove</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.add-form,
.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.add-form input,
.filters input[type='search'] {
  flex: 1;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--line);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.read strong {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

**Cut line:** after step 4. Async loading (steps 5–6) can be homework; keep the hard-coded books until then.

**Homework:** a progress bar for "You've read 40% of your list", using a computed percentage and `:style="{ width: percent + '%' }"`.

**Watch out for:** side effects inside a computed (it should only return a value); a watcher without `deep: true`, which won't fire when a book's `status` changes; forgetting that files in `public/` are served from `/`.

## Week 3 — Vite, Vue Devtools and nesting components (Ch3 + Ch4)

**Outcome:** the 200-line `App.vue` is split into five components. App stays the single source of truth: props go down, events come up.

**Concepts:** the Vite dev server and HMR, `vite.config.js` and the `@` alias, `public/` vs `src/assets`, `.env` and `import.meta.env`, `build` / `preview`. Then Vue Devtools (component tree, editing state, the events timeline). Then props with types and validators, `emits`, component `v-model`, named slots and template refs.

**Book material:** Ex 3.01 (create a Vite project), 3.02 (Devtools). Ex 4.01–4.02 (props, types, validation), 4.03 (props + computed), 4.04 (slots and named slots), 4.05 (template refs). Activity 4.01 (`MessageEditor` emits to `MessageFeed`) is the same split we do here.

This is the densest week. Have empty component files ready so no time goes on creating them.

```
App.vue                 (owns books, search, filters)
├─ BookForm.vue         emits add
├─ BookFilters.vue      v-model:search, v-model:status
└─ BookList.vue         prop books · re-emits update-status, remove
   └─ BookCard.vue      prop book · emits update-status, remove
      └─ BaseCard.vue   slots: header, default, actions
```

### Live-code steps

#### Step 1 — Environment variables, build and preview (\~5 min)

Create `.env` in the project root (next to `package.json`). Only variables that start with `VITE_` reach the browser code.

`.env`

```bash
VITE_APP_TITLE=BookNook
```

In `App.vue`'s `data()`, change the first line to read the title from it:

```js
      appName: import.meta.env.VITE_APP_TITLE,
```

Restart `npm run dev` (Vite reads `.env` at startup). Then show what ships to production:

```bash
npm run build
npm run preview
```

Point out the hashed files in `dist/assets` and that `public/books.json` was copied as-is. Then do the Devtools tour from the concept demo on the running app.

#### Step 2 — `BaseCard`: a layout component with named slots (\~8 min)

Create `src/components/BaseCard.vue`. It has no script: it only arranges whatever the parent passes into its `header`, default and `actions` slots. `$slots.header` lets it skip an empty header.

`src/components/BaseCard.vue`

```vue
<template>
  <article class="base-card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.actions" class="card-actions">
      <slot name="actions" />
    </footer>
  </article>
</template>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
}

.card-body {
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
```

#### Step 3 — `BookCard`: props, validation and emits (\~10 min)

Create `src/components/BookCard.vue`. The card never changes the book itself; it emits an event and lets `App` decide. The status `<select>` replaces week 1's toggle button.

`src/components/BookCard.vue`

```vue
<script>
import BaseCard from './BaseCard.vue'

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }

export default {
  components: { BaseCard },
  props: {
    book: {
      type: Object,
      required: true,
      validator: (book) => book.status in STATUSES,
    },
  },
  emits: ['update-status', 'remove'],
  data() {
    return { statuses: STATUSES }
  },
}
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <strong class="title">{{ book.title }}</strong>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="$emit('update-status', book.id, $event.target.value)">
        <option v-for="(label, value) in statuses" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <button @click="$emit('remove', book.id)">Remove</button>
    </template>
  </BaseCard>
</template>

<style scoped>
p {
  margin: 0;
}

select {
  flex: 1;
  min-width: 0;
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Step 4 — `BookList`: loop, re-emit and a fallback slot (\~8 min)

Create `src/components/BookList.vue`. It re-emits the card's events upward. Point out that this is "prop drilling"; weeks 5 and 7 remove it. The `empty` slot has fallback text that the parent can override.

`src/components/BookList.vue`

```vue
<script>
import BookCard from './BookCard.vue'

export default {
  components: { BookCard },
  props: {
    books: { type: Array, required: true },
  },
  emits: ['update-status', 'remove'],
}
</script>

<template>
  <div v-if="books.length" class="book-list">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @update-status="(id, status) => $emit('update-status', id, status)"
      @remove="(id) => $emit('remove', id)"
    />
  </div>
  <p v-else class="muted">
    <slot name="empty">No books here yet.</slot>
  </p>
</template>

<style scoped>
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
```

#### Step 5 — `BookForm`: local state, an `add` event and a template ref (\~8 min)

Create `src/components/BookForm.vue`. The form owns its own inputs and only tells the parent about a finished book. `ref="titleInput"` gives the component a handle on the DOM element, so it can put the cursor back in the title field.

`src/components/BookForm.vue`

```vue
<script>
export default {
  emits: ['add'],
  data() {
    return { title: '', author: '' }
  },
  methods: {
    submit() {
      const title = this.title.trim()
      if (!title) return

      this.$emit('add', { title, author: this.author.trim() || 'Unknown author' })
      this.title = ''
      this.author = ''
      this.$refs.titleInput.focus()
    },
  },
}
</script>

<template>
  <form class="book-form" @submit.prevent="submit">
    <input ref="titleInput" v-model="title" placeholder="Title" />
    <input v-model="author" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="title" class="muted">Press Enter to add “{{ title }}”</p>
</template>

<style scoped>
.book-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.book-form input {
  flex: 1;
}
</style>
```

#### Step 6 — `BookFilters`: three component v-models (\~8 min)

Create `src/components/BookFilters.vue`. `v-model:search="x"` on a component is shorthand for passing a `search` prop and listening for `update:search`.

`src/components/BookFilters.vue`

```vue
<script>
export default {
  props: {
    search: { type: String, default: '' },
    status: { type: String, default: 'all' },
    allRead: { type: Boolean, default: false },
  },
  emits: ['update:search', 'update:status', 'update:allRead'],
}
</script>

<template>
  <div class="filters">
    <input
      type="search"
      placeholder="Search title or author"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
    />
    <select :value="status" @change="$emit('update:status', $event.target.value)">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label>
      <input
        type="checkbox"
        :checked="allRead"
        @change="$emit('update:allRead', $event.target.checked)"
      />
      Mark all as read
    </label>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filters input[type='search'] {
  flex: 1;
}
</style>
```

#### Step 7 — Rewire `App.vue` (\~8 min)

Replace `App.vue` completely. The state, computed properties, watcher and loading stay here; the template is now just the four components. `toggleRead` becomes `setStatus`, and `addBook` receives the book from the form's event. The scoped styles moved into the components, so `App.vue` has none.

`src/App.vue`

```vue
<script>
import BookForm from './components/BookForm.vue'
import BookFilters from './components/BookFilters.vue'
import BookList from './components/BookList.vue'

export default {
  components: { BookForm, BookFilters, BookList },
  data() {
    return {
      appName: import.meta.env.VITE_APP_TITLE,
      books: [],
      search: '',
      statusFilter: 'all',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    stats() {
      const count = (status) => this.books.filter((book) => book.status === status).length
      return {
        total: this.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
    visibleBooks() {
      const query = this.search.trim().toLowerCase()
      return this.books
        .filter((book) => this.statusFilter === 'all' || book.status === this.statusFilter)
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    },
    allRead: {
      get() {
        return this.books.length > 0 && this.books.every((book) => book.status === 'read')
      },
      set(value) {
        this.books.forEach((book) => {
          book.status = value ? 'read' : 'want'
        })
      },
    },
  },
  watch: {
    books: {
      handler(books) {
        localStorage.setItem('booknook', JSON.stringify(books))
      },
      deep: true,
    },
  },
  created() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      const saved = localStorage.getItem('booknook')
      if (saved) {
        this.books = JSON.parse(saved)
        return
      }

      this.isLoading = true
      try {
        const response = await fetch('/books.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        this.books = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    addBook(book) {
      this.books.push({ id: crypto.randomUUID(), status: 'want', ...book })
    },
    setStatus(id, status) {
      const book = this.books.find((book) => book.id === id)
      if (book) book.status = status
    },
    removeBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
  },
}
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
  </header>

  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="visibleBooks" @update-status="setStatus" @remove="removeBook">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
```

**Cut line:** after step 5. If `BookFilters` becomes homework, keep week 2's filter markup inside `App.vue` until then.

**Homework:** open the Devtools events timeline and watch `add`, `update-status` and `remove` fire as you use the app. Read Ch5 up to composables.

**Watch out for:** mutating a prop (`book.status = 'read'` inside `BookCard`; Devtools and the console will warn); kebab-case vs camelCase event names; leaving out `emits`.

## Week 4 — The Composition API (Ch5)

**Outcome:** the app looks exactly the same, but every component uses `<script setup>` and the book logic lives in two composables. `App.vue`'s script shrinks to about 15 lines.

**Concepts:** `setup()` vs `<script setup>`, `ref` vs `reactive` and `.value`, `computed`, `watch` / `watchEffect`, `onMounted`, `defineProps` / `defineEmits`, and composables as plain functions that return reactive state. Also `defineModel()` (Vue 3.4+, not in the book).

**Book material:** Ex 5.01–5.02 (`setup()` and props), 5.03 (`ref` vs `reactive`), 5.04 (computed), 5.05 (watch), 5.06 (lifecycle hooks), 5.07 (composables: `useMovies`, `useSearch`). Activity 5.01 (a blog with `useBlogs` / `useSearch` / `useListActions`) has nearly the same structure as BookNook's composables.

### Live-code steps

Options API and `<script setup>` components can be mixed freely, so the app keeps working after every step.

#### Step 1 — `BookCard` with `<script setup>` (\~10 min)

Rewrite the script of `src/components/BookCard.vue`. Top-level variables are available to the template, `defineProps` and `defineEmits` need no import, and `emit(...)` replaces `$emit(...)`. Note the validator: `defineProps` is hoisted out of `setup`, so it can't use the local `STATUSES` constant (the build fails if you try).

`src/components/BookCard.vue`

```vue
<script setup>
import BaseCard from './BaseCard.vue'

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }

defineProps({
  book: {
    type: Object,
    required: true,
    // defineProps is hoisted out of setup, so the validator can't use STATUSES
    validator: (book) => ['want', 'reading', 'read'].includes(book.status),
  },
})

const emit = defineEmits(['update-status', 'remove'])
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <strong class="title">{{ book.title }}</strong>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="emit('update-status', book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <button @click="emit('remove', book.id)">Remove</button>
    </template>
  </BaseCard>
</template>

<style scoped>
p {
  margin: 0;
}

select {
  flex: 1;
  min-width: 0;
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Step 2 — `BookList` (\~5 min)

`src/components/BookList.vue`

```vue
<script setup>
import BookCard from './BookCard.vue'

defineProps({
  books: { type: Array, required: true },
})

const emit = defineEmits(['update-status', 'remove'])
</script>

<template>
  <div v-if="books.length" class="book-list">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @update-status="(id, status) => emit('update-status', id, status)"
      @remove="(id) => emit('remove', id)"
    />
  </div>
  <p v-else class="muted">
    <slot name="empty">No books here yet.</slot>
  </p>
</template>

<style scoped>
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
```

#### Step 3 — `BookForm`: `ref()` for inputs and the template ref (\~7 min)

`ref()` holds both the input values and the DOM element. In script you read and write `.value`; the template unwraps refs for you.

`src/components/BookForm.vue`

```vue
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const title = ref('')
const author = ref('')
const titleInput = ref(null)

function submit() {
  const cleanTitle = title.value.trim()
  if (!cleanTitle) return

  emit('add', { title: cleanTitle, author: author.value.trim() || 'Unknown author' })
  title.value = ''
  author.value = ''
  titleInput.value.focus()
}
</script>

<template>
  <form class="book-form" @submit.prevent="submit">
    <input ref="titleInput" v-model="title" placeholder="Title" />
    <input v-model="author" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="title" class="muted">Press Enter to add “{{ title }}”</p>
</template>

<style scoped>
.book-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.book-form input {
  flex: 1;
}
</style>
```

#### Step 4 — `BookFilters` with `defineModel()` (\~5 min)

`defineModel()` (Vue 3.4+) declares the prop and the `update:` event in one line, and returns a ref you can bind with `v-model` directly. Compare it with last week's version.

`src/components/BookFilters.vue`

```vue
<script setup>
const search = defineModel('search', { type: String, default: '' })
const status = defineModel('status', { type: String, default: 'all' })
const allRead = defineModel('allRead', { type: Boolean, default: false })
</script>

<template>
  <div class="filters">
    <input v-model="search" type="search" placeholder="Search title or author" />
    <select v-model="status">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label><input v-model="allRead" type="checkbox" /> Mark all as read</label>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filters input[type='search'] {
  flex: 1;
}
</style>
```

#### Step 5 — The `useBooks()` composable (\~15 min)

Create `src/composables/useBooks.js` and move everything about the shelf into it: state, computed values, actions, persistence and loading. `onMounted` inside a composable runs when the component that calls it mounts.

`src/composables/useBooks.js`

```js
import { ref, computed, watch, onMounted } from 'vue'

export function useBooks() {
  const books = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const stats = computed(() => {
    const count = (status) => books.value.filter((book) => book.status === status).length
    return {
      total: books.value.length,
      want: count('want'),
      reading: count('reading'),
      read: count('read'),
    }
  })

  const allRead = computed({
    get: () => books.value.length > 0 && books.value.every((book) => book.status === 'read'),
    set: (value) => {
      books.value.forEach((book) => {
        book.status = value ? 'read' : 'want'
      })
    },
  })

  function addBook(book) {
    books.value.push({ id: crypto.randomUUID(), status: 'want', ...book })
  }

  function setStatus(id, status) {
    const book = books.value.find((book) => book.id === id)
    if (book) book.status = status
  }

  function removeBook(id) {
    books.value = books.value.filter((book) => book.id !== id)
  }

  async function load() {
    const saved = localStorage.getItem('booknook')
    if (saved) {
      books.value = JSON.parse(saved)
      return
    }

    isLoading.value = true
    try {
      const response = await fetch('/books.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      books.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  watch(books, (value) => localStorage.setItem('booknook', JSON.stringify(value)), { deep: true })
  onMounted(load)

  return { books, isLoading, error, stats, allRead, addBook, setStatus, removeBook }
}
```

#### Step 6 — The `useSearch()` composable (\~5 min)

Create `src/composables/useSearch.js`. It takes the books ref as an argument, so it can filter any list.

`src/composables/useSearch.js`

```js
import { ref, computed } from 'vue'

export function useSearch(books) {
  const search = ref('')
  const statusFilter = ref('all')

  const results = computed(() => {
    const query = search.value.trim().toLowerCase()
    return books.value
      .filter((book) => statusFilter.value === 'all' || book.status === statusFilter.value)
      .filter(
        (book) =>
          book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
      )
      .sort((a, b) => a.title.localeCompare(b.title))
  })

  return { search, statusFilter, results }
}
```

#### Step 7 — `App.vue` with `<script setup>` (\~8 min)

Replace the script block. The template only changes `visibleBooks` to `results`.

`src/App.vue`

```vue
<script setup>
import BookForm from './components/BookForm.vue'
import BookFilters from './components/BookFilters.vue'
import BookList from './components/BookList.vue'
import { useBooks } from './composables/useBooks'
import { useSearch } from './composables/useSearch'

const appName = import.meta.env.VITE_APP_TITLE
const { books, isLoading, error, stats, allRead, addBook, setStatus, removeBook } = useBooks()
const { search, statusFilter, results } = useSearch(books)
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
  </header>

  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results" @update-status="setStatus" @remove="removeBook">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
```

**Cut line:** if you run short, move steps 2–4 to homework, not steps 5–7. The remaining Options API components keep working next to the new ones, but week 5 builds on the composables.

**Homework:** write `useLocalStorage(key, defaultValue)` and use it inside `useBooks` in place of the two `localStorage` calls.

**Watch out for:** a missing `.value` in script (the template unwraps refs, script doesn't); destructuring a `reactive()` object, which loses reactivity (use `toRefs`). Keep state **inside** the composable function for now. Ask the class what would happen if `books` sat outside it; that question opens week 7.

## Week 5 — Global component composition (Ch6)

**Outcome:** a Discover panel searches Open Library through a custom API plugin. Shelf actions are provided app-wide instead of drilled through props, base components are registered globally, and a toggle switches cards between grid and list layouts.

**Concepts:** mixins (and why composables replaced them), plugins (`install(app, options)`, `app.provide`, `app.config.globalProperties`), global registration with `app.component`, `provide` / `inject`, and dynamic components with `<component :is>`.

**Book material:** Ex 6.01 (a debug mixin), 6.02 (an axios plugin using `provide`), 6.03 (dynamic components that swap between `Compressed`, `List` and `Rich` views). Activity 6.01 (a todo app with an axios plugin, provide/inject and slots) is the same pattern as this week's work.

### Live-code steps

#### Step 1 — Install axios and write the API plugin (\~8 min)

```bash
npm i axios
```

A plugin is an object with an `install(app, options)` function. This one creates one configured axios instance and makes it available everywhere.

`src/plugins/api.js`

```js
import axios from 'axios'

export default {
  install(app, { baseURL }) {
    const api = axios.create({ baseURL, timeout: 8000 })

    app.provide('api', api) // for inject('api') in <script setup>
    app.config.globalProperties.$api = api // for this.$api in the Options API, as in Ex 6.02
  },
}
```

#### Step 2 — `BaseButton` and a plugin that registers base components globally (\~5 min)

Create the button. Any attribute the parent sets (`type`, `disabled`, `@click`) falls through to the `<button>`, because it is the single root element.

`src/components/BaseButton.vue`

```vue
<template>
  <!-- attributes such as type, disabled and @click fall through to the <button> -->
  <button class="base-button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  white-space: nowrap;
}

.base-button:disabled {
  cursor: default;
  opacity: 0.6;
}
</style>
```

`src/plugins/ui.js`

```js
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'

export default {
  install(app) {
    app.component('BaseButton', BaseButton)
    app.component('BaseCard', BaseCard)
  },
}
```

#### Step 3 — Install both plugins in `main.js` (\~3 min)

Plugins must be installed before `mount`.

`src/main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import api from './plugins/api'
import ui from './plugins/ui'
import './assets/main.css'

const app = createApp(App)

app.use(api, { baseURL: 'https://openlibrary.org' })
app.use(ui)

app.mount('#app')
```

#### Step 4 — A cover URL helper (\~2 min)

`src/utils/cover.js`

```js
// Open Library covers: S = small, M = medium, L = large
export function coverUrl(coverId, size = 'M') {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
```

#### Step 5 — Let the shelf say whether a book is already on it (\~5 min)

In `src/composables/useBooks.js`, add `isOnShelf` above `addBook`, guard `addBook` against duplicates, and return `isOnShelf`:

```js
  function isOnShelf(id) {
    return books.value.some((book) => book.id === id)
  }

  function addBook(book) {
    if (book.id && isOnShelf(book.id)) return
    books.value.push({ id: crypto.randomUUID(), status: 'want', ...book })
  }
```

```js
  return { books, isLoading, error, stats, allRead, isOnShelf, addBook, setStatus, removeBook }
```

#### Step 6 — `useBookSearch()`: call Open Library through the injected client (\~10 min)

Create `src/composables/useBookSearch.js`. It maps Open Library's field names onto BookNook's book shape, so search results can go straight onto the shelf.

`src/composables/useBookSearch.js`

```js
import { ref, inject } from 'vue'

export function useBookSearch() {
  const api = inject('api')

  const results = ref([])
  const isSearching = ref(false)
  const error = ref(null)

  async function search(query) {
    if (!query.trim()) {
      results.value = []
      return
    }

    isSearching.value = true
    error.value = null
    try {
      const { data } = await api.get('/search.json', {
        params: {
          q: query,
          limit: 12,
          fields: 'key,title,author_name,first_publish_year,cover_i',
        },
      })
      results.value = data.docs.map((doc) => ({
        id: doc.key.replace('/works/', ''),
        title: doc.title,
        author: doc.author_name?.[0] ?? 'Unknown author',
        year: doc.first_publish_year ?? null,
        coverId: doc.cover_i ?? null,
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      isSearching.value = false
    }
  }

  return { results, isSearching, error, search }
}
```

#### Step 7 — `provide` the shelf from `App.vue` (\~5 min)

`App.vue` now provides the shelf to every descendant, and renders the new Discover panel (step 8) under the list. `BookList` no longer needs `@update-status` or `@remove`, because the cards will call the shelf directly.

`src/App.vue`

```vue
<script setup>
import { provide } from 'vue'
import BookForm from './components/BookForm.vue'
import BookFilters from './components/BookFilters.vue'
import BookList from './components/BookList.vue'
import DiscoverPanel from './components/DiscoverPanel.vue'
import { useBooks } from './composables/useBooks'
import { useSearch } from './composables/useSearch'

const appName = import.meta.env.VITE_APP_TITLE
const { books, isLoading, error, stats, allRead, isOnShelf, addBook, setStatus, removeBook } =
  useBooks()
const { search, statusFilter, results } = useSearch(books)

provide('shelf', { books, isOnShelf, addBook, setStatus, removeBook })
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
  </header>

  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>

  <DiscoverPanel />
</template>
```

#### Step 8 — `DiscoverPanel` (\~10 min)

Create `src/components/DiscoverPanel.vue`. It injects the shelf, so adding a result needs no events at all. `BaseButton` works without an import because the `ui` plugin registered it.

`src/components/DiscoverPanel.vue`

```vue
<script setup>
import { ref, inject } from 'vue'
import { useBookSearch } from '@/composables/useBookSearch'
import { coverUrl } from '@/utils/cover'

const query = ref('')
const { results, isSearching, error, search } = useBookSearch()
const { addBook, isOnShelf } = inject('shelf')
</script>

<template>
  <section class="discover">
    <h2>Discover</h2>

    <form class="search" @submit.prevent="search(query)">
      <input v-model="query" type="search" placeholder="Search Open Library…" />
      <BaseButton type="submit" :disabled="isSearching">
        {{ isSearching ? 'Searching…' : 'Search' }}
      </BaseButton>
    </form>

    <p v-if="error" class="error">Search failed: {{ error }}</p>

    <ul class="results">
      <li v-for="book in results" :key="book.id">
        <img v-if="book.coverId" :src="coverUrl(book.coverId, 'S')" alt="" />
        <div class="info">
          <strong>{{ book.title }}</strong>
          <span class="muted">{{ book.author }}<template v-if="book.year"> · {{ book.year }}</template></span>
        </div>
        <BaseButton :disabled="isOnShelf(book.id)" @click="addBook(book)">
          {{ isOnShelf(book.id) ? 'On your shelf' : 'Add to shelf' }}
        </BaseButton>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search {
  display: flex;
  gap: 0.5rem;
}

.search input {
  flex: 1;
}

.results {
  list-style: none;
  padding: 0;
}

.results li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.results img {
  width: 40px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
```

#### Step 9 — `BookCardGrid`: the old card, now injecting the shelf (\~5 min)

Delete `src/components/BookCard.vue` and create `src/components/BookCardGrid.vue`. It calls `setStatus` and `removeBook` from `inject('shelf')` instead of emitting, and shows the cover.

`src/components/BookCardGrid.vue`

```vue
<script setup>
import { inject } from 'vue'
import { coverUrl } from '@/utils/cover'

defineProps({
  book: {
    type: Object,
    required: true,
    validator: (book) => ['want', 'reading', 'read'].includes(book.status),
  },
})

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }
const { setStatus, removeBook } = inject('shelf')
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId)" alt="" />
      <strong class="title">{{ book.title }}</strong>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <BaseButton @click="removeBook(book.id)">Remove</BaseButton>
    </template>
  </BaseCard>
</template>

<style scoped>
p {
  margin: 0;
}

select {
  flex: 1;
  min-width: 0;
}

.cover {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Step 10 — `BookCardRow`: a compact layout (\~4 min)

`src/components/BookCardRow.vue`

```vue
<script setup>
import { inject } from 'vue'

defineProps({
  book: { type: Object, required: true },
})

const { setStatus, removeBook } = inject('shelf')
</script>

<template>
  <div class="row" :class="{ read: book.status === 'read' }">
    <strong class="title">{{ book.title }}</strong>
    <span class="muted">{{ book.author }}</span>
    <BaseButton @click="setStatus(book.id, book.status === 'read' ? 'want' : 'read')">
      {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
    </BaseButton>
    <BaseButton @click="removeBook(book.id)">Remove</BaseButton>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.title {
  flex: 1;
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Step 11 — Switch layouts with `<component :is>` (\~6 min)

Replace `src/components/BookList.vue`. `layouts[layout]` picks the component object to render, and the toggle buttons change `layout`.

`src/components/BookList.vue`

```vue
<script setup>
import { ref } from 'vue'
import BookCardGrid from './BookCardGrid.vue'
import BookCardRow from './BookCardRow.vue'

defineProps({
  books: { type: Array, required: true },
})

const layouts = { grid: BookCardGrid, row: BookCardRow }
const layout = ref('grid')
</script>

<template>
  <div class="layout-toggle">
    <BaseButton :disabled="layout === 'grid'" @click="layout = 'grid'">Grid</BaseButton>
    <BaseButton :disabled="layout === 'row'" @click="layout = 'row'">List</BaseButton>
  </div>

  <div v-if="books.length" :class="['book-list', layout]">
    <component :is="layouts[layout]" v-for="book in books" :key="book.id" :book="book" />
  </div>
  <p v-else class="muted">
    <slot name="empty">No books here yet.</slot>
  </p>
</template>

<style scoped>
.layout-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.book-list {
  margin-top: 1rem;
}

.book-list.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
```

**Cut line:** after step 8. Steps 9–11 can be homework: until then, keep `BookCard.vue` and the old `BookList.vue` and pass `@update-status="setStatus" @remove="removeBook"` to `BookList` in `App.vue`.

**Homework:** debounce the search by 300 ms with a `watch` on the query. Optionally, a `formatters` plugin that exposes `formatAuthors(list)`.

**Watch out for:** calling `inject` outside `setup`; `app.use` placed after `app.mount`; covers that are blank images when a book has no `cover_i` (add `?default=false` to get a 404 instead); the whole class searching at once, since everyone shares one IP address.

## Week 6 — Routing (Ch7)

**Outcome:** BookNook becomes a multi-page SPA with My Shelf (`/`), Discover (`/discover`), a Book detail page with nested Overview and Notes tabs (`/books/:id`, `/books/:id/notes`), and a 404 page.

**Concepts:** `createRouter` / `createWebHistory`, `<RouterView>` and `<RouterLink>` (with active-link styling), named routes, dynamic params with `props: true`, nested `children`, lazy-loaded routes, route `meta`, and navigation hooks (`afterEach` here, `beforeEnter` in week 7). Also programmatic navigation with `useRouter().push`.

**Book material:** Ex 7.01 (install, `RouterView`), 7.02 (`RouterLink` navigation), 7.03 (params, `props: true`, query), 7.04 (`beforeEnter` guards, error route), 7.05 (nested routes). Activity 7.01 (a message app with nested list/editor routes, guards and lazy loading) is a strong homework option.

### Live-code steps

#### Step 1 — Install Vue Router and define the routes (\~10 min)

```bash
npm i vue-router
```

Create `src/router/index.js`. Only `ShelfView` is imported up front; the other views are lazy-loaded with `() => import(...)`, so each becomes its own file in the build. The child routes render inside `BookDetailView`.

`src/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import ShelfView from '@/views/ShelfView.vue'

const routes = [
  { path: '/', name: 'shelf', component: ShelfView, meta: { title: 'My shelf' } },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/DiscoverView.vue'),
    meta: { title: 'Discover' },
  },
  {
    path: '/books/:id',
    component: () => import('@/views/BookDetailView.vue'),
    props: true,
    children: [
      { path: '', name: 'book', component: () => import('@/views/BookOverview.vue') },
      { path: 'notes', name: 'book-notes', component: () => import('@/views/BookNotes.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not found' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Book'} · BookNook`
})
```

#### Step 2 — Install the router in `main.js` (\~2 min)

`src/main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import api from './plugins/api'
import ui from './plugins/ui'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(api, { baseURL: 'https://openlibrary.org' })
app.use(ui)

app.mount('#app')
```

#### Step 3 — Add `updateNotes` to `useBooks` (\~3 min)

In `src/composables/useBooks.js`, add this function above `removeBook`, and add `updateNotes` to the returned object:

```js
  function updateNotes(id, notes) {
    const book = books.value.find((book) => book.id === id)
    if (book) book.notes = notes
  }
```

```js
  return {
    books,
    isLoading,
    error,
    stats,
    allRead,
    isOnShelf,
    addBook,
    setStatus,
    updateNotes,
    removeBook,
  }
```

#### Step 4 — `App.vue` becomes the layout (\~7 min)

Replace `App.vue`. It still owns the shelf and provides all of it, but the shelf UI moves into views. `<RouterView />` is where the current page renders; `.router-link-exact-active` highlights the current nav link.

`src/App.vue`

```vue
<script setup>
import { provide } from 'vue'
import { useBooks } from './composables/useBooks'

const appName = import.meta.env.VITE_APP_TITLE
const shelf = useBooks()
const { stats } = shelf

provide('shelf', shelf)
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">{{ appName }}</RouterLink>
    <nav>
      <RouterLink to="/">My shelf</RouterLink>
      <RouterLink :to="{ name: 'discover' }">Discover</RouterLink>
    </nav>
  </header>
  <p class="muted">
    {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
    {{ stats.want }} to read
  </p>

  <RouterView />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: var(--muted);
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--accent);
  font-weight: 600;
}
</style>
```

#### Step 5 — `ShelfView` (\~5 min)

Create `src/views/ShelfView.vue` with what used to be in `App.vue`'s template. Because the shelf is provided, the view can `inject` it.

`src/views/ShelfView.vue`

```vue
<script setup>
import { inject } from 'vue'
import BookForm from '@/components/BookForm.vue'
import BookFilters from '@/components/BookFilters.vue'
import BookList from '@/components/BookList.vue'
import { useSearch } from '@/composables/useSearch'

const { books, isLoading, error, allRead, addBook } = inject('shelf')
const { search, statusFilter, results } = useSearch(books)
</script>

<template>
  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
```

#### Step 6 — `DiscoverView` and programmatic navigation (\~6 min)

In `src/components/DiscoverPanel.vue`, declare an `added` event and emit it after adding a book. Everything below the imports in the script now reads as follows, and the button calls `add(book)`:

```js
const emit = defineEmits(['added'])

const query = ref('')
const { results, isSearching, error, search } = useBookSearch()
const { addBook, isOnShelf } = inject('shelf')

function add(book) {
  addBook(book)
  emit('added', book)
}
```

```vue
        <BaseButton :disabled="isOnShelf(book.id)" @click="add(book)">
```

Then create the view, which opens the new book's page with `router.push`:

`src/views/DiscoverView.vue`

```vue
<script setup>
import { useRouter } from 'vue-router'
import DiscoverPanel from '@/components/DiscoverPanel.vue'

const router = useRouter()

function openBook(book) {
  router.push({ name: 'book', params: { id: book.id } })
}
</script>

<template>
  <DiscoverPanel @added="openBook" />
</template>
```

#### Step 7 — Link each card to its book page (\~5 min)

In `BookCardGrid.vue`, replace the `<strong class="title">` with a `RouterLink`:

```vue
      <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
        {{ book.title }}
      </RouterLink>
```

Do the same in `BookCardRow.vue`:

```vue
    <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
      {{ book.title }}
    </RouterLink>
```

Add this rule to the scoped styles of both cards, above `.read .title`, so the link looks like the old title:

```css
.title {
  font-weight: 600;
  color: var(--ink);
}
```

#### Step 8 — `BookDetailView` with nested routes (\~10 min)

Create `src/views/BookDetailView.vue`. It receives `id` as a prop (`props: true`), finds the book, and passes it to the child route through `<RouterView :book="book" />`. Unknown ids show a "not found" message for now; week 7 replaces this with a route guard.

`src/views/BookDetailView.vue`

```vue
<script setup>
import { computed, inject } from 'vue'
import { coverUrl } from '@/utils/cover'

const props = defineProps({
  id: { type: String, required: true },
})

const { books } = inject('shelf')
const book = computed(() => books.value.find((book) => book.id === props.id))
</script>

<template>
  <section v-if="book" class="detail">
    <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId, 'L')" alt="" />
    <div class="content">
      <h2>{{ book.title }}</h2>
      <nav class="tabs">
        <RouterLink :to="{ name: 'book', params: { id } }">Overview</RouterLink>
        <RouterLink :to="{ name: 'book-notes', params: { id } }">Notes</RouterLink>
      </nav>
      <!-- the child route (Overview or Notes) renders here and receives the book -->
      <RouterView :book="book" />
    </div>
  </section>

  <section v-else>
    <h2>Book not found</h2>
    <p class="muted">There's no book with the id “{{ id }}” on your shelf.</p>
    <RouterLink to="/">Back to my shelf</RouterLink>
  </section>
</template>

<style scoped>
.detail {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.cover {
  width: 200px;
  align-self: flex-start;
}

.content {
  flex: 1;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.tabs a {
  padding: 0.5rem 0;
  color: var(--muted);
  text-decoration: none;
}

.tabs a.router-link-exact-active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}
</style>
```

#### Step 9 — `BookOverview` (\~4 min)

Create `src/views/BookOverview.vue`. After removing a book it navigates back to the shelf.

`src/views/BookOverview.vue`

```vue
<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: { type: Object, required: true },
})

const STATUSES = { want: 'Want to read', reading: 'Reading', read: 'Read' }
const { setStatus, removeBook } = inject('shelf')
const router = useRouter()

function remove() {
  removeBook(props.book.id)
  router.push({ name: 'shelf' })
}
</script>

<template>
  <dl>
    <dt>Author</dt>
    <dd>{{ book.author }}</dd>
    <template v-if="book.year">
      <dt>First published</dt>
      <dd>{{ book.year }}</dd>
    </template>
    <dt>Status</dt>
    <dd>
      <select :value="book.status" @change="setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
    </dd>
  </dl>
  <BaseButton @click="remove">Remove from shelf</BaseButton>
</template>

<style scoped>
dt {
  font-weight: 600;
}

dd {
  margin: 0 0 0.75rem;
}
</style>
```

#### Step 10 — `BookNotes` (\~4 min)

Create `src/views/BookNotes.vue`. Every keystroke goes through `updateNotes`, and the deep watcher from week 2 saves it, so there's no save button.

`src/views/BookNotes.vue`

```vue
<script setup>
import { inject } from 'vue'

defineProps({
  book: { type: Object, required: true },
})

const { updateNotes } = inject('shelf')
</script>

<template>
  <label for="notes">Your notes on {{ book.title }}</label>
  <textarea
    id="notes"
    rows="8"
    placeholder="Favourite quotes, thoughts, who recommended it…"
    :value="book.notes"
    @input="updateNotes(book.id, $event.target.value)"
  ></textarea>
  <p class="muted">Notes are saved automatically.</p>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
```

#### Step 11 — `NotFoundView` (\~2 min)

Create `src/views/NotFoundView.vue`. The catch-all route `/:pathMatch(.*)*` sends every unknown URL here.

`src/views/NotFoundView.vue`

```vue
<template>
  <section>
    <h2>Page not found</h2>
    <p class="muted">That page isn't on any shelf.</p>
    <RouterLink to="/">Back to my shelf</RouterLink>
  </section>
</template>
```

**Cut line:** after step 8. Steps 9–11 can be homework, but the Overview, Notes and 404 routes show an error until their files exist.

**Homework:** try `/books/nope`. Ask students why a `beforeEnter` guard couldn't check whether the book exists yet (guards run outside components, so they can't `inject` the shelf). Week 7 fixes it.

**Watch out for:** route params always arrive as strings; typos in route names fail without an obvious error; history mode needs an SPA fallback on the production server (Vite dev handles it for you).

## Week 7 — The state of Vue and state management with Pinia (Ch9 + Ch10)

**Outcome:** the provide/inject wiring and the `useBooks` composable are replaced by one Pinia store. Every page, the router guard and Devtools all read the same shelf, and the class ends with a demo of the finished app.

**Concepts (Ch9):** the three ways to share state that students have already used: a common ancestor with props and events (week 3), provide/inject (weeks 5–6), and a module-level `reactive` store. Then why a dedicated library helps: Devtools integration, structure, and use outside components.

**Concepts (Ch10):** `createPinia`, `defineStore` with `state` / `getters` / `actions`, `storeToRefs`, `$subscribe`, `$reset`, the Pinia tab in Devtools, and using a store inside a router guard.

**Book material:** Ex 9.01–9.02 (lifting state to a common ancestor), 9.03 (a simple `store.js` with `reactive`), Activity 9.01. Ex 10.01 (state), 10.02 (getters), 10.03 (actions), all on a colour-preview app. Activity 10.01 (Products / Cart / Checkout) is a good end-of-course practice project.

### Live-code steps

#### Step 1 — Ch9 demo: module-level state (\~5 min, then undo)

In `src/composables/useBooks.js`, move the `books` line above the function. Open Shelf and Discover in Devtools: every caller now shares one array. Ask what's still missing (Devtools support, a clear structure, safe use in router guards), then undo the change.

```js
import { ref, computed, watch, onMounted } from 'vue'

const books = ref([]) // demo: one array shared by every caller

export function useBooks() {
  // const books = ref([])  <- it used to be created here, once per call
  const isLoading = ref(false)
  // ...the rest is unchanged
```

#### Step 2 — Install Pinia and write the shelf store (\~12 min)

```bash
npm i pinia
```

Create `src/stores/shelf.js`. Map it to what students know: `state` is `data()`, `getters` are computed properties, `actions` are methods. The state reads `localStorage` synchronously, so the store has the books before any page or guard asks for them.

`src/stores/shelf.js`

```js
import { defineStore } from 'pinia'

export const useShelfStore = defineStore('shelf', {
  state: () => ({
    books: JSON.parse(localStorage.getItem('booknook') ?? '[]'),
    isLoading: false,
    error: null,
  }),

  getters: {
    stats: (state) => {
      const count = (status) => state.books.filter((book) => book.status === status).length
      return {
        total: state.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
    allRead: (state) =>
      state.books.length > 0 && state.books.every((book) => book.status === 'read'),
    getById: (state) => (id) => state.books.find((book) => book.id === id),
    isOnShelf: (state) => (id) => state.books.some((book) => book.id === id),
  },

  actions: {
    add(book) {
      if (book.id && this.isOnShelf(book.id)) return
      this.books.push({ id: crypto.randomUUID(), status: 'want', ...book })
    },
    setStatus(id, status) {
      const book = this.getById(id)
      if (book) book.status = status
    },
    setAllRead(value) {
      this.books.forEach((book) => {
        book.status = value ? 'read' : 'want'
      })
    },
    updateNotes(id, notes) {
      const book = this.getById(id)
      if (book) book.notes = notes
    },
    remove(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
    async loadSeed() {
      if (this.books.length) return

      this.isLoading = true
      try {
        const response = await fetch('/books.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        this.books = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
```

#### Step 3 — Install Pinia and save on every change (\~4 min)

Replace `main.js`. `$subscribe` runs after every change to the store, which replaces the deep watcher from `useBooks`.

`src/main.js`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import api from './plugins/api'
import ui from './plugins/ui'
import { useShelfStore } from './stores/shelf'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(api, { baseURL: 'https://openlibrary.org' })
app.use(ui)

// Save the shelf to localStorage after every change to the store
useShelfStore().$subscribe((mutation, state) => {
  localStorage.setItem('booknook', JSON.stringify(state.books))
})

app.mount('#app')
```

#### Step 4 — `App.vue` uses the store (\~4 min)

Replace `App.vue`'s script; the template and styles are unchanged (full file below). `storeToRefs` keeps `stats` reactive after destructuring; actions such as `loadSeed` are called on the store itself.

`src/App.vue`

```vue
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useShelfStore } from './stores/shelf'

const appName = import.meta.env.VITE_APP_TITLE
const shelf = useShelfStore()
const { stats } = storeToRefs(shelf)

onMounted(() => shelf.loadSeed())
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">{{ appName }}</RouterLink>
    <nav>
      <RouterLink to="/">My shelf</RouterLink>
      <RouterLink :to="{ name: 'discover' }">Discover</RouterLink>
    </nav>
  </header>
  <p class="muted">
    {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
    {{ stats.want }} to read
  </p>

  <RouterView />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: var(--muted);
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--accent);
  font-weight: 600;
}
</style>
```

#### Step 5 — `ShelfView` (\~5 min)

A getter is read-only, so `allRead` for the checkbox is a writable computed that pairs the getter with the `setAllRead` action. Actions can be passed straight to events: `@add="shelf.add"`.

`src/views/ShelfView.vue`

```vue
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import BookForm from '@/components/BookForm.vue'
import BookFilters from '@/components/BookFilters.vue'
import BookList from '@/components/BookList.vue'
import { useSearch } from '@/composables/useSearch'
import { useShelfStore } from '@/stores/shelf'

const shelf = useShelfStore()
const { books, isLoading, error } = storeToRefs(shelf)
const { search, statusFilter, results } = useSearch(books)

// A getter is read-only, so pair it with an action for v-model
const allRead = computed({
  get: () => shelf.allRead,
  set: (value) => shelf.setAllRead(value),
})
</script>

<template>
  <BookForm @add="shelf.add" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
```

#### Step 6 — The two cards (\~5 min)

Replace `inject('shelf')` with the store in both cards. The templates call `shelf.setStatus` and `shelf.remove`.

`src/components/BookCardGrid.vue`

```vue
<script setup>
import { useShelfStore } from '@/stores/shelf'
import { coverUrl } from '@/utils/cover'

defineProps({
  book: {
    type: Object,
    required: true,
    validator: (book) => ['want', 'reading', 'read'].includes(book.status),
  },
})

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }
const shelf = useShelfStore()
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId)" alt="" />
      <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
        {{ book.title }}
      </RouterLink>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="shelf.setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <BaseButton @click="shelf.remove(book.id)">Remove</BaseButton>
    </template>
  </BaseCard>
</template>

<style scoped>
p {
  margin: 0;
}

select {
  flex: 1;
  min-width: 0;
}

.cover {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: 600;
  color: var(--ink);
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

`src/components/BookCardRow.vue`

```vue
<script setup>
import { useShelfStore } from '@/stores/shelf'

defineProps({
  book: { type: Object, required: true },
})

const shelf = useShelfStore()
</script>

<template>
  <div class="row" :class="{ read: book.status === 'read' }">
    <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
      {{ book.title }}
    </RouterLink>
    <span class="muted">{{ book.author }}</span>
    <BaseButton @click="shelf.setStatus(book.id, book.status === 'read' ? 'want' : 'read')">
      {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
    </BaseButton>
    <BaseButton @click="shelf.remove(book.id)">Remove</BaseButton>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.title {
  flex: 1;
}

.title {
  font-weight: 600;
  color: var(--ink);
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
```

#### Step 7 — `BookDetailView` (\~3 min)

The book comes from the `getById` getter. The "Book not found" section from week 6 is gone, because the guard in step 11 stops unknown ids before this page renders. Keep `v-if="book"`: right after a remove, the book is gone before the page navigates away.

`src/views/BookDetailView.vue`

```vue
<script setup>
import { computed } from 'vue'
import { useShelfStore } from '@/stores/shelf'
import { coverUrl } from '@/utils/cover'

const props = defineProps({
  id: { type: String, required: true },
})

const shelf = useShelfStore()
const book = computed(() => shelf.getById(props.id))
</script>

<template>
  <section v-if="book" class="detail">
    <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId, 'L')" alt="" />
    <div class="content">
      <h2>{{ book.title }}</h2>
      <nav class="tabs">
        <RouterLink :to="{ name: 'book', params: { id } }">Overview</RouterLink>
        <RouterLink :to="{ name: 'book-notes', params: { id } }">Notes</RouterLink>
      </nav>
      <!-- the child route (Overview or Notes) renders here and receives the book -->
      <RouterView :book="book" />
    </div>
  </section>
</template>

<style scoped>
.detail {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.cover {
  width: 200px;
  align-self: flex-start;
}

.content {
  flex: 1;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.tabs a {
  padding: 0.5rem 0;
  color: var(--muted);
  text-decoration: none;
}

.tabs a.router-link-exact-active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}
</style>
```

#### Step 8 — `BookOverview` and `BookNotes` (\~4 min)

`src/views/BookOverview.vue`

```vue
<script setup>
import { useRouter } from 'vue-router'
import { useShelfStore } from '@/stores/shelf'

const props = defineProps({
  book: { type: Object, required: true },
})

const STATUSES = { want: 'Want to read', reading: 'Reading', read: 'Read' }
const shelf = useShelfStore()
const router = useRouter()

function remove() {
  shelf.remove(props.book.id)
  router.push({ name: 'shelf' })
}
</script>

<template>
  <dl>
    <dt>Author</dt>
    <dd>{{ book.author }}</dd>
    <template v-if="book.year">
      <dt>First published</dt>
      <dd>{{ book.year }}</dd>
    </template>
    <dt>Status</dt>
    <dd>
      <select :value="book.status" @change="shelf.setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
    </dd>
  </dl>
  <BaseButton @click="remove">Remove from shelf</BaseButton>
</template>

<style scoped>
dt {
  font-weight: 600;
}

dd {
  margin: 0 0 0.75rem;
}
</style>
```

`src/views/BookNotes.vue`

```vue
<script setup>
import { useShelfStore } from '@/stores/shelf'

defineProps({
  book: { type: Object, required: true },
})

const shelf = useShelfStore()
</script>

<template>
  <label for="notes">Your notes on {{ book.title }}</label>
  <textarea
    id="notes"
    rows="8"
    placeholder="Favourite quotes, thoughts, who recommended it…"
    :value="book.notes"
    @input="shelf.updateNotes(book.id, $event.target.value)"
  ></textarea>
  <p class="muted">Notes are saved automatically.</p>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
```

#### Step 9 — Keep Discover results with a second store (\~6 min)

Component state disappears when you leave a page; store state doesn't. Create the store, let `useBookSearch` accept a ref to write into, and wire both into `DiscoverPanel`. Search, go to My shelf, come back: the results are still there.

`src/stores/discover.js`

```js
import { defineStore } from 'pinia'

// Lives outside any component, so the last search survives route changes
export const useDiscoverStore = defineStore('discover', {
  state: () => ({
    query: '',
    results: [],
  }),
})
```

`src/composables/useBookSearch.js`

```js
import { ref, inject } from 'vue'

// Pass in a ref (e.g. from a store) to keep the results somewhere longer-lived
export function useBookSearch(results = ref([])) {
  const api = inject('api')

  const isSearching = ref(false)
  const error = ref(null)

  async function search(query) {
    if (!query.trim()) {
      results.value = []
      return
    }

    isSearching.value = true
    error.value = null
    try {
      const { data } = await api.get('/search.json', {
        params: {
          q: query,
          limit: 12,
          fields: 'key,title,author_name,first_publish_year,cover_i',
        },
      })
      results.value = data.docs.map((doc) => ({
        id: doc.key.replace('/works/', ''),
        title: doc.title,
        author: doc.author_name?.[0] ?? 'Unknown author',
        year: doc.first_publish_year ?? null,
        coverId: doc.cover_i ?? null,
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      isSearching.value = false
    }
  }

  return { results, isSearching, error, search }
}
```

`src/components/DiscoverPanel.vue`

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useBookSearch } from '@/composables/useBookSearch'
import { useShelfStore } from '@/stores/shelf'
import { useDiscoverStore } from '@/stores/discover'
import { coverUrl } from '@/utils/cover'

const emit = defineEmits(['added'])

const shelf = useShelfStore()
const { query, results } = storeToRefs(useDiscoverStore())
const { isSearching, error, search } = useBookSearch(results)

function add(book) {
  shelf.add(book)
  emit('added', book)
}
</script>

<template>
  <section class="discover">
    <h2>Discover</h2>

    <form class="search" @submit.prevent="search(query)">
      <input v-model="query" type="search" placeholder="Search Open Library…" />
      <BaseButton type="submit" :disabled="isSearching">
        {{ isSearching ? 'Searching…' : 'Search' }}
      </BaseButton>
    </form>

    <p v-if="error" class="error">Search failed: {{ error }}</p>

    <ul class="results">
      <li v-for="book in results" :key="book.id">
        <img v-if="book.coverId" :src="coverUrl(book.coverId, 'S')" alt="" />
        <div class="info">
          <strong>{{ book.title }}</strong>
          <span class="muted">{{ book.author }}<template v-if="book.year"> · {{ book.year }}</template></span>
        </div>
        <BaseButton :disabled="shelf.isOnShelf(book.id)" @click="add(book)">
          {{ shelf.isOnShelf(book.id) ? 'On your shelf' : 'Add to shelf' }}
        </BaseButton>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search {
  display: flex;
  gap: 0.5rem;
}

.search input {
  flex: 1;
}

.results {
  list-style: none;
  padding: 0;
}

.results li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.results img {
  width: 40px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
```

#### Step 10 — Delete `useBooks` and explore the Pinia tab (\~5 min)

Delete `src/composables/useBooks.js`; nothing imports it any more. Open Devtools → Pinia, select `shelf`, and edit a book's status there to show the page update.

#### Step 11 — The route guard payoff (\~4 min)

Replace `src/router/index.js`. The `beforeEnter` guard runs before the page renders, outside any component, which is why `inject` couldn't work here in week 6 but a store can. Try `/books/nope`: it now redirects to the 404 page.

`src/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import ShelfView from '@/views/ShelfView.vue'
import { useShelfStore } from '@/stores/shelf'

const routes = [
  { path: '/', name: 'shelf', component: ShelfView, meta: { title: 'My shelf' } },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/DiscoverView.vue'),
    meta: { title: 'Discover' },
  },
  {
    path: '/books/:id',
    component: () => import('@/views/BookDetailView.vue'),
    props: true,
    // Guards run outside components: inject() can't work here, a store can
    beforeEnter: (to) => (useShelfStore().getById(to.params.id) ? true : '/not-found'),
    children: [
      { path: '', name: 'book', component: () => import('@/views/BookOverview.vue') },
      { path: 'notes', name: 'book-notes', component: () => import('@/views/BookNotes.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not found' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Book'} · BookNook`
})
```

**Cut line:** after step 10. If time is short, show step 11 as finished code.

**After the course:** suggested next chapters are Ch8 (animate the list with `<TransitionGroup>`), Ch11 (unit tests with Vitest), Ch12 (end-to-end tests with Cypress), and Ch13 (deploying BookNook, including the SPA fallback from week 6).

**Watch out for:** destructuring a store without `storeToRefs` (the values stop updating); calling `useShelfStore()` at the top of `router/index.js` before Pinia is installed (call it inside the guard); the `this` keyword in arrow-function getters (use the `state` argument).

## Appendix

### Book data model

Every book has the same shape, whether it was typed in (week 1), seeded from `books.json` (week 2) or added from Open Library (week 5). Use Open Library work ids such as `OL45804W` in the seed file, so the Discover "On your shelf" check and the `/books/:id` routes work for every book.

```js
{
  id: 'OL893414W',          // string; Open Library work id without "/works/"
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965,               // from the seed file or Open Library
  coverId: 11481354,        // Open Library cover_i, or null
  status: 'read',           // 'want' | 'reading' | 'read'
  notes: '',                // added in week 6
}
```

### Final file structure (end of week 7)

```
src/
├─ main.js                 createApp · use(pinia) · use(router) · use(api) · use(ui)
├─ App.vue                 header, nav, <RouterView>
├─ assets/main.css         global styles (week 1)
├─ router/index.js         routes, page titles, beforeEnter guard
├─ stores/
│  ├─ shelf.js             books, getters, actions
│  └─ discover.js          last search query + results
├─ plugins/
│  ├─ api.js               axios instance → provide('api')
│  └─ ui.js                global BaseCard, BaseButton
├─ composables/
│  ├─ useSearch.js
│  └─ useBookSearch.js
├─ utils/cover.js          Open Library cover URLs
├─ views/
│  ├─ ShelfView.vue  ├─ DiscoverView.vue  ├─ NotFoundView.vue
│  └─ BookDetailView.vue → BookOverview.vue, BookNotes.vue
└─ components/
   ├─ BaseCard.vue  ├─ BaseButton.vue  ├─ BookForm.vue  ├─ BookFilters.vue
   ├─ BookList.vue  ├─ BookCardGrid.vue  ├─ BookCardRow.vue  └─ DiscoverPanel.vue
public/books.json          seed data (week 2)
.env                       VITE_APP_TITLE (week 3)
```

### Stretch goals for fast students

- Reading goal for the year ("12 books in 2027") as a Pinia getter with a progress ring.
- Drag to reorder the "Reading" list.
- Dark mode: a `theme` value provided from `App.vue` (week 5) or kept in a small Pinia store (week 7).
- Export and import the shelf as a JSON file.
- Pagination on Discover with Open Library's `page` parameter.
- A `/stats` page, lazy-loaded, that charts books read per year.

### Sources

- [Frontend Development Projects with Vue.js 3, code repository](https://github.com/PacktPublishing/Frontend-Development-Projects-with-Vue.js-3) (branch `v2-edition`; chapter and exercise numbers above come from its folders)
- [Open Library Search API](https://openlibrary.org/dev/docs/api/search)
- [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
