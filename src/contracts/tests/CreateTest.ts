import yup from 'yup';

export default yup.object({
  name: yup.string().required(),
  lang: yup.string().required(),
  companyId: yup.string().required(),
  // respondentId: yup.string().required(),
});
