import vine from '@vinejs/vine'

export const idParamValidator = vine.compile(
    vine.object({
        id: vine.string().uuid()
    })
)

export const activeQueryValidator = vine.compile(
    vine.object({
        active: vine.boolean().optional(),
        description: vine.string().optional(),
    })
);
