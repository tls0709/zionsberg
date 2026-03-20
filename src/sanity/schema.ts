import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Korean (한국어)', value: 'ko' },
          { title: 'English', value: 'en' },
          { title: 'German (Deutsch)', value: 'de' }
        ],
      },
      initialValue: 'ko',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcement', value: 'Announcement' },
          { title: 'Program', value: 'Program' },
          { title: 'Journal', value: 'Journal' },
          { title: 'Philosophy', value: 'Philosophy' }
        ],
      },
      initialValue: 'Journal'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' }, 
        { type: 'image', options: { hotspot: true } },
        { 
          type: 'file', 
          title: 'Document / Media File',
          options: { storeOriginalFilename: true },
          fields: [
            { name: 'description', type: 'string', title: 'File Description' }
          ]
        }
      ],
    }),
  ],
});

export const schema = {
  types: [post],
};
