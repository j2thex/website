import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const endpoint = process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT || 'https://yellow.prismic.io/api/v2'
export const repositoryName = prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    default:
      return null
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
