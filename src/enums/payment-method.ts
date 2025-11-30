export enum PaymentMethod {
  Cash = 'cash',
  Transfer = 'transfer',
}

export const PaymentMethodOptions = [
  {
    label: 'Gotówka',
    value: PaymentMethod.Cash,
  },
  {
    label: 'Przelew Tradycyjny',
    value: PaymentMethod.Transfer,
  },
]
