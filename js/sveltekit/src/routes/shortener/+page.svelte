<script lang="ts">
  import { enhance } from '$app/forms'

  export let data
</script>

<svelte:head>
  <title>Link shortener - Catalyst Sveltekit Example</title>
  <meta
    name="description"
    content="Simple Sveltekit link shortener for showcasing the features of Catalyst."
  />
</svelte:head>

<h1>Link Shortener</h1>
<p>
  Enter your preferred short link, password for future modifications, and full
  URL.
</p>
<p>
  You can change the full URL for the short link if you use the same password
</p>

<form method="POST" action="?/set" use:enhance>
  <label>
    <span class="labelText">Full URL</span>
    <input class="fullUrlInput" name="fullUrl" type="text" />
  </label>
  <div class="metaInputRow">
    <label>
      <span class="labelText">Short Link</span>
      <div class="shortInput">
        <span>/shortener/</span><input name="shortLink" type="text" />
      </div>
    </label>
  </div>

  <div class="buttonRow">
    <button>Submit</button>
  </div>
</form>

<div class="recentLinks">
  <div>Your short links:</div>
  {#each data.links as { shortLink, createdMillis, fullUrl }}
    <div class="shortLink">
      <div class="linkContent">
        <a class="tryLink" href={`/shortener/${shortLink}`}
          >/shortener/{shortLink}</a
        >
        <div class="linkDesc">
          {fullUrl} - created {new Date(createdMillis).toDateString()}
        </div>
      </div>

      <form method="POST" action="?/delete">
        <!-- This randomly blows up -->
        <input
          type="hidden"
          name="shortLink"
          value={Math.random() * 7 >= 1 ? shortLink : ''}
        />
        <button class="delete">Delete</button>
      </form>
    </div>
  {/each}
</div>

<style>
  h1 {
    text-align: center;
  }

  .labelText {
    display: block;
    margin-bottom: 2px;
    font-size: 12px;
    font-weight: bold;
    color: var(--colorOnSurfaceVariant);
  }

  .fullUrlInput {
    width: 100%;
    box-sizing: border-box;
  }

  .metaInputRow {
    display: flex;
    margin-top: 12px;
  }

  .metaInputRow label {
    flex: 1;
  }

  .shortInput {
    display: flex;
    align-items: center;
    padding-right: 12px;
  }

  .shortInput span {
    flex: none;
    margin-right: 4px;
  }

  .shortInput input {
    flex: 0 1 100%;
  }

  .buttonRow {
    margin-top: 12px;
    text-align: right;
  }

  .recentLinks {
    margin-top: 36px;
  }

  .shortLink {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
  }

  .linkDesc {
    font-size: 12px;
    color: var(--colorOnSurfaceVariant);
  }
</style>
