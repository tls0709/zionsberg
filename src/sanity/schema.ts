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
          { title: 'Notice', value: 'Notice' },
          { title: 'News', value: 'News' },
          { title: 'Gallery', value: 'Gallery' },
          { title: 'Guestbook', value: 'Guestbook' },
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

export const notice = defineType({
  name: 'notice',
  title: 'Notice & News (새소식/공지사항)',
  type: 'document',
  fields: [
    defineField({
      name: 'noticeType',
      title: 'Type (종류)',
      type: 'string',
      options: {
        list: [
          { title: 'Notice (공지)', value: 'notice' },
          { title: 'News (새소식)', value: 'news' }
        ],
      },
      initialValue: 'notice',
    }),
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
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
  ],
});

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery (포토갤러리)',
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
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
  ],
});


export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry (문의사항)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email().required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
});

export const schema = {
  types: [post, notice, gallery, inquiry],
};
