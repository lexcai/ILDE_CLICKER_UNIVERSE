import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Surcharge de la méthode handleRequest pour personnaliser la réponse en cas d'échec de l'authentification
  handleRequest(err: any, user: any) {
    if (err || !user) {
      // Vous pouvez personnaliser le message d'erreur ici
      throw (
        err ||
        new UnauthorizedException("Nom d'utilisateur ou mot de passe incorrect")
      );
    }
    return user;
  }
}
