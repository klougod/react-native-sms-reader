type StartReadSMSCallback = (status: 'success'| 'error', sms: string, errorMessage: string) => void;
export type StartReadSMS = (callback?: StartReadSMSCallback) => void;