(function () {
  const originalFetch = window.fetch;

  window.fetch = async function (input, init = {}) {
    try {
      const url = typeof input === "string" ? input : input.url;

      const targets = new Set([
        "https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-opus-4-6-v1/invoke-with-response-stream",
        "https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-opus-4-6-v1/invoke",
      ]);

      if (targets.has(url) && init?.body && typeof init.body === "string") {
        const json = JSON.parse(init.body);

        if ("model" in json) delete json.model;
        if ("stream" in json) delete json.stream;
        if ("thinking" in json) delete json.thinking;

        init.body = JSON.stringify(json);
      }
    } catch (_) {}
    return originalFetch(input, init);
  };
})();
