export type Drink = "tea" | "chocolate" | "coffee";

export type NoSugar = 0;
export type WithSugar = 1 | 2;

export type SugarQuantity = 0 | 1 | 2;

export type StickOption = "with stick" | "no stick";

export type UserInput = { drink: Drink; sugarQuantity: SugarQuantity };

export type CoffeeMachineInput =
  | { drink: Drink; sugarQuantity: NoSugar; stickOption: "no stick" }
  | { drink: Drink; sugarQuantity: WithSugar; stickOption: "with stick" };

export const enhanceCoffeeOrder = ({ drink, sugarQuantity }: UserInput): CoffeeMachineInput => {
  if (sugarQuantity === 0) {
    return {
      drink,
      sugarQuantity,
      stickOption: "no stick",
    };
  }

  return {
    drink,
    sugarQuantity,
    stickOption: "with stick",
  };
};
