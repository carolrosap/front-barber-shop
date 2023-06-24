import { ClientsComponent } from "../components/clients/clients";
import { HomeComponent } from "../components/home/home";
import { ServicesComponent } from "../components/services/services";

type RouteHandler = () => void;
type RouteMap = Record<string, RouteHandler>;

export class Router {
  public handleHomeRoute (): void {
    const home = new HomeComponent();
    void home.render();
  }
  public handleServicesRoute (): void {
    const services = new ServicesComponent();
    void services.render();
  }

  public handleClientsRoute (): void {
    const clients = new ClientsComponent();
    void clients.render();
  }

  public configureRoutes (): void {
    const routes: RouteMap = {
      '/': this.handleHomeRoute,
      '/services': this.handleServicesRoute,
      '/clients': this.handleClientsRoute
    };

    const currentUrl = window.location.pathname;
    const routeHandler = routes[currentUrl];
    if (routeHandler !== null) {
      routeHandler();
    }
  }
}


