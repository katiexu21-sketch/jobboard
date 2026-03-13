import { z } from "zod"

const MAX_SHORT_TEXT = 200
const MAX_LONG_TEXT = 5000
const MAX_ARRAY_ITEMS = 50

const sanitizeString = (val: string) =>
  val.replace(/[<>]/g, "").trim()

const shortText = z
  .string()
  .min(1, "Required")
  .max(MAX_SHORT_TEXT)
  .transform(sanitizeString)

const longText = z
  .string()
  .min(1, "Required")
  .max(MAX_LONG_TEXT)
  .transform(sanitizeString)

const textList = z
  .string()
  .max(MAX_LONG_TEXT)
  .transform((val) =>
    val
      .split("\n")
      .map((s) => s.replace(/[<>]/g, "").trim())
      .filter(Boolean)
  )
  .pipe(z.array(z.string()).min(1, "At least one item required").max(MAX_ARRAY_ITEMS))

export const postJobSchema = z.object({
  title: shortText,
  company: shortText,
  category: shortText,
  type: z.enum(["Full-time", "Part-time", "Contract", "Freelance"]),
  location: shortText,
  salary: shortText,
  description: longText,
  responsibilities: textList,
  requirements: textList,
  benefits: z
    .string()
    .max(MAX_LONG_TEXT)
    .transform((val) =>
      val
        .split("\n")
        .map((s) => s.replace(/[<>]/g, "").trim())
        .filter(Boolean)
    )
    .pipe(z.array(z.string()).max(MAX_ARRAY_ITEMS))
    .optional()
    .default(""),
  tags: z
    .string()
    .max(MAX_LONG_TEXT)
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.replace(/[<>]/g, "").trim())
        .filter(Boolean)
    )
    .pipe(z.array(z.string()).min(1, "At least one tag required").max(MAX_ARRAY_ITEMS)),
  companyDescription: z
    .string()
    .max(MAX_LONG_TEXT)
    .transform(sanitizeString)
    .optional()
    .default(""),
  email: z.string().email("Invalid email address").max(MAX_SHORT_TEXT),
})

export type PostJobInput = z.infer<typeof postJobSchema>
