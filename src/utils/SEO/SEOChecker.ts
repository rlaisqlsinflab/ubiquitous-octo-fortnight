import type { SEOResult, SEORule } from './SEORule';

type Rules = Record<string, SEORule>;

export type SEOCheckResult = Record<string, SEOResult>;

export class SEOChecker {
  private rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules;
  }

  run(html: string) {
    const result: SEOCheckResult = {};
    Object.entries(this.rules).forEach(([key, rule]) => {
      result[key] = rule.check(html);
    });

    return result;
  }
}
