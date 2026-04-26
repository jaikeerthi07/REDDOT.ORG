if (import.meta.env.DEV) {
  Promise.all([
    import('@theatre/studio'),
    import('@theatre/r3f/dist/extension')
  ]).then(([studio, extension]) => {
    studio.default.initialize()
    studio.default.extend(extension.default)
  })
}
