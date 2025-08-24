import { initGamePassService } from "./services/gamepass";
import { initProductService } from "./services/products";
import { initTokenService } from "./services/token-process";

initProductService();
initGamePassService();
initTokenService();
