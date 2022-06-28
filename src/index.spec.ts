// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { CoffeeMachineInput, enhanceCoffeeOrder, UserInput } from ".";

expect.extend(matchers);
describe("Coffee machine user interface", () => {
  it("Should be able to correctly give instruction for a drink without sugar (and therefore without stick)", () => {
    const userInput: UserInput = {
      drink: "tea",
      sugarQuantity: 0,
    };

    const expectedMachineInput: CoffeeMachineInput = {
      drink: "tea",
      stickOption: "no stick",
      sugarQuantity: 0,
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual(expectedMachineInput);
  });

  it("Should be able to correctly give instruction for a drink with one sugar (and therefore with a stick)", () => {
    const userInput: UserInput = {
      drink: "coffee",
      sugarQuantity: 1,
    };

    const expectedMachineInput: CoffeeMachineInput = {
      drink: "coffee",
      stickOption: "with stick",
      sugarQuantity: 1,
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual(expectedMachineInput);
  });
});
