type InitializePaystackTransactionSuccessResType = {
  status: boolean
  message: 'Authorization URL created'
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export type CoursePurchaseTransactionInitType = {
  success: true
  transaction: InitializePaystackTransactionSuccessResType
}
