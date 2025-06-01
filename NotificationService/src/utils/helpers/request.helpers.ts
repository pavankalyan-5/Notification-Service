import { AsyncLocalStorage } from "async_hooks";
import Handlebars from "handlebars";
type AsyncLocalStorageType = {
    correlationId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>(); // Created an instance of AsyncLocalStorage


export const getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore();
    return asyncStore?.correlationId || 'unknown-error-while-creating-correlation-id'; // Default value if not found 
}



export const fillTemplateWithData = (rawTemplate: string, data: Record<string, any>): string => {
    const template = Handlebars.compile(rawTemplate);
    const result = template(data);
    return result
}


export const templateIdMapper: Record<string, string> = {
    "success-booking-guests": "booking-confirmation-guest",
    "success-booking-hosts": "booking-confirmation-hosts"
}