export default async (a, b) => {
  await a.getByRole("button", { name: "Claim" }).first().click();
  await a.waitForTimeout(900);
  await b.getByRole("button", { name: "Claim" }).nth(1).click();
  await b.waitForTimeout(900);
  await a.getByRole("button", { name: "Release" }).click();
  await a.waitForTimeout(500);
  await b.getByRole("button", { name: "Claim" }).first().click();
  await b.waitForTimeout(2200);
};
