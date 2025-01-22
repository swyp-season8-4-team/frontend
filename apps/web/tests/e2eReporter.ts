import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

export default class E2EReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    console.info(
      `${result.status === "passed" ? "✅" : "❌"} ${test.parent.title} > ${test.title}`
    );
  }
}

