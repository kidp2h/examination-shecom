# Examination Shecom Co., Ltd

## Description

- A simple and efficient room booking system designed to streamline the process of reserving rooms. This application allows users to view available rooms, make reservations, and manage their bookings with ease.

### Features

- User-friendly interface for browsing available rooms
- Booking creation and cancellation
- Admin dashboard for managing rooms and bookings
- Check detail a room
- Search room by address and date (check-in, check-out)


## Installation
### Local
- Clone repository
```bash
# With SSH
git clone git@github.com:kidp2h/examination-shecom.git
# With HTTPS
git clone https://github.com/kidp2h/examination-shecom.git

```
- Setup environment variables
```bash
cp .env.example .env

```

- Setup database
```bash
# With Docker 
docker-compose --env-file .env up -d
# Without Docker
# First option, using external service for database
# Second option, setup local database with PostgreSQL
```
- Install packages & set up Prisma ORM
```bash
# Install packages
pnpm install # (can use npm, pnpm to alternative)
# Generate Prisma ORM
pnpm prisma generate # (recommended)
pnpx prisma generate # (not recommended)
# Migrate database 
pnpm prisma migrate dev
pnpm prisma db push # (migrate directly by push db) - (all data should be cleared)
# Create seed data (as neccessary or can insert manually) - (can skip this step, not affect with progress set up)
node ./prisma/seed.js

```
- Build project
```bash
pnpm build # (recommended)
next build # (not recommended)
```
- Start application
```bash
pnpm dev # (for development)
pnpm start # (for production)
```

## Unit test 
```bash
# First option, separate 2 DB, one for development and one for test
cp .env.test.example .env.test
pnpm test
# Second option, using only 1 DB for test and development
dotenv -e .env -- jest --passWithNoTests --detectOpenHandles --forceExit
```
## Structure Project

- `[*`].ts  - parameter on url
- spec.ts - unit test
- pages.ts - page for app
- layout - layout for page or a group page

```
--  .
-- ├──  components.json 
-- ├──  docker-compose.yml             - Docker Compose for DB container
-- ├──  jest.config.ts                 - Config Jest
-- ├──  next-env.d.ts
-- ├──  next.config.mjs                - Config Next.JS
-- ├──  package.json
-- ├──  pnpm-lock.yaml
-- ├──  postcss.config.mjs
-- ├──  prisma                         - Config prisma, model, seed and migrate
-- │  ├──  migrations
-- │  │  ├──  20240830071259_init
-- │  │  │  └──  migration.sql
-- │  │  └──  migration_lock.toml
-- │  ├──  schema.prisma
-- │  └──  seed.js
-- ├──  README.md
-- ├──  src                            - Source code
-- │  ├──  app                         - Main folder pages for entire applications
-- │  │  ├──  (booking)                - Group pages without add segment on url (for user)
-- │  │  │  ├──  detail
-- │  │  │  │  └──  [id]               - parameter id on url for route
-- │  │  │  │     └──  page.tsx
-- │  │  │  ├──  layout.tsx
-- │  │  │  ├──  page.tsx
-- │  │  │  └──  payment
-- │  │  │     └──  [id]
-- │  │  │        └──  page.tsx
-- │  │  ├──  api                      - API for applications
-- │  │  │  ├──  bookings
-- │  │  │  │  ├──  [id]
-- │  │  │  │  │  ├──  route.spec.ts
-- │  │  │  │  │  └──  route.ts
-- │  │  │  │  ├──  route.spec.ts
-- │  │  │  │  └──  route.ts
-- │  │  │  ├──  rooms
-- │  │  │  │  ├──  [id]
-- │  │  │  │  │  ├──  route.spec.ts
-- │  │  │  │  │  └──  route.ts
-- │  │  │  │  ├──  route.spec.ts
-- │  │  │  │  └──  route.ts
-- │  │  │  └──  search
-- │  │  │     └──  rooms
-- │  │  │        └──  route.ts
-- │  │  ├──  globals.css
-- │  │  ├──  layout.tsx
-- │  │  └──  management               - Group page management (have segment) for admin
-- │  │     ├──  calendar
-- │  │     │  └──  page.tsx
-- │  │     ├──  dashboard
-- │  │     │  └──  page.tsx
-- │  │     └──  layout.tsx
-- │  ├──  components                  - components for app
-- │  │  ├──  ComboBox.tsx
-- │  │  ├──  DatePicker.tsx
-- │  │  ├──  DateRangePicker.tsx
-- │  │  ├──  detail                   - components for detail page
-- │  │  │  └──  DetailRoom.tsx
-- │  │  ├──  Header.tsx
-- │  │  ├── 󱂵 home                     - components for home (index) page
-- │  │  │  ├──  ListRoom.tsx
-- │  │  │  ├──  Search.tsx
-- │  │  │  └──  SearchBar.tsx
-- │  │  ├──  management               - components for group page management
-- │  │  │  └──  TableBooking.tsx
-- │  │  ├──  ModeToggle.tsx
-- │  │  ├──  payment                  - components for payment page
-- │  │  │  ├──  FormInformation.tsx
-- │  │  │  └──  PaymentBooking.tsx
-- │  │  ├──  ThemeProvider.tsx
-- │  │  └──  ui                       - UI generate of ShaCDN
-- │  │     ├──  badge.tsx
-- │  │     ├──  breadcrumb.tsx
-- │  │     ├──  button.tsx
-- │  │     ├──  calendar.tsx
-- │  │     ├──  card.tsx
-- │  │     ├──  command.tsx
-- │  │     ├──  dialog.tsx
-- │  │     ├──  dropdown-menu.tsx
-- │  │     ├──  form.tsx
-- │  │     ├──  input.tsx
-- │  │     ├──  label.tsx
-- │  │     ├──  popover.tsx
-- │  │     ├──  sheet.tsx
-- │  │     ├──  table.tsx
-- │  │     ├──  tabs.tsx
-- │  │     ├──  toast.tsx
-- │  │     ├──  toaster.tsx
-- │  │     ├──  tooltip.tsx
-- │  │     └──  use-toast.ts
-- │  ├──  lib                         - Library and utils for app
-- │  │  ├──  prisma.ts
-- │  │  ├──  utils.ts
-- │  │  └──  zod.ts
-- │  ├──  services                    - Services communicate with APIs
-- │  │  ├──  booking.ts
-- │  │  ├──  index.ts
-- │  │  └──  room.ts
-- │  └──  types                       - Types for app
-- │     └──  index.ts
-- ├──  tailwind.config.ts
-- └──  tsconfig.json
```

## API endpoints
- GET    /api/rooms - Get list rooms (entire)
- GET    /api/rooms/:id - Get specific room by id
- POST   /api/bookings - Create new booking
- GET    /api/bookings - Get bookings
- DELETE /api/bookings/:id - Delete specific booking by id
- GET    /api/search/rooms?location=XXXXX&check_in=XXXXXXX&check_out=XXXXXX - Search room

## Production version URL
- https://shecom-examination.nthinhdev.site

## Guide contribute
- Fork repository
- Clone repository from yours 
```bash
# With SSH
git clone git@github.com:USERNAME/examination-shecom.git
# With HTTPS
git clone https://github.com/USERNAME/examination-shecom.git
```
- Add feature

```bash
git add . 
```
- Commit
```bash
git commit -m "feat: new feat"
```
- Push
```bash
git push -u origin BRANCH_OF_YOUR_FEATURE
```
- Create pull request from your branch to my repository
- Waiting me for merging










