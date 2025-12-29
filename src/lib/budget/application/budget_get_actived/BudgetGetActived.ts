import type { Budget } from '../../domain/Budget.js'
import { BudgetDto } from '../../domain/BudgetDto.js'
import type { IBudgetRepository } from '../../domain/interfaces/IBudgetRepository.js'
import { BudgetDtoAmount } from '../../domain/object_values/BudgetDtoAmount.js'
import { BudgetDtoCreatedAt } from '../../domain/object_values/BudgetDtoCreatedAt.js'
import { BudgetDtoId } from '../../domain/object_values/BudgetDtoId.js'
import { BudgetDtoState } from '../../domain/object_values/BudgetDtoState.js'

export class BudgetGetActived {
  private readonly _budgetRepository: IBudgetRepository

  constructor(budgetRepository: IBudgetRepository) {
    this._budgetRepository = budgetRepository
  }

  async Run(): Promise<BudgetDto> {
    const budgetActived: Budget | null = await this._budgetRepository.GetActived()

    if (!budgetActived) throw new Error('No budget has been defined.')

    return new BudgetDto(
      new BudgetDtoId(budgetActived.id.value),
      new BudgetDtoAmount(budgetActived.amount.value),
      new BudgetDtoState(budgetActived.state.value === 1 ? 'actived' : 'desactived'),
      new BudgetDtoCreatedAt(budgetActived.createdAt.value.toLocaleDateString('en-CA')),
    )
  }
}
