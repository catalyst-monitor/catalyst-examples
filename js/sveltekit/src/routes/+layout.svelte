<script>
  import './styles.css'
  import logo from '$lib/images/catalyst.svg'
</script>

<div class="app">
  <header>
    <a href="/"><img class="logo" src={logo} alt="Logo of Catalyst" /></a>
    <a class="widget" href="/shortener">Link Shortener</a>
    <a class="widget" href="/todo">To Do</a>
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
    padding: 12px;
    box-shadow: 0 0 7px -5px #000;
  }

  header .logo {
    width: 200px;
    margin-right: 24px;
  }

  header .widget {
    margin-left: 12px;
    font-size: 18px;
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
