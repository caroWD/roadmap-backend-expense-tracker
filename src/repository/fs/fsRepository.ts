import { writeFile, access, constants } from 'node:fs/promises'
import { URL } from 'node:url'

const categoriesDefault = [
  {
    id: 1,
    name: 'food',
    description: 'Grocery shopping, meals, home delivery.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 2,
    name: 'home',
    description: 'Bills, household purchases, rent.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 3,
    name: 'health and wellness',
    description: "Medication, doctor's appointments, gym membership.",
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 4,
    name: 'transportation',
    description: 'Gasoline, public transportation, ride-hailing apps.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 5,
    name: 'entertainment',
    description: 'Movies, subscriptions, leisure activities.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 6,
    name: 'fashion',
    description: 'Clothing, accessories.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 7,
    name: 'technology',
    description: 'Gadgets, apps, repairs.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 8,
    name: 'education',
    description: 'Courses, schools, materials.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 9,
    name: 'travel',
    description: 'Tickets, accommodation, tourist activities.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 10,
    name: 'pets',
    description: 'Food, vet.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 11,
    name: 'taxes and insurance',
    description: 'Tax payments, life or car insurance.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 12,
    name: 'my business',
    description: 'Expenses related to your business.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
  {
    id: 13,
    name: 'others',
    description: 'Miscellaneous expenses not classified elsewhere.',
    createdAt: '2025-12-24T04:18:17.441Z',
  },
]

const createFSRepository = async () => {
  try {
    const directoryURL: URL = new URL('./', import.meta.url)

    console.log(directoryURL.pathname)

    await access(directoryURL.pathname, constants.W_OK | constants.W_OK)

    const fileURL: URL = new URL('./category.json', import.meta.url)

    console.log(fileURL.pathname)

    await writeFile(fileURL.pathname, JSON.stringify(categoriesDefault), { encoding: 'utf-8' })

    await access(fileURL.pathname, constants.R_OK | constants.W_OK)
  } catch (error) {
    console.error(error)
  }
}

createFSRepository()
