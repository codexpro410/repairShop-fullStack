import { createSafeActionClient } from 'next-safe-action'
import * as Sentry from '@sentry/nextjs'
import { z } from 'zod'
import type { NeonDbError } from '@neondatabase/serverless'

export const actionClient = createSafeActionClient({
    defineMetadataSchema(){
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils){
        // console.log(e.constructor.name) // NeonDbError so he take it and put it in condition was "DatabaseError"
        const { clientInput, metadata } = utils

        if (e.constructor.name === 'NeonDbError'){
            const { code, detail } = e as NeonDbError;
            if (code === '23505') {
                return `Unique entry required. ${detail}.`;
            }
            return "Database Error: Your data did not save, Support will be notified."
        }

        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext('serverError', { message: e.message })
            scope.setContext('metadata', { actionName: metadata?.actionName })
            scope.setContext('clientInput', { clientInput })
            return scope
        })
        if (e.constructor.name === 'NeonDbError'){ {
            return "Database Error: Your data did not save, Support will be notified."
        }
        // return DEFAULT_ERROR_MESSAGE
    }
    return e.message
    }
})