# play-with-swc-relay-plugin

Webpack v5 + SWC(swc-loader) + Relay(via '@swc/plugin-relay') + React example.

## Environments

### OS

- macOS Big Sur v11.6 (Intel iMac)
- Node.js 16.14.2

### Package versions

- swc-loader: 0.2.3
- @swc/plugin-relay: 1.2.5
- @swc/core: 1.2.237

## ~~Details of Error~~ already Fixed

In the initial development I faced following issue.
Issue fixed by updating "@swc/core" from "1.2.215" to "1.2.237". yay :tada:

[plugin-relay crashes with 'Error while importing "env"."__get_transform_plugin_config": unknown import.' · Issue #75 · swc-project/plugins](https://github.com/swc-project/plugins/issues/75)

> Caused by:
>    0: Failed to create plugin instance
>    1: Error while importing "env"."__get_transform_plugin_config": unknown import. Expected Function(FunctionType { params: [I32], results: [I32] })

### Steps to reproduce

1. `npm i` - Install dependencies
2. `npm run dev` or `npm run build` - Try transpile with SWC & plugin-relay enabled.
