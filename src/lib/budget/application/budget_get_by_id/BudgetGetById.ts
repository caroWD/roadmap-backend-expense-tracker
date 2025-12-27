import type { Budget } from '../../domain/Budget.js'
import { BudgetDto } from '../../domain/BudgetDto.js'
import { BudgetNotFoundError } from '../../domain/errors/BudgetNotFoundError.js'
import type { IBudgetRepository } from '../../domain/interfaces/IBudgetRepository.js'
import { BudgetDtoAmount } from '../../domain/object_values/BudgetDtoAmount.js'
import { BudgetDtoCreatedAt } from '../../domain/object_values/BudgetDtoCreatedAt.js'
import { BudgetDtoId } from '../../domain/object_values/BudgetDtoId.js'
import { BudgetDtoState } from '../../domain/object_values/BudgetDtoState.js'
import { BudgetId } from '../../domain/object_values/BudgetId.js'

export class BudgetGetById {
  private readonly _budgetRepository: IBudgetRepository

  constructor(budgetRepository: IBudgetRepository) {
    this._budgetRepository = budgetRepository
  }

  async Run(id: number): Promise<BudgetDto> {
    const budget: Budget | null = await this._budgetRepository.GetById(new BudgetId(id))

    if (!budget) throw new BudgetNotFoundError('Budget not found')

    return new BudgetDto(
      new BudgetDtoId(budget.id.value),
      new BudgetDtoAmount(budget.amount.value),
      new BudgetDtoState(budget.state.value === 1 ? 'actived' : 'desactived'),
      new BudgetDtoCreatedAt(budget.createdAt.value.toLocaleDateString('en-CA')),
    )
  }
}
