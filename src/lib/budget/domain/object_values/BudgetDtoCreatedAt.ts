export class BudgetDtoCreatedAt {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (this.value.trim().length === 0) {
      throw new Error('BudgetDtoCreatedAt cannot be empty')
    }

    if (this.value.length < 10 || this.value.length > 10) {
      throw new Error(
        'BudgetDtoCreatedAt must be exactly 10 characters long in the format YYYY-MM-DD',
      )
    }

    const dateRegex = new RegExp(/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/)

    if (!dateRegex.test(this.value)) {
      throw new Error('BudgetDtoCreatedAt must be a valid date string in YYYY-MM-DD format')
    }

    if (isNaN(Date.parse(this.value))) {
      throw new Error('BudgetDtoCreatedAt must be a valid date')
    }
  }
}
