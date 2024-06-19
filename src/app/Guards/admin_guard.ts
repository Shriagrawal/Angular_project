import { CanActivateFn } from "@angular/router";

export function AdminGuard(): CanActivateFn{
    let role = "admin";

    return () =>{
        if(role == "admin")
            {
                return true
            }
            alert("sorry no access to " + role)
            return false
    };
    
}