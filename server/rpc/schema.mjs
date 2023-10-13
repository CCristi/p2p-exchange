import {z} from "zod";

export const rpcSchema = z.object({
	method: z.enum(['buy', 'sell', 'pull_updates']),
	params: z.any(),
}).refine((data) => {
	const nestedSchema = {
		buy: z.object({
			price: z.number(),
			quantity: z.number()
		}),
		sell: z.object({
			price: z.number(),
			quantity: z.number()
		}),
		pull_updates: z.object({
			cursor: z.string().or(z.null()).optional()
		}),
	}

	if (!nestedSchema[data.method]) {
		return false;
	}

	return nestedSchema[data.method].safeParse(data.params).success
})
