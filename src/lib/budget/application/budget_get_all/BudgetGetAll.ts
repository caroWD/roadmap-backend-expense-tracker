import type { Budget } from '../../domain/Budget.js'
import { BudgetDto } from '../../domain/BudgetDto.js'
import type { IBudgetRepository } from '../../domain/interfaces/IBudgetRepository.js'
import { BudgetDtoAmount } from '../../domain/object_values/BudgetDtoAmount.js'
import { BudgetDtoCreatedAt } from '../../domain/object_values/BudgetDtoCreatedAt.js'
import { BudgetDtoId } from '../../domain/object_values/BudgetDtoId.js'
import { BudgetDtoState } from '../../domain/object_values/BudgetDtoState.js'

export class BudgetGetAll {
  private readonly _budgetRepository: IBudgetRepository

  constructor(budgetRepository: IBudgetRepository) {
    this._budgetRepository = budgetRepository
  }

  async Run(): Promise<BudgetDto[]> {
    const budgets: Budget[] = await this._budgetRepository.GetAll()

    return budgets.map(
      (budget) =>
        new BudgetDto(
          new BudgetDtoId(budget.id.value),
          new BudgetDtoAmount(budget.amount.value),
          new BudgetDtoState(budget.state.value === 1 ? 'actived' : 'desactived'),
          new BudgetDtoCreatedAt(budget.createdAt.value.toLocaleDateString('en-CA')),
        ),
    )
  }
}
