import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email is not in correct format')
    .min(5, 'Length must be from 5 - 160 characters')
    .max(160, 'Length must be from 5 - 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Length must have 6 - 160 characters')
    .max(160, 'Length must have 6 - 160 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  // price_min: yup.string().test({
  //   name: 'price-not-allowed',
  //   message: 'Giá không phù hợp',
  //   test: testPriceMinMax
  // }),
  // price_max: yup.string().test({
  //   name: 'price-not-allowed',
  //   message: 'Giá không phù hợp',
  //   test: testPriceMinMax
  // }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})
export type Schema = yup.InferType<typeof schema>

export const userSchema = yup.object({
  businessName: yup.string().max(160, 'Max length is 160 characters!'),
  fullName: yup.string().max(160, 'Max length is 160 characters!'),
  phoneNumber: yup.string().max(20, 'Max length is 20 characters!'),
  country: yup.string().max(50, 'Max length is 50 characters!'),
  city: yup.string().max(50, 'Max length is 50 characters!'),
  province: yup.string().max(50, 'Max length is 50 characters!'),
  district: yup.string().max(50, 'Max length is 50 characters!'),
  ward: yup.string().max(50, 'Max length is 50 characters!'),
  addressDetail: yup.string().max(160, 'Max length is 160 characters!'),
  zipCode: yup.string().max(20, 'Max length is 20 characters!'),
  profilePicture: yup.string().max(1000, 'Max length is 1000 characters!'),
  // date_of_birth: yup.date().max(new Date(), 'Please select a date in the past!'),
  email: schema.fields['email'],
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPasswordYup('password')
})

export type UserSchema = yup.InferType<typeof userSchema>

// Store
export const storeSchema = yup.object({
  storeName: yup
    .string()
    .required('Store name is required')
    .matches(/^[A-Za-z][A-Za-z0-9_ ]*$/, "Store name can't start with number or special character!")
    .min(5, 'Min length is 5 characters!')
    .max(160, 'Max length is 160 characters!'),
  storeDescription: yup
    .string()
    .required('Description is required')
    .min(20, 'Min length is 20 characters!')
    .max(160, 'Max length is 160 characters!'),
  logo: yup.string().max(1000, 'Max length is 1000 characters!'),
  acceptTerm: yup.boolean().required('Accept our Terms of Service to create store!')
})
export type StoreSchema = yup.InferType<typeof storeSchema>

// Purchase
export const purchaseSchema = yup.object({
  fullName: yup.string().required('Full name is required').max(160, 'Max length is 160 characters!'),
  phoneNumber: yup.string().required('Phone number is required').max(20, 'Max length is 20 characters!'),
  country: yup.string().required('Country is required').max(50, 'Max length is 50 characters!'),
  province: yup.string().required('Province name is required').max(50, 'Max length is 50 characters!'),
  district: yup.string().required('District name is required').max(50, 'Max length is 50 characters!'),
  ward: yup.string().required('Ward name is required').max(50, 'Max length is 50 characters!'),
  addressDetail: yup.string().required('Address detail is required').max(160, 'Max length is 160 characters!')
})

export type PurchaseSchema = yup.InferType<typeof purchaseSchema>

// Product
export const productSchema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup
    .string()
    // .required('Description is required')
    .min(10, 'Min length is 10 characters!')
    .max(1000, 'Max length is 1000 characters!'),
  details: yup
    .string()
    // .required('Description is required')
    .min(10, 'Min length is 10 characters!')
    .max(1000, 'Max length is 1000 characters!'),
  status: yup.array(),
  storeIds: yup.array().required().min(1, 'Select at least one store!')
})
export type ProductSchema = yup.InferType<typeof productSchema>
