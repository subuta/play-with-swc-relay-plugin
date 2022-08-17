# swc-relay-plugin-issue

## Error

> Caused by:
>    0: Failed to create plugin instance
>    1: Error while importing "env"."__get_transform_plugin_config": unknown import. Expected Function(FunctionType { params: [I32], results: [I32] })

## Steps to reproduce

1. `npm i` - Install dependencies
2. `npm run dev` or `npm run build` - Try transpile with SWC & plugin-relay enabled.

## Environments

### OS

- macOS Big Sur v11.6 (Intel iMac)
- Node.js 16.14.2

### Package versions

- @swc/core: 1.2.215
- @swc/plugin-relay: 1.2.5
