const names = ["K", "M", "B", "T"];
const pows: number[] = [];

names.forEach((element, index) => pows.insert(index, math.pow(1000, index + 1)));

export function AbbreviateNumber(x: number): string {
	const ab = math.abs(x);
	if (ab < 1000) {
		return tostring(x);
	}
	const p = math.min(math.floor(math.log10(ab) / 3), names.size()) - 1;
	const num = math.floor((ab / pows[p]) * 100) / 100;

	return `${num * math.sign(x)}${names[p]}`;
}

function padNumber(num: number, length: number): string {
	const str = tostring(num);
	return str.size() < length ? "0".rep(length - str.size()) + str : str;
}

export function toHMS(seconds: number): string {
	const hours = math.floor(seconds / 3600);
	const minutes = math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	if (hours > 0) {
		return `${hours}:${padNumber(minutes, 2)}:${padNumber(remainingSeconds, 2)}`;
	} else {
		return `${minutes}:${padNumber(remainingSeconds, 2)}`;
	}
}
