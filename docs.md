# SimonTomComponent Documentation

This project is a modular Vue 3 component library structured for composability, testability, and maintainability. All components follow a clear folder-based separation and are written using `<script setup lang="ts">` with TypeScript and Composition API.

## 📁 Project Structure

```
src/
  components/
    ContextMenu/
    ProfileLink/
    RecursiveForm/
    BaseModal/
    BaseLayout/
    InfoBox/
    InputField/
  App.vue
```

Each folder represents a self-contained component group, often with an `index.vue` as the entry point and additional internal components.

## 🧩 Main Components

### `ContextMenu`
- Composed of `ContextButton`, `ContextDropdown`, and `ContextList`
- Uses slot-based content injection
- Dynamically positions the dropdown relative to the triggering button using refs and `getBoundingClientRect`
- Emits selected option

### `RecursiveForm`
- A recursive form-rendering engine (likely for nested question trees)
- Supports nested blocks and inputs
- Demonstrates recursion through self-inclusion and dynamic rendering

### `BaseModal`
- Includes modal content, body, overlay, and close logic
- Uses `v-if` to control visibility and emits close events
- Tailored for slot-based content injection

### `ProfileLink`
- User profile link display with image, name/text, and an anchor or trigger
- Designed for flexible usage (e.g., navbar profile button)

## 🧪 Testing (currently absent)

There are **no unit tests provided**. Suggested tools:
- [Vitest](https://vitest.dev/) for unit testing
- [Vue Test Utils](https://test-utils.vuejs.org/) for component interaction
- [Cypress](https://cypress.io/) for end-to-end integration

Recommendation:
```sh
pnpm test:unit   # Add this script and test directory
```

## 🧠 TypeScript & Composition API Usage

All components:
- Use `ref`, `defineProps`, `defineEmits`, `defineExpose`
- Follow Composition API best practices
- Typed props via imported interfaces (e.g., `ContextListProps`)

## 🧼 Style & Conventions

- SCSS imported globally (`@/assets/styles/main.scss`)
- No inline styles
- No `<style scoped>` used (global CSS approach)

## ⚠️ Issues & Recommendations

| Issue                        | Recommendation                                    |
| Missing tests               | Add unit & integration tests                      |
| No comments in logic        | Add inline docs for clarity                      |

## 🧪 Future Improvements
- Add CI/CD integration with lint + test steps
- Add visual regression testing for `ContextMenu` and `RecursiveForm`
- Consider Storybook integration for component showcase

## 🧬 Sample Usage

```vue
<BaseLayout>
  <template #header>
    <ProfileLink :imgLink="logo" />
  </template>
  <template #left>
    <ContextMenu :options="['A', 'B', 'C']">
      <template #button>Open Menu</template>
    </ContextMenu>
  </template>
  <template #right>
    <RecursiveForm />
    <BaseModal v-if="modalOpen" :isOpen="modalOpen" @close="modalOpen = false">
      Modal Content Here
    </BaseModal>
  </template>
</BaseLayout>
```

---

> "The codebase is logically structured and clean. But beware, for even the cleanest component will stink if left untested — like a well-dressed man who forgot deodorant."

