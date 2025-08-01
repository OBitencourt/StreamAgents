import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { desc, eq /* nq */ } from 'drizzle-orm'

import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'


export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms/:roomId/questions', {
        schema: {
            params: z.object({
                roomId: z.string()
            })
        }
    }, async (request, reply) => {
        const { roomId } = request.params
        
        const results = await db
            .select({
                id: schema.questions.id,
                question: schema.questions.question,
                answer: schema.questions.answer,
                createdAt: schema.questions.createdAt
            })
            .from(schema.questions)
            .where(eq(schema.questions.roomId, roomId))
            .orderBy(desc(schema.questions.createdAt))

        return results
    })
}
