This is an example of a [Next.js](https://nextjs.org/) project running [Catalyst](https://www.catalystmonitor.com). Please see the other examples for other frameworks.

## Setting up for your own project.

To set up Catalyst for your own project, you just need to do the following:

1. Update your [next.config.mjs](next.config.mjs) as shown. Wrap your existing Next config, and Catalyst will auto-instrument itself.
1. Render the `CatalystInstaller` component. It's recommended to render it as soon as possible in the [root layout](app/layout.tsx).

## Running the example

1. If you haven't already, sign up for Catalyst at [app.catalystmonitor.com](https://app.catalystmonitor.com), and get your public and private keys from the "Settings" page.
2. Copy catalyst.example.mjs as catalyst.mjs
   
   ```bash
   cp catalyst.example.mjs catalyst.mjs
   ```

3. Update your new catalyst.mjs file with your public and private keys.

4. Run the development server:

   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

You can also see the more detailed [documentation](https://docs.catalystmonitor.com).