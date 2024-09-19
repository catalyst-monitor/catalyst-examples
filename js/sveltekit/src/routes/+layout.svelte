<script lang="ts">
  import './styles.css'
  import logo from '$lib/images/catalyst.svg'
  import Catalyst from '@catalyst-monitor/sveltekit/Catalyst.svelte'
  import { Catalyst as CatalystSveltkit } from '@catalyst-monitor/sveltekit/client'
  import { browser } from '$app/environment'

  export let data
  $: if (browser) {
    CatalystSveltkit.getReporter().setUserInfo(
      data.user != null
        ? { loggedInUserName: data.user.name, loggedInId: data.user.id }
        : null
    )
  }
</script>

<Catalyst />
<div class="app">
  <header>
    <a href="/"><img class="logo" src={logo} alt="Logo of Catalyst" /></a>
    <a class="widget" href="/shortener">Link Shortener</a>
    <a class="widget" href="/todo">To Do</a>
    <div class="spacer" />
    {#if data.user != null}
      <span class="loggedInUser">Logged in as: {data.user.name}</span>
    {/if}
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>
      Learn more about <a href="https://www.catalystmonitor.com">Catalyst</a>
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    padding: 24px;
    box-shadow: 0 0 7px -5px #000;
  }

  header .logo {
    width: 125px;
    margin-right: 24px;
    flex: none;
  }

  header .widget {
    margin-left: 12px;
    font-size: 18px;
    flex: none;
  }

  .spacer {
    flex: 0 1 100%;
  }

  .loggedInUser {
    flex: none;
  }

  main {
    flex: 1;
    padding: 72px 0 0;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }
</style>
