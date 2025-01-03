const { describe } = require('pm2')
const { z, object } = require('zod')

const setCustomerInput = z.object({
  companyName: z.string(),
  companyType: z.string(),
  taxNumber: z.string(),
  taxOffice: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone: z.string(),
  sector: z.string(),
  workingLanguage: z.string(),
  customerStatus: z.string(),
  customerNotes: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  authorizedPerson: z
    .object({
      name: z.string(),
      phone: z.string(),
      email: z.string().email(),
    })
    .optional(),
})

const updateCustomerInput = z.object({
  customerId: z.string(),
  companyName: z.string().optional(),
  companyType: z.string().optional(),
  taxNumber: z.string().optional(),
  taxOffice: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  sector: z.string().optional(),
  workingLanguage: z.string().optional(),
  customerStatus: z.string().optional(),
  customerNotes: z.string().optional(),
  isActive: z.boolean().optional(),
  authorizedPerson: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
})

const deleteCustomerInput = z.object({
  customerId: z.string(),
})

const getCustomerInput = z.object({
  customerId: z.string().optional(),
})

const setAuthorizedPersonInput = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
})

const getAuthorizedPersonInput = z.object({
  authorizedPersonId: z.string().optional(),
})

const deleteAuthorizedPersonInput = z.object({
  authorizedPersonId: z.string(),
})

module.exports = {
  setCustomerInput,
  updateCustomerInput,
  deleteCustomerInput,
  getCustomerInput,
  setAuthorizedPersonInput,
  deleteAuthorizedPersonInput,
  getAuthorizedPersonInput,
}
