import { Budget } from '../../domain/Budget.js'
import { BudgetDto } from '../../domain/BudgetDto.js'
import { BUDGET_STATE } from '../../domain/BudgetState.enum.js'
import type { IBudgetRepository } from '../../domain/interfaces/IBudgetRepository.js'
import { BudgetAmount } from '../../domain/object_values/BudgetAmount.js'
import { BudgetCreatedAt } from '../../domain/object_values/BudgetCreatedAt.js'
import { BudgetDtoAmount } from '../../domain/object_values/BudgetDtoAmount.js'
import { BudgetDtoCreatedAt } from '../../domain/object_values/BudgetDtoCreatedAt.js'
import { BudgetDtoId } from '../../domain/object_values/BudgetDtoId.js'
import { BudgetDtoState } from '../../domain/object_values/BudgetDtoState.js'
import { BudgetId } from '../../domain/object_values/BudgetId.js'
import { BudgetState } from '../../domain/object_values/BudgetState.js'

export class BudgetAdd {
  private readonly _budgetRepository: IBudgetRepository

  constructor(budgetRepository: IBudgetRepository) {
    this._budgetRepository = budgetRepository
  }

  async Run(id: number, amount: number, state: string, createdAt: string): Promise<BudgetDto> {
    const budgetDto: BudgetDto = new BudgetDto(
      new BudgetDtoId(id),
      new BudgetDtoAmount(amount),
      new BudgetDtoState(state),
      new BudgetDtoCreatedAt(createdAt),
    )

    const stateEnum: BUDGET_STATE =
      budgetDto.state.value === 'actived' ? BUDGET_STATE.ACTIVED : BUDGET_STATE.DESACTIVED

    const budget: Budget | null = await this._budgetRepository.Add(
      new Budget(
        new BudgetId(budgetDto.id.value),
        new BudgetAmount(budgetDto.amount.value),
        new BudgetState(stateEnum),
        new BudgetCreatedAt(new Date(budgetDto.createdAt.value)),
      ),
    )

    if (!budget) throw new Error('Error adding budget')

    return budgetDto
  }
}
