import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { GeneralInfosService } from "../services/general-infos.service";
import { firstValueFrom } from "rxjs";

export const generalInfosresolver: ResolveFn<any> = () => {
    const generalInfosService = inject(GeneralInfosService);

    return Promise.all([
        firstValueFrom(generalInfosService.getIncidents()),
        firstValueFrom(generalInfosService.getPendingPayments()),
        firstValueFrom(generalInfosService.getNewAccounts()),
        firstValueFrom(generalInfosService.getActiveUsers()),
    ]).then(([incidents, pendingPayments, newAccounts, activeUsers]) => {
        return {
            incidents, 
            pendingPayments, 
            newAccounts, 
            activeUsers,
        }
    })
}

// forma que achei para resolver:

// return forkJoin({
//     incidents: generalInfosService.getIncidents(),
//     pendingPayments: generalInfosService.getPendingPayments(),
//     newAccounts: generalInfosService.getNewAccounts(),
//     activeUsers: generalInfosService.getActiveUsers(),
// }).pipe(
//     map((data) => ({
//         incidents: data.incidents.day,
//         pendingPayments: data.pendingPayments.pending,
//         newAccounts: data.newAccounts.accounts,
//         activeUsers: data.activeUsers.users,    
//     }))
// )