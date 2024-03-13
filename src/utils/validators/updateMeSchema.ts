import * as yup from "yup";
yup.addMethod(yup.object, "atLeastOneOf", function (list) {
  return this.test({
    name: "atLeastOneOf",
    message: "${path} must have at least one of these keys: ${keys}",
    exclusive: true,
    params: { keys: list.join(", ") },
    test: (value) => value == null || list.some((f: any) => !!value[f]),
  });
});
export const updateMeSchema = yup
  .object()
  .shape({
    firstName: yup.string(),
    lastName: yup.string(),
    birthday: yup.date(),
  })
  //@ts-ignore
  .atLeastOneOf(["firstName", "lastName", "birthday"]);
