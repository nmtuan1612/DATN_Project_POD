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
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
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

export const userSchema = yup.object({
  businessName: yup.string().max(160, 'Max length is 160 characters!'),
  fullName: yup.string().max(160, 'Max length is 160 characters!'),
  phoneNumber: yup.string().max(20, 'Max length is 20 characters!'),
  country: yup.string().max(50, 'Max length is 50 characters!'),
  city: yup.string().max(50, 'Max length is 50 characters!'),
  province: yup.string().max(50, 'Max length is 50 characters!'),
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

export type Schema = yup.InferType<typeof schema>
