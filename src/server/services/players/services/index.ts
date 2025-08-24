import { initCharacterService } from "./character";
import { initDataService } from "./data";
import { initLeaderstatsService } from "./leaderstats";
import { initSafezoneService } from "./safezone";
import { initTimerService } from "./timer";

export async function initPlayerService() {
	initDataService();
	initSafezoneService();
	initTimerService();
	initCharacterService();
	initLeaderstatsService();
}
