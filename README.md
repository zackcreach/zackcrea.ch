# zackcrea.ch

The production site is a reproducible Vite release hosted on Symphony behind Cloudflare.

Pushes containing GitHub-verified signed commits to `main` deploy through the protected `production` environment. The scheduled workflow reconciles the current `main` revision daily, and manual runs can deploy any signed revision reachable from `main` or retry a blocked revision.

Build the site locally with `npm ci && npm run build`. Build the production package with `nix build`, and validate its deployment definition with `nix flake check`.
