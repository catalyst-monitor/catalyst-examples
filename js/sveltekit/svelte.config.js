import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // This example uses @sveltejs/adapter-node because the example stores data
    // in memory, which isn't great in a serverless environment.
    //
    // In the real world, Catalyst works great with other adapters
    // like @sveltejs/adapter-vercel.
    adapter: adapter(),
  },
}

export default config
