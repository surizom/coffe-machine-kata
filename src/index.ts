export type ColdDrink = "orange juice";

export type HotDrink = "tea" | "chocolate" | "coffee";

export type Drink = ColdDrink | HotDrink;

export type SugarableDrink = "tea" | "chocolate" | "coffee";

export type NonSugarableDrink = "orange juice";

export type NoSugar = 0;

export type WithSugar = 1 | 2;

export type SugarQuantity = 0 | 1 | 2;

export type StickOption = "with stick" | "no stick";

export type UserOrder<DrinkType> = { drink: DrinkType; sugarQuantity: SugarQuantity };

export type UserInput<DrinkType> = { input: UserOrder<DrinkType>; money: { cents: number } };

export type DrinkOrderError = { errorMessage: string };

export type NoSugarOption = { sugarQuantity: NoSugar; stickOption: "no stick" };

export type SugarOptions<DrinkType extends Drink> = DrinkType extends SugarableDrink
  ? { sugarQuantity: WithSugar; stickOption: "with stick" }
  : { sugarQuantity: NoSugar; stickOption: "no stick" };

export type EnhancedDrinkOrder<DrinkType extends Drink> = { drink: DrinkType } & SugarOptions<DrinkType>;

const DRINKS_PRICES_CENTS: Record<Drink, number> = {
  coffee: 60,
  tea: 40,
  chocolate: 50,
};

export const enhanceCoffeeOrder = <DrinkType extends Drink>({
  input: { drink, sugarQuantity },
  money,
}: UserInput<DrinkType>): EnhancedDrinkOrder<DrinkType> | DrinkOrderError => {
  const price = DRINKS_PRICES_CENTS[drink];

  if (money.cents < price) {
    return { errorMessage: `Insufficient balance: ${(price - money.cents) / 100} € missing` };
  }

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
