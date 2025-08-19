import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import { users } from './schema'
import bcrypt from 'bcrypt'

async function seed() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })

    const db = drizzle(pool, { schema })

    await db.insert(users).values({
        firstName: 'Tendani',
        lastName: 'Masala',
        email: 'admin@homeserv.com',
        contact: '0763983284',
        hash: await bcrypt.hash('change-me', 10),
        role: 'admin',
    })

    await pool.end()
}

seed()
