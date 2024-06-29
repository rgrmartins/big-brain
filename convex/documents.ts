import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'


// Convex storage
export const generateUploadUrl = mutation(async (ctx) => {
  console.log('Test >>>>')
  return await ctx.storage.generateUploadUrl()
})

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      return []
    }

    // Return only documents that belong to the current user
    return await ctx.db.query('documents')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', userId)).collect()
  }

})

export const getDocument = query({
  args: {
    documentId: v.string()
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not Authorized')
    }

    // const document = await ctx.db.get('documents', args.documentId)

    // if (document?.tokenIdentifier !== userId) {
    //   throw new ConvexError('Not Authorized')
    // }

    return document
  }
})

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.string()
  },
  async handler(ctx, args) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not Authorized')
    }

    await ctx.db.insert('documents', {
      title: args.title,
      fileId: args.fileId,
      tokenIdentifier: userId
    })
  }
})