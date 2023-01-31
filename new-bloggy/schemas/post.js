const getPosition = (options) => {
  if(navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }
}

import {defineField, defineType} from 'sanity'
import { resolve } from 'styled-jsx/css'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  initialValue: async () => ({
    postedAt: await getPosition()
        .then(({coords}) => {
            const { latitude, longitude, altitude } = coords

            return {
                _type: 'geopoint',
                lat: latitude,
                lng: longitude,
                alt: altitude || undefined
            }
        })
        .catch(() => undefined)
}),
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'postedAt',
      title: 'Location',
      type: 'geopoint',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
