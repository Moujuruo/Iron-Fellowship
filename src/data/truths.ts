import { TruthClassic, TruthOptionClassic } from "dataforged";
import { ironswornWorldTruths } from "./dataforged";

export const truthIds = [
  "ironsworn/setting_truths/the_old_world",
  "ironsworn/setting_truths/iron",
  "ironsworn/setting_truths/legacies",
  "ironsworn/setting_truths/communities",
  "ironsworn/setting_truths/leaders",
  "ironsworn/setting_truths/defense",
  "ironsworn/setting_truths/mysticism",
  "ironsworn/setting_truths/religion",
  "ironsworn/setting_truths/firstborn",
  "ironsworn/setting_truths/beasts",
  "ironsworn/setting_truths/horrors",
] as const;

export const truths = Object.values(ironswornWorldTruths);

export const truthMap: { [key: string]: TruthClassic } = {};
export const truthOptionMap: { [key: string]: TruthOptionClassic } = {};

truths.forEach((truth) => {
  truthMap[truth.$id] = truth;
  truth.Options.forEach(
    (truthOption) => (truthOptionMap[truthOption.$id] = truthOption)
  );
});
