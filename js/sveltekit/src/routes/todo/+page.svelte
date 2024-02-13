<script lang="ts">
  import { goto } from '$app/navigation'

  async function createAccount() {
    const resp = await fetch('/api/todo', {
      method: 'put',
    })
    const json = await resp.json()

    goto(`/todo/${json['password']}`)
  }

  let password: string
  function goToAccount() {
    goto(`/todo/${password}`)
  }
</script>

<svelte:head>
  <title>Todo list - Catalyst Sveltekit Example</title>
  <meta
    name="description"
    content="Simple Sveltekit todo list for showcasing the features of Catalyst."
  />
</svelte:head>

<h1>Todo List</h1>
<p>
  This is a simple server-stored todo list. Try accessing the same todo list in
  multiple browser tabs to expose a multitude of fun bugs!
</p>
<p>
  <strong
    >If this example is remotely hosted, please do not put any sensitive data in
    here!</strong
  >
</p>

<p>To start, click "Create" and take note of the password generated for you.</p>
<div class="createRow">
  <button on:click={createAccount}>Create</button>
</div>

<p>Return to your previous todo list by entering the generated password.</p>
<div class="restoreRow">
  <input
    placeholder="Previously generated password"
    type="text"
    bind:value={password}
  />
  <button on:click={goToAccount}>Restore</button>
</div>

<style>
  h1 {
    text-align: center;
  }

  .createRow {
    margin-bottom: 36px;
  }

  .restoreRow {
    display: flex;
  }

  .restoreRow input {
    flex: 0 1 100%;
    margin-right: 12px;
  }
</style>
