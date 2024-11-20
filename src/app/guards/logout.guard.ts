import { ActivatedRouteSnapshot, CanDeactivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const logoutGuard = (): CanDeactivateFn<DashboardComponent> => {
    return (
        component: DashboardComponent, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState: RouterStateSnapshot): MaybeAsync<GuardResult> => {
            console.log('currentRoute', currentRoute);
            console.log('currentState', currentState);
            console.log('nextState', nextState);

            if(nextState.url === '/login') {
                const authService = inject(AuthService);
                const confirmation = confirm('Deseja realmente sair?');
    
                if(confirmation) {
                    // localStorage.clear()
                    authService.logout();
                    return true;
                } else {
                    return false;
                }
            }

            return true;
    }
}