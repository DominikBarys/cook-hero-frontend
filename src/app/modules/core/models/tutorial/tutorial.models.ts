export interface Dish {
  name: string;
  shortId: string;
}

export interface Ingredient {
  name: string;
  shortId: string;
}

export interface Category {
  name: string;
  shortId: string;
}

export interface Author {
  username: string;
  uuid: string;
}

export interface Tutorial {
  name: string;
  shortId: string;
  timeToPrepare: number;
  difficulty: number;
  creationDate: string;
  imageUrls: string[];
  shortDescription: string;
  parameters: string;
  dishDTO: Dish;
  mainIngredientsDTOS: Ingredient[];
  categoryDTO: Category;
  authorDTO: Author;
  hasMeat: boolean;
  isVeganRecipe: boolean;
  isSweetRecipe: boolean;
  isSpicyRecipe: boolean;
}

export interface SimpleTutorial {
  name: string;
  shortId: string;
  timeToPrepare: number;
  difficulty: number;
  imageUrl: string;
  shortDescription: string;
  hasMeat: boolean;
  isVeganRecipe: boolean;
  isSweetRecipe: boolean;
  isSpicyRecipe: boolean;
}

export interface GetTutorialResponse {
  tutorials: SimpleTutorial[];
  totalCount: number;
}
