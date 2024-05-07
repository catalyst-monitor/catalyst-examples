<script lang="ts">
  import type { PageData } from './$types'

  export let data

  let todo: string = ''

  let updatedTodos = [...data.todos]

  async function createTodo() {
    const resp = await fetch(`/api/todo/`, {
      method: 'put',
      body: JSON.stringify({
        todo,
      }),
    })
    todo = ''

    const json = await resp.json()
    updatedTodos.push(json)
    updatedTodos = updatedTodos
  }
</script>

<svelte:head>
  <title>Todo list - Catalyst Sveltekit Example</title>
  <meta
    name="description"
    content="Simple Sveltekit todo list for showcasing the features of Catalyst."
  />
</svelte:head>

<h1>Todo</h1>

<div class="todoInputRow">
  <input
    placeholder="Don't forget to do this..."
    type="text"
    bind:value={todo}
  />
  <button on:click={createTodo}>Create</button>
</div>

{#each updatedTodos as t}
  <div class="todo">
    <input
      type="checkbox"
      value={t.finishedMillis != null}
      disabled={t.finishedMillis != null}
      on:change={async () => {
        await fetch(`/api/todo/${t.id}`, { method: 'post' })
        t.finishedMillis = new Date().getTime()
        updatedTodos = updatedTodos
      }}
    />
    <div class="todoText">
      <span class={t.finishedMillis != null ? 'finished' : ''}>{t.todo}</span>
      <div class="todoDate">
        {#if t.finishedMillis != null}
          Finished on {new Date(t.finishedMillis).toDateString()}
        {:else}
          Created on {new Date(t.createdMillis).toDateString()}
        {/if}
      </div>
    </div>
    <button
      class="delete"
      on:click={async () => {
        await fetch(`/api/todo/${t.id}`, { method: 'delete' })
        updatedTodos = updatedTodos.filter((d) => d.id != t.id)
      }}
    >
      Delete
    </button>
  </div>
{:else}
  <p>To get started, enter something to do above!</p>
{/each}

<style>
  h1 {
    text-align: center;
  }

  .todoInputRow {
    display: flex;
    margin-top: 36px;
    margin-bottom: 12px;
  }

  .todoInputRow input {
    flex: 0 1 100%;
    margin-right: 12px;
  }

  .todo {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid var(--colorOutline);
  }

  .todoText {
    flex: 0 1 100%;
    margin-left: 12px;
  }

  .finished {
    text-decoration: line-through;
  }

  .todoDate {
    font-size: 12px;
    color: var(--colorOnSurfaceVariant);
  }
</style>
