# Campus Event Planner

A modern, full-featured event management platform built for campus communities. Students discover and register for events, organizers manage registrations and collect feedback, and admins oversee the entire ecosystem.

## ✨ Features

### 🎓 For Students
- **Event Discovery** - Browse, search, and filter campus events by category
- **Registration** - One-click event registration with instant confirmation
- **Smart Reminders** - Automatic notifications 24 hours and 1 hour before events
- **Feedback System** - Rate events (organization, venue, timing, experience) and share comments
- **Incident Reporting** - Report issues (late start, venue problems) anonymously or with name
- **My Events** - Track all registered events in one place with upcoming/past tabs
- **Notifications** - Real-time alerts for announcements and reminders

### 📊 For Organizers
- **Event Management** - Create, edit, publish, and manage events
- **Task System** - Create tasks with deadlines and assign to team members
- **Participant Management** - View registered attendees and registration dates
- **Announcements** - Broadcast messages to all registrants
- **Feedback Dashboard** - View ratings, comments, and incident reports
- **Learning Insights** - Compare events, identify incident themes, see improvement areas
- **Reminder Management** - Trigger reminders manually or on schedule

### 🛡️ For Admins
- **Admin Panel** - Platform-wide statistics and insights
- **User Monitoring** - Track system activity and user trends
- **Incident Oversight** - Review and analyze incident patterns
- **Quality Control** - Monitor event quality and organizer performance

### 🎨 General Features
- **Beautiful UI** - Modern, responsive design with dark/light theme toggle
- **Mobile-First** - Fully responsive on phone, tablet, and desktop
- **Real-Time Updates** - Live notification badges and instant feedback
- **Privacy-Focused** - Anonymous feedback and incident reporting options
- **Authentication** - Secure login with JWT tokens and role-based access

## 🚀 Quick Start

1. **Install dependencies**: `npm install`
2. **Set up database**: `npx prisma migrate deploy`
3. **Seed test data**: `npm run db:seed`
4. **Start dev server**: `npm run dev`
5. **Open** http://localhost:3000

### Test Credentials
| Role | Email | Password |
|------|--------|----------|
| Student | student@campus.edu | password123 |
| Organizer | organizer@campus.edu | password123 |
| Admin | admin@campus.edu | password123 |

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── (auth)            # Authentication pages
│   ├── organizer/        # Organizer dashboard & management
│   ├── admin/            # Admin panel
│   ├── events/           # Event discovery & details
│   ├── notifications/    # Notification center
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── events/          # Event-related components
│   ├── layout/          # Layout components (Navbar, etc)
│   ├── ui/              # Base UI components (Button, Card, etc)
│   └── providers/       # Context providers
├── lib/                  # Utilities and helpers
│   ├── auth.ts          # JWT/session management
│   ├── prisma.ts        # Database client
│   └── validation/      # Zod schemas
└── prisma/              # Database schema & migrations
```

## 🏗️ Tech Stack

- **Framework**: Next.js 16.2 with React 19
- **Database**: SQLite with Prisma ORM
- **Auth**: JWT (jose) with bcryptjs
- **Styling**: Tailwind CSS 4 with custom components
- **Validation**: Zod schema validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Dates**: date-fns

## 📋 Database Schema

**Key Models:**
- **User** - Role-based (ADMIN, ORGANIZER, STUDENT)
- **Event** - Event details with organizer
- **Registration** - Student event signups
- **Task** - Event team tasks
- **Feedback** - Post-event ratings & comments
- **Incident** - Issue reports
- **Announcement** - Organizer announcements
- **Notification** - In-app alerts
- **ReminderLog** - Reminder delivery tracking

## 🔐 Security

- Password hashing with bcryptjs
- JWT-based session tokens (7-day expiration)
- Server-side authentication checks
- SQL injection prevention via Prisma
- CSRF protection via Next.js
- Role-based access control (RBAC)
- Anonymous incident reporting option

## 📱 Pages & Routes

### Public
- `/` - Homepage
- `/login` - Student/organizer login
- `/register` - Student signup  
- `/events` - Event discovery
- `/events/[id]` - Event details
- `/help` - Help & FAQ

### Student (Authenticated)
- `/my-events` - Registered events
- `/notifications` - Alerts center

### Organizer (Authenticated)
- `/organizer/events` - Event dashboard
- `/organizer/events/new` - Create event
- `/organizer/events/[id]/edit` - Event management
- `/organizer/events/[id]/tasks` - Task management
- `/organizer/events/[id]/participants` - Attendee list
- `/organizer/announcements` - Message history
- `/organizer/learning` - Insights & analytics

### Admin (Admin role only)
- `/admin` - System overview

## 🛠️ Available Scripts

```bash
npm run dev              # Start dev server (hot reload)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run db:seed          # Seed database with test data
npm run db:reset         # Reset database (dev only)
```

## 📖 Documentation

- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- **Database**: See [prisma/schema.prisma](./prisma/schema.prisma)
- **Environment**: See [.env](./.env) for config

## 🎯 Roadmap

### Completed ✅
- User authentication & authorization
- Event CRUD with publish/draft states
- Event discovery with search & filters
- Registration & unregistration
- Feedback submission & viewing
- Task management for organizers
- Announcements to registrants
- Incident reporting (anon/named)
- Notification system
- Automated reminders
- Organizer insights dashboard
- Admin panel

### In Progress 🔄
- CSV export for participant lists
- Email notifications (currently in-app only)
- Calendar view for events
- Advanced analytics

### Coming Soon 🚀
- QR code check-in for events
- Video tutorials for organizers
- Team collaboration features
- Multi-language support
- Calendar integrations
- API documentation

## 🤝 Contributing

See development guidelines in [CLAUDE.md](./CLAUDE.md)

## 📄 License

Private - Campus Event Planner

## 💬 Support

- Help Page: `/help`
- Email: support@campuseventplanner.edu
