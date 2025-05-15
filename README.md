Simple UI to keep track of tasks. Each task has a name, a description, a due date, and a probability. Note the probability is itself editable, but also may change when the description is updated to include 'easy' or 'hard'.

This is a ~300loc [RedwoodSDK](https://docs.rwsdk.com/) project, using [tailwindcss](https://tailwindcss.com/) for styling and [mockapi.io](https://mockapi.io/) for data storage.

```shell
yarn # install dependencies
echo REMOTE_RESOURCES_PATH=$ask_for_this > .dev.vars # you should have received this value. If not, please ask for it
npx wrangler types # recompute types
yarn dev # run it locally
```

## Challenge

Fork the project, implement these four tasks. Feel free to add any dependency and to use any tool, including AI. Just make it work well, then we'll discuss the implementation. Do not spend more than 4 hours on this.

1. Put the new task form in a modal dialog.
2. Make it remove tasks optimistically.
3. There's a bug with the due date - find it and fix it.
4. The autosave-as-you-type has a bug - find it and fix it (keep autosave-as-you-type, and keep showing updated probabillity when description is changed).
