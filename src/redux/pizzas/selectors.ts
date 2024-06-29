import { RootState } from '../store'

export const selectPizzas = (state: RootState) => state.pizzas
export const selectPizzaById = (state: RootState) => state.pizzas.pizza