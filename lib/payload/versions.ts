export const autosaveDrafts = {
  autosave: {
    interval: 5000,
    showSaveDraftButton: true
  },
  validate: false
}

export const collectionVersions = {
  drafts: autosaveDrafts,
  maxPerDoc: 50
}

export const globalVersions = {
  drafts: autosaveDrafts,
  max: 50
}
