# Collectify

Collectify is a web application for managing personal collections of various items, such as books, stamps, whiskey, and more. Users can register, create and edit their collections, add new items, as well as leave comments and likes.

**Features:**

1. User Roles:

- Unauthenticated Users: Read-only access.
- Authenticated Users: Full access, excluding admin panel.
- Administrators: User management, viewing and editing all pages.
  
2. Pages:
   
- Personal page for managing collections.
- Collection page with a table of items, sorting, and filters.
- General homepage with the latest added items, biggest collections, and a tag cloud.

3. Entities:

- Collections with a name, description (markdown), theme, image, and customizable fields for items.
- Items with tags, likes, and customizable fields.

4. Additional Features:

- Full-text search with results as items and collections.
- Autocomplete for tags.
- User personal pages.
- Visual themes and language selection for each user.
  
5. Technologies:

- Frontend: React (JS)
- Backend: Ruby on Rails
- Use of Tailwind CSS for styling.
- Use of ORM (Sequelize, Prism, TypeORM).
- Support for two languages: English and Russian.
- Ability to choose light and dark interface themes.
