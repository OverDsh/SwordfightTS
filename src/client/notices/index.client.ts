import { remotes } from "shared/remotes";
import { sendNotice } from "./notices-creator";

remotes.client.sendNotice.connect((notice) => sendNotice(notice));
