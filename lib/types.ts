export interface Job {
  id: string
  title: string
  company: string
  avatar?: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Freelance"
  category: string
  salary: string
  description: string
  postedAt: string
  tags: string[]
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  applyUrl?: string
  companyDescription?: string
}
