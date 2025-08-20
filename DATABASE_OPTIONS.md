# Free Database Options for GFMTF Website

## Option 1: Neon (PostgreSQL) - RECOMMENDED
- **Free Tier**: 3GB storage, 1 compute hour/day
- **Pros**: Serverless PostgreSQL, scales to zero, easy migration from Supabase
- **Setup**: Very similar to Supabase
- Website: https://neon.tech

## Option 2: PlanetScale (MySQL)
- **Free Tier**: 5GB storage, 1 billion row reads/month
- **Pros**: Serverless MySQL, great performance
- **Setup**: Different syntax than PostgreSQL but easy to adapt
- Website: https://planetscale.com

## Option 3: MongoDB Atlas
- **Free Tier**: 512MB storage
- **Pros**: NoSQL, flexible schema
- **Setup**: Different from SQL but good for media/documents
- Website: https://www.mongodb.com/atlas

## Option 4: Turso (SQLite)
- **Free Tier**: 8GB total storage, 500 databases
- **Pros**: Edge database, super fast, SQLite compatible
- Website: https://turso.tech

## Option 5: Create New Supabase Account
- Use a different email to create a new free Supabase project
- **Free Tier**: 500MB database, unlimited API requests

## For Your Use Case (Videos + Users):
I recommend **Neon** because:
1. PostgreSQL (same as Supabase) - no code changes needed
2. 3GB free storage (6x more than Supabase free)
3. Works perfectly with Prisma ORM
4. Can still use Supabase Auth separately if needed