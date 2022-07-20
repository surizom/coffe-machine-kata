// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { EnhancedDrinkOrder, enhanceCoffeeOrder, UserInput } from ".";

expect.extend(matchers);
describe("Coffee machine user interface", () => {
  it("Should be able to correctly give instruction for a drink without sugar (and therefore without stick)", () => {
    const userInput: UserInput = {
      input: {
        drink: "tea",
        sugarQuantity: 0,
      },
      money: { cents: 40 },
    };

    const expectedMachineInput: EnhancedDrinkOrder = {
      drink: "tea",
      stickOption: "no stick",
      sugarQuantity: 0,
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual(expectedMachineInput);
  });

  it("Should be able to correctly give instruction for a drink with one sugar (and therefore with a stick)", () => {
    const userInput: UserInput = {
      input: {
        drink: "coffee",
        sugarQuantity: 1,
      },
      money: { cents: 60 },
    };

    const expectedMachineInput: EnhancedDrinkOrder = {
      drink: "coffee",
      stickOption: "with stick",
      sugarQuantity: 1,
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual(expectedMachineInput);
  });

  it("Should give instruction to display error message to the machine if no money is given (case no balance)", () => {
    const userInput: UserInput = {
      input: {
        drink: "coffee",
        sugarQuantity: 0,
      },
      money: { cents: 0 },
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual({ errorMessage: "Insufficient balance: 0.6 € missing" });
  });

  it("Should give instruction to display error message to the machine if no money is given (case insufficient balance)", () => {
    const userInput: UserInput = {
      input: {
        drink: "coffee",
        sugarQuantity: 0,
      },
      money: { cents: 40 },
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual({ errorMessage: "Insufficient balance: 0.2 € missing" });
  });

  it("Should give instruction to display error message to the machine if no money is given (case insufficient balance)", () => {
    const userInput: UserInput = {
      input: {
        drink: "tea",
        sugarQuantity: 1,
      },
      money: { cents: 30 },
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual({ errorMessage: "Insufficient balance: 0.1 € missing" });
  });

  it("Should give instruction to display error message to the machine if no money is given (case insufficient balance)", () => {
    const userInput: UserInput = {
      input: {
        drink: "chocolate",
        sugarQuantity: 1,
      },
      money: { cents: 30 },
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual({ errorMessage: "Insufficient balance: 0.2 € missing" });
  });

  it("Should give correctly give instructions if too much money is given", () => {
    const userInput: UserInput = {
      input: {
        drink: "tea",
        sugarQuantity: 0,
      },
      money: { cents: 800 },
    };

    const expectedMachineInput: EnhancedDrinkOrder = {
      drink: "tea",
      stickOption: "no stick",
      sugarQuantity: 0,
    };

    expect(enhanceCoffeeOrder(userInput)).toEqual(expectedMachineInput);
  });
});
