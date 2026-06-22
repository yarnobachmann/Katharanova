import type { Access } from 'payload'

export const admins: Access = ({ req }) => Boolean(req.user)

export const publishedOrAdmin: Access = ({ req }) => {
  if (req.user) return true

  return {
    _status: {
      equals: 'published'
    }
  }
}
