<script lang="ts">
  import { browser } from '$app/environment'

  export let data
  export let form

  $: if (form?.refresh && browser) {
    location.reload()
  }
</script>

<svelte:head>
  <title>Catalyst Sveltekit Example</title>
  <meta name="description" content="Example page for Catalyst." />
</svelte:head>

<h1>Catalyst Sveltekit Example</h1>

<p>
  This is the Sveltekit example for <a href="https://www.catalystmonitor.com"
    >Catalyst</a
  >! Enclosed are simplified but realistic applications with
  <b>deliberate bugs</b> to showcase how Catalyst helps you identify, triage, and
  debug any issues on a webapp.
</p>
<p>
  Check out the source code for this example (and examples for other frameworks)
  on <a href="https://github.com/catalyst-monitor/catalyst-examples">Github</a>.
</p>

{#if data.isAuthed}
  <p>
    You are logged in! Click one of the links to try out some example features
  </p>

  <ul>
    <li><a href="/shortener">Link shortener</a></li>
    <li><a href="/todo">To do list</a></li>
  </ul>

  <form method="POST" action="?/logout">
    <button class="logoutBtn">Logout</button>
  </form>
{:else}
  <p>
    To begin, create an account. Nothing is being persisted to databases, so
    feel free to use a fake name and password.
  </p>
  <form method="POST" action="?/login" class="form">
    <label class="label">
      <div class="labelText">Name:</div>
      <input name="userName" type="text" />
    </label>
    <label class="label">
      <div class="labelText">Password</div>
      <input name="password" type="password" />
    </label>
    {#if form != null && 'loginResult' in form}
      <div class="error">{form.loginResult}</div>
    {/if}
    {#if form?.refresh}
      <div class="loginSuccess">Redirecting soon...</div>
    {/if}
    <div class="buttonRow">
      <button class="loginBtn button">Login</button>
      <button formaction="?/create" class="button">Create</button>
    </div>
  </form>
{/if}

<style>
  h1 {
    text-align: center;
  }

  .form {
    max-width: 400px;
    margin: 0 auto 24px;
  }

  .label {
    display: block;
    margin-bottom: 24px;
  }

  .labelText {
    display: block;
    margin-bottom: 2px;
    font-size: 12px;
    font-weight: bold;
    color: var(--colorOnSurfaceVariant);
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .buttonRow {
    display: flex;
    justify-content: space-between;
  }

  .error {
    margin-bottom: 12px;
    color: red;
  }
</style>
